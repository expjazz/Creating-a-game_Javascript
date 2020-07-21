/* eslint-disable no-undef */
import 'phaser';
import prop from '../Config/gameProperties';
import GameOver from './GameOver';

export default class GameScene extends Phaser.Scene {
  constructor(scene, background, enemy, nextScene, seconds, selfScale = 1) {
    super(scene);
    console.log(nextScene);
    // this.game = gameObj;
    this.scene = scene;
    this.seconds = seconds;
    this.enemy = enemy;
    this.selfScale = selfScale;
    this.background = background;
    this.nextScene = nextScene;
    this.parallax = 0;
    this.gameOptions = {
      platformSpeedRange: [100, 100],

      // mountain speed, in pixels per second
      mountainSpeed: 80,

      // spawn range, how far should be the rightmost platform from the right edge
      // before next platform spawns, in pixels
      spawnRange: [80, 100],

      // platform width range, in pixels
      platformSizeRange: [300, 300],

      // a height range between rightmost platform and next platform to be spawned
      platformHeightRange: [-5, 5],

      // a scale to be multiplied by platformHeightRange
      platformHeighScale: 20,

      // platform max and min height, as screen height ratio
      platformVerticalLimit: [0.4, 0.8],

      // player gravity
      playerGravity: 900,

      // player jump force
      jumpForce: 400,

      // player starting X position
      playerStartPosition: 200,

      // consecutive jumps allowed
      jumps: 2,

      // % of probability a coin appears on the platform
      coinPercent: 80,

      spiderPercent: 90,

      // % of probability a fire appears on the platform
      firePercent: 25,
    };
  }

  preload() {


  }

  create() {
    this.background.forEach((back) => {
      this[back] = this.add.tileSprite(0, 0, 0, 0, back).setScale(this.selfScale);
      this[back].setOrigin(0, 0);
      this[back].setScrollFactor(0);
    });

    this.time.addEvent({
      delay: this.seconds,
      callback() {
        this.scene.pause();
        clearInterval(this.idInterval);
        this.scene.start(this.nextScene);
      },
      callbackScope: this,
    });
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

    // countter for level
    this.timeText = this.add.text(550, 16, 'Good Luck!', {
      fontSize: '32px',
      fill: '#000',
    });

    this.idInterval = setInterval(() => {
      const time = this.setMinutes(this.seconds);
      this.timeText.text = time;
      if (this.seconds === 0) { clearInterval(); }
      this.seconds -= 1000;
    }, 1000);


    this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, () => {
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    }, null, this);

    this.physics.add.overlap(this.player, this.fireGroup, (player, fire) => {
      this.dying = true;
      this.player.anims.stop();
      this.player.setFrame(2);
      this.player.body.setVelocityY(-200);
      this.physics.world.removeCollider(this.platformCollider);
    }, null, this);

    this.physics.add.overlap(this.player, this.coinGroup, (player, coin) => {
      prop.gameProperty.score += 10;
      this.scoreText.text = `score: ${prop.gameProperty.score}`;

      coin.disableBody(true, true);
    });

    // dying if iit  thouchess the spider

    this.physics.add.collider(this.player, this.spiderGroup, (player, spider) => {
      this.physics.pause();
      player.setTint(0xff0000);
      this.scene.start('GameOver');
      clearInterval(this.idInterval);
    });
    this.input.on('pointerdown', this.jump, this);
  }

  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms += 1;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      const newRatio = platformWidth / platform.displayWidth;
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 32, 'platform');
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(Phaser.Math.Between(this.gameOptions.platformSpeedRange[0], this.gameOptions.platformSpeedRange[1]) * -1);
      platform.setDepth(2);
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(this.gameOptions.spawnRange[0], this.gameOptions.spawnRange[1]);

    if (this.addedPlatforms > 1) {
      if (Phaser.Math.Between(1, 100) <= this.gameOptions.coinPercent) {
        if (this.coinPool.getLength()) {
          const coin = this.coinPool.getFirst();
          coin.x = posX;
          coin.y = posY - 96;
          coin.alpha = 1;
          coin.active = true;
          coin.visible = true;
          this.coinPool.remove(coin);
        } else {
          const coin = this.physics.add.sprite(posX, posY - 96, 'coin');
          coin.setImmovable(true);
          coin.setVelocityX(platform.body.velocity.x);
          coin.anims.play('rotate');
          coin.setDepth(2);
          this.coinGroup.add(coin);
        }
      }

      if (Phaser.Math.Between(1, 100) <= this.gameOptions.spiderPercent) {
        if (this.spiderPool.getLength()) {
          const spider = this.spiderPool.getFirst();
          spider.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
          spider.y = posY - 33;
          spider.alpha = 1;
          spider.active = true;
          spider.visible = true;
          this.spiderPool.remove(spider);
        } else {
          const spider = this.physics.add.sprite((posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth)), posY - 31, this.enemy);
          if (this.enemy === 'spider') spider.setScale(0.1);
          spider.setImmovable(true);
          if (this.enemy === 'rat') spider.anims.play('ratA');

          spider.setVelocityX(platform.body.velocity.x);
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
          fire.visible = true;
          this.firePool.remove(fire);
        } else {
          const fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 46, 'fire');
          fire.setImmovable(true);
          fire.setVelocityX(platform.body.velocity.x);
          fire.setSize(8, 2, true);
          fire.anims.play('burn');
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
    console.log(this);
    if ((!this.dying) && (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < this.gameOptions.jumps))) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(this.gameOptions.jumpForce * -1);
      this.playerJumps += 1;

      this.player.anims.stop();
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

    this.spiderGroup.getChildren().forEach((spider) => {
      if (spider.x < -spider.displayWidth / 2) {
        this.spiderGroup.killAndHide(spider);
        this.spiderGroup.remove(spider);
      }
    }, this);


    if (this.enemy === 'fire') {
      this.fireGroup.getChildren().forEach(function (fire) {
        if (fire.x < -fire.displayWidth / 2) {
          this.fireGroup.killAndHide(fire);
          this.fireGroup.remove(fire);
        }
      }, this);
    }


    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(this.gameOptions.platformSizeRange[0], this.gameOptions.platformSizeRange[1]);
      const platformRandomHeight = this.gameOptions.platformHeighScale * Phaser.Math.Between(this.gameOptions.platformHeightRange[0], this.gameOptions.platformHeightRange[1]);
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = 600 * this.gameOptions.platformVerticalLimit[0];
      const maxPlatformHeight = 600 * this.gameOptions.platformVerticalLimit[1];
      const nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
      this.addPlatform(nextPlatformWidth, 800 + nextPlatformWidth / 2, nextPlatformHeight);
    }
  }
}
