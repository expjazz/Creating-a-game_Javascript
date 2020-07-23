/* eslint-disable no-undef */
import 'phaser';
import prop from '../Config/gameProperties';

export default class GameScene extends Phaser.Scene {
  constructor(selfScene, background, enemy, nextScene, speedIncrease, seconds, bgTrack, platformShape = 'platform', selfScale = 1) {
    super(selfScene);
    this.selfScene = selfScene;
    this.seconds = seconds;
    this.enemy = enemy;
    this.selfScale = selfScale;
    this.background = background;
    this.speedIncrease = speedIncrease;
    this.nextScene = nextScene;
    this.parallax = 0;
    this.fullTime = seconds;
    this.platformShape = platformShape;
    this.tempTripleJump = 0;
    this.bgTrack = bgTrack;
    this.gameOptions = {
      platformSpeedRange: [this.speedIncrease, this.speedIncrease],


      spawnRange: [80, 100],

      platformSizeRange: [200, 300],

      platformHeightRange: [-5, 5],

      platformHeighScale: 20,

      platformVerticalLimit: [0.4, 0.8],

      playerGravity: 1000,

      jumpForce: 450,

      playerStartPosition: 200,

      jumps: 2,

      coinPercent: 80,

      spiderPercent: 25,

      firePercent: 35,
    };
  }

  create() {
    this.tempTripleJump = prop.gameProperty.tripleJump;
    this.music = this.sys.game.globals.model;
    if (this.music.musicOn === true) {
      this.sys.game.globals.bgMusic.stop();
      this.bgMusic = this.sound.add(`${this.bgTrack}track`, { volume: 0.7, loop: true });
      this.bgMusic.play();
      this.music.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
      this.sys.game.globals.bgMusic.play();
    }
    this.count = 0;

    this.seconds = this.fullTime;
    prop.gameProperty.lastScore = prop.gameProperty.score;

    if (this.selfScene === 'One') {
      prop.gameProperty.currentPhase = 1;
      this.speedIncrease = prop.gameProperty.phaseOneSpeed;
    } else if (this.selfScene === 'PhaseTwo') {
      prop.gameProperty.currentPhase = 2;
      this.speedIncrease = prop.gameProperty.phaseTwoSpeed;
    } else {
      prop.gameProperty.currentPhase = 3;
      this.speedIncrease = prop.gameProperty.phaseThreeSpeed;
    }
    this.background.forEach((back) => {
      this[back] = this.add.tileSprite(0, 0, 0, 0, back).setScale(this.selfScale);
      this[back].setOrigin(0, 0);
      this[back].setScrollFactor(0);
    });
    if (!prop.gameProperty.freePlay) {
      this.time.addEvent({
        delay: this.seconds,
        callback() {
          this.scene.pause();
          clearInterval(this.idInterval);
          this.scene.start(this.nextScene);
        },
        callbackScope: this,
      });
    }
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', {
        start: 5,
        end: 8,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('coin', {
        start: 0,
        end: 5,
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1,
    });

    this.anims.create({
      key: 'ratA',
      frames: this.anims.generateFrameNumbers('rat', {
        start: 0,
        end: 6,
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1,
    });


    this.anims.create({
      key: 'burn',
      frames: this.anims.generateFrameNumbers('fire', {
        start: 0,
        end: 4,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.jumpText = this.add.text(300, 16, `Triple Jumps missing: ${prop.gameProperty.tripleJump}`, {
      fontSize: '12px',
      fill: '#000',
      align: 'center',
    });

    this.scoreText = this.add.text(16, 16, `score: ${prop.gameProperty.score}`, {
      fontSize: '32px',
      fill: '#000',
    });
    this.platformGroup = this.add.group({

      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    this.platformPool = this.add.group({

      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });


    this.coinGroup = this.add.group({

      removeCallback(coin) {
        coin.scene.coinPool.add(coin);
      },
    });

    this.coinPool = this.add.group({

      removeCallback(coin) {
        coin.scene.coinGroup.add(coin);
      },
    });


    if (this.enemy === 'fire') {
      this.fireGroup = this.add.group({

        removeCallback(fire) {
          fire.scene.firePool.add(fire);
        },
      });

      this.firePool = this.add.group({

        removeCallback(fire) {
          fire.scene.fireGroup.add(fire);
        },
      });
    } else {
      this.spiderGroup = this.add.group({
        removeCallback(spider) {
          spider.scene.spiderPool.add(spider);
        },
      });

      this.spiderPool = this.add.group({
        removeCallback(spider) {
          spider.scene.spiderGroup.add(spider);
        },
      });
    }


    this.addedPlatforms = 0;

    this.playerJumps = 0;

    this.addPlatform(800, 800 / 2, 600 * this.gameOptions.platformVerticalLimit[1]);

    this.player = this.physics.add.sprite(this.gameOptions.playerStartPosition, 600 * 0.7, 'player');

    this.player.setGravityY(this.gameOptions.playerGravity);
    this.player.setDepth(2);

    this.dying = false;

    if (!prop.gameProperty.freePlay) {
      this.timeText = this.add.text(550, 16, 'Good Luck!', {
        fontSize: '32px',
        fill: '#000',
      });
    }

    this.idInterval = setInterval(() => {
      const time = this.setMinutes(this.seconds);
      if (!prop.gameProperty.freePlay) this.timeText.text = time;
      this.count += 1000;
      if (this.count !== 0 && this.count % 2 === 0) {
        prop.gameProperty.score += 5;
        this.scoreText.text = `score: ${prop.gameProperty.score}`;
      }

      this.seconds -= 1000;
    }, 1000);


    this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, () => {
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    }, null, this);

    this.physics.add.overlap(this.player, this.fireGroup, () => {
      this.dying = true;
      this.player.anims.stop();
      this.physics.pause();
      prop.gameProperty.tripleJump = this.tempTripleJump;
      this.player.setFrame(2);
      this.player.body.setVelocityY(-200);
      this.sound.play('lost');
      this.physics.world.removeCollider(this.platformCollider);
      this.scene.start('GameOver', { previousScene: this.scene });
      clearInterval(this.idInterval);
    }, null, this);

    this.physics.add.overlap(this.player, this.coinGroup, (player, coin) => {
      prop.gameProperty.score += 20;
      this.scoreText.text = `score: ${prop.gameProperty.score}`;
      this.sound.play('collectCoin');
      coin.disableBody(true, true);
    });


    this.physics.add.overlap(this.player, this.spiderGroup, (player) => {
      this.dying = true;
      this.sound.play('lost');
      prop.gameProperty.tripleJump = this.tempTripleJump;

      this.physics.pause();
      player.setTint(0xff0000);
      this.player.body.setVelocityY(-200);
      this.physics.world.removeCollider(this.platformCollider);

      this.scene.start('GameOver', { previousScene: this.scene });
      clearInterval(this.idInterval);
    }, null, this);
    const keyObj = this.input.keyboard.addKey('Space');
    keyObj.on('down', this.jump, this);
    this.input.on('pointerdown', this.jump, this);
  }

  addPlatform(platformWidth, posX, posY, increaseSpeed = null) {
    this.addedPlatforms += 1;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      platform.displayWidth = platformWidth;

      if (increaseSpeed) {
        platform.body.setVelocityX(this.speedIncrease * -1);
        this.platformGroup.children.entries
          .forEach((plat) => plat.body.setVelocityX(this.speedIncrease * -1));
        this.platformPool.children.entries
          .forEach((plat) => plat.body.setVelocityX(this.speedIncrease * -1));
      }
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 32, this.platformShape);
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(this.speedIncrease * -1);
      this.platformGroup.children.entries
        .forEach((plat) => plat.body.setVelocityX(this.speedIncrease * -1));
      this.platformPool.children.entries
        .forEach((plat) => plat.body.setVelocityX(this.speedIncrease * -1));
      platform.setDepth(2);
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math
      .Between(this.gameOptions.spawnRange[0], this.gameOptions.spawnRange[1]);

    if (this.addedPlatforms > 1) {
      if (Phaser.Math.Between(1, 100) <= this.gameOptions.coinPercent) {
        if (this.coinPool.getLength()) {
          const coin = this.coinPool.getFirst();
          coin.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
          coin.y = posY - 96;
          coin.alpha = 1;
          coin.active = true;
          coin.visible = true;
          this.coinGroup.children.entries
            .forEach((plat) => plat.body.setVelocityX(this.speedIncrease * -1));
          this.coinPool.children.entries
            .forEach((plat) => plat.body.setVelocityX(this.speedIncrease * -1));
          coin.setVelocityX(this.speedIncrease * -1);

          this.coinPool.remove(coin);
        } else {
          const coin = this.physics.add.sprite((posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth)), posY - 96, 'coin');
          coin.setImmovable(true);
          coin.setVelocityX(this.speedIncrease * -1);
          this.coinGroup.children.entries
            .forEach((plat) => plat.body.setVelocityX(this.speedIncrease * -1));
          this.coinPool.children.entries
            .forEach((plat) => plat.body.setVelocityX(this.speedIncrease * -1));
          coin.anims.play('rotate');

          coin.setDepth(2);
          this.coinGroup.add(coin);
        }
      }

      if (this.enemy !== 'fire' && Phaser.Math.Between(1, 100) <= this.gameOptions.spiderPercent) {
        if (this.spiderPool.getLength()) {
          const spider = this.spiderPool.getFirst();
          spider.x = posX - platformWidth / 2 + Phaser.Math
            .Between(1, platformWidth - platformWidth / 4);
          spider.y = posY - 33;
          spider.alpha = 1;
          this.spiderGroup.children.entries.forEach((plat) => plat.body
            .setVelocityX(this.speedIncrease * -1));
          this.spiderPool.children.entries
            .forEach((plat) => plat.body.setVelocityX(this.speedIncrease * -1));
          spider.active = true;
          spider.setVelocityX(this.speedIncrease * -1);

          spider.visible = true;
          this.spiderPool.remove(spider);
        } else {
          const spider = this.physics.add
            .sprite((posX - platformWidth / 2 + Phaser.Math
              .Between(1, platformWidth - platformWidth / 2)), posY - 31, this.enemy);
          if (this.enemy === 'spider') spider.setScale(0.1);
          this.spiderGroup.children.entries
            .forEach((plat) => plat.body.setVelocityX(this.speedIncrease * -1));
          this.spiderPool.children.entries
            .forEach((plat) => plat.body.setVelocityX(this.speedIncrease * -1));
          spider.setImmovable(true);
          if (this.enemy === 'rat') spider.anims.play('ratA');

          spider.setVelocityX(this.speedIncrease * -1);
          spider.setSize(8, 2, true);

          spider.setDepth(2);
          this.spiderGroup.add(spider);
        }
      }

      if (this.enemy === 'fire' && Phaser.Math.Between(1, 100) <= this.gameOptions.firePercent) {
        if (this.firePool.getLength()) {
          const fire = this.firePool.getFirst();
          fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
          fire.y = posY - 46;
          fire.alpha = 1;
          fire.active = true;
          fire.setVelocityX(this.speedIncrease * -1);

          this.fireGroup.children.entries
            .forEach((plat) => plat.body.setVelocityX(this.speedIncrease * -1));
          this.firePool.children.entries.forEach((plat) => plat.body
            .setVelocityX(this.speedIncrease * -1));
          fire.visible = true;
          this.firePool.remove(fire);
        } else {
          const fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 46, 'fire');
          fire.setImmovable(true);
          fire.setVelocityX(this.speedIncrease * -1);
          fire.setSize(8, 2, true);
          fire.anims.play('burn');
          this.fireGroup.children.entries
            .forEach((plat) => plat.body.setVelocityX(this.speedIncrease * -1));
          this.firePool.children.entries.forEach((plat) => plat.body
            .setVelocityX(this.speedIncrease * -1));
          fire.setDepth(2);
          this.fireGroup.add(fire);
        }
      }
    }
  }

  setMinutes(mseconds) {
    this.newSeconds = mseconds / 1000;
    const minutes = Math.floor(this.newSeconds / 60);
    const time = `${minutes} : ${this.newSeconds % 60}`;
    return time;
  }

  jump() {
    if ((!this.dying)) {
      // eslint-disable-next-line max-len
      if (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < this.gameOptions.jumps) || (prop.gameProperty.tripleJump > 0 && this.playerJumps < 4)) {
        if (this.player.body.touching.down) {
          this.playerJumps = 0;
          this.sound.play('jump');
        }
        this.player.setVelocityY(this.gameOptions.jumpForce * -1);
        this.playerJumps += 1;
        if (this.playerJumps > 2) {
          prop.gameProperty.tripleJump -= 1;
          this.jumpText.text = `Triple Jumps missing: ${prop.gameProperty.tripleJump}`;
        }

        this.player.anims.stop();
      }
    }
  }


  update() {
    if (this.seconds === 0) clearInterval(this.idInterval);


    this.parallax = 0;
    this.background.forEach((back) => {
      this.parallax -= 0.22;
      this[back].tilePositionX -= this.parallax;
    });


    if (this.player.y > 600) {
      this.sound.play('lost');
      prop.gameProperty.tripleJump = this.tempTripleJump;

      clearInterval(this.idInterval);

      this.scene.start('GameOver', { previousScene: this.scene });
    }
    this.player.x = this.gameOptions.playerStartPosition;

    let minDistance = 600;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach((platform) => {
      const platformDistance = 800 - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    this.coinGroup.getChildren().forEach((coin) => {
      if (coin.x < -coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    }, this);

    if (this.enemy !== 'fire') {
      this.spiderGroup.getChildren().forEach((spider) => {
        if (spider.x < -spider.displayWidth / 2) {
          this.spiderGroup.killAndHide(spider);
          this.spiderGroup.remove(spider);
        }
      }, this);
    }


    if (this.enemy === 'fire') {
      this.fireGroup.getChildren().forEach((fire) => {
        if (fire.x < -fire.displayWidth / 2) {
          this.fireGroup.killAndHide(fire);
          this.fireGroup.remove(fire);
        }
      }, this);
    }


    if (this.count % 3 === 0 && this.count !== 0) {
      this.count = 0;
      this.speedIncrease += 10;
    }
    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math
        .Between(this.gameOptions.platformSizeRange[0], this.gameOptions.platformSizeRange[1]);
      const platformRandomHeight = this.gameOptions
        .platformHeighScale * Phaser.Math
        .Between(this.gameOptions.platformHeightRange[0], this.gameOptions.platformHeightRange[1]);
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = 600 * this.gameOptions.platformVerticalLimit[0];
      const maxPlatformHeight = 600 * this.gameOptions.platformVerticalLimit[1];
      const nextPlatformHeight = Phaser.Math
        .Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
      this.addPlatform(nextPlatformWidth, 800 + nextPlatformWidth / 2,
        nextPlatformHeight, this.speedIncrease);
    }
  }
}
