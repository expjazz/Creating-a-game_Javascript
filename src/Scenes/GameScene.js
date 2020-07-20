/* eslint-disable no-undef */
import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor(gameObj) {
    super('Game');
    this.game = gameObj;
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
    // this.load.image('sky', '../assets/BG.png');
    this.load.image('platform', '../assets/platform.png');
    // this.load.image('ftrees', 'assets/ftrees.png');
    this.load.image('trees', 'assets/foreground.png');
    this.load.image('mountains', 'assets/back-buildings.png');
    this.load.image('mountain2', 'assets/far-buildings.png');
    this.load.image('spider', 'assets/spider.png');
    // this.load.image('mountainfaar', 'assets/mountainfaar.png');


    // player is a sprite sheet made by 24x48 pixels
    this.load.spritesheet('player', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });

    // the coin is a sprite sheet made by 20x20 pixels
    this.load.spritesheet('coin', 'assets/coin.png', {
      frameWidth: 20,
      frameHeight: 20,
    });

    // the firecamp is a sprite sheet made by 32x58 pixels
    // this.load.spritesheet('fire', 'assets/fire.png', {
    //   frameWidth: 40,
    //   frameHeight: 70,
    // });

    // mountains are a sprite sheet made by 512x512 pixels
    // this.load.spritesheet('mountain', 'assets/mountain.png', {
    //   frameWidth: 512,
    //   frameHeight: 512,
    // });
  }

  create() {
    this.mountains = this.add.tileSprite(0,
      0, 0, 0, 'mountains').setScale(3.2);
    // this.mountainfaar = this.add.tileSprite(0,
    //   0, 0, 0, 'mountain2').setScale(1);
    this.mountain2 = this.add.tileSprite(0,
      0, 0, 0, 'mountainfaar').setScale(3.2);
    this.trees = this.add.tileSprite(4,
      0, 0, 0, 'trees').setScale(3.2);
    // this.ftrees = this.add.tileSprite(0,
    // 0, 0, 0, 'ftrees').setScale(1);

    this.mountains.setOrigin(0, 0);
    this.mountains.setScrollFactor(0);
    // this.mountainfaar.setOrigin(0, 0);
    // this.mountainfaar.setScrollFactor(0);

    this.mountain2.setOrigin(0, 0);
    this.mountain2.setScrollFactor(0);

    this.trees.setOrigin(0, 0);
    this.trees.setScrollFactor(0);

    // this.ftrees.setOrigin(0, 0);
    // this.ftrees.setScrollFactor(0);
    this.time.addEvent({
      delay: 20000000000000,
      callback() {
        this.scene.pause();
        this.scene.start('MidDialogue');
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

    // setting coin animation
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

    // setting fire animation
    // this.anims.create({
    //   key: 'burn',
    //   frames: this.anims.generateFrameNumbers('fire', {
    //     start: 0,
    //     end: 4,
    //   }),
    //   frameRate: 15,
    //   repeat: -1,
    // });


    // group with all active mountains.
    // this.mountainGroup = this.add.group();
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    });
    // group with all active platforms.
    this.platformGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    // platform pool
    this.platformPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });
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

    // group with all active coins.
    this.coinGroup = this.add.group({

      // once a coin is removed, it's added to the pool
      removeCallback(coin) {
        coin.scene.coinPool.add(coin);
      },
    });

    // coin pool
    this.coinPool = this.add.group({

      // once a coin is removed from the pool, it's added to the active coins group
      removeCallback(coin) {
        coin.scene.coinGroup.add(coin);
      },
    });

    // // group with all active firecamps.
    // this.fireGroup = this.add.group({

    //   // once a firecamp is removed, it's added to the pool
    //   removeCallback(fire) {
    //     fire.scene.firePool.add(fire);
    //   },
    // });

    // // fire pool
    // this.firePool = this.add.group({

    //   // once a fire is removed from the pool, it's added to the active fire group
    //   removeCallback(fire) {
    //     fire.scene.fireGroup.add(fire);
    //   },
    // });

    // this.addMountains();
    // this.add.image(400, 300, 'sky');


    this.addedPlatforms = 0;

    this.playerJumps = 0;

    this.addPlatform(800, 800 / 2, 600 * this.gameOptions.platformVerticalLimit[1]);

    this.player = this.physics.add.sprite(this.gameOptions.playerStartPosition, 600 * 0.7, 'player');

    this.player.setGravityY(this.gameOptions.playerGravity);
    this.player.setDepth(2);

    this.dying = false;

    this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, () => {
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    }, null, this);

    // this.physics.add.overlap(this.player, this.fireGroup, (player, fire) => {
    //   this.dying = true;
    //   this.player.anims.stop();
    //   this.player.setFrame(2);
    //   this.player.body.setVelocityY(-200);
    //   this.physics.world.removeCollider(this.platformCollider);
    // }, null, this);

    this.physics.add.overlap(this.player, this.coinGroup, (player, coin) => {
      this.scoreText.text = `score: ${parseInt(this.scoreText.text.split(':')[1]) + 10}`;
      coin.disableBody(true, true);
    });

    this.physics.add.collider(this.player, this.spiderGroup, (player, spider) => {
      this.physics.pause();
      player.setTint(0xff0000);
      this.scene.start('GameOver');
    });
    this.input.on('pointerdown', this.jump, this);
  }

  // addMountains() {
  //   const rightmostMountain = this.getRightmostMountain();
  //   if (rightmostMountain < 800 * 2) {
  //     const mountain = this.physics.add.sprite(rightmostMountain + Phaser.Math.Between(100, 350), 400 + Phaser.Math.Between(0, 100), 'mountain');
  //     mountain.setOrigin(0.5, 1);
  //     mountain.body.setVelocityX(this.gameOptions.mountainSpeed * -1);
  //     this.mountainGroup.add(mountain);
  //     if (Phaser.Math.Between(0, 1)) {
  //       mountain.setDepth(1);
  //     }
  //     mountain.setFrame(Phaser.Math.Between(0, 3));
  //     this.addMountains();
  //   }
  // }

  // getRightmostMountain() {
  //   let rightmostMountain = -200;
  //   this.mountainGroup.getChildren().forEach((mountain) => {
  //     rightmostMountain = Math.max(rightmostMountain, mountain.x);
  //   });
  //   return rightmostMountain;
  // }

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

    // if this is not the starting platform...
    if (this.addedPlatforms > 1) {
      // is there a coin over the platform?
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
          const spider = this.physics.add.sprite((posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth)), posY - 31, 'spider');
          spider.setScale(0.1);
          spider.setImmovable(true);
          spider.setVelocityX(platform.body.velocity.x);
          spider.setDepth(2);
          this.spiderGroup.add(spider);
        }
      }

      // // is there a fire over the platform?
      // if (Phaser.Math.Between(1, 100) <= this.gameOptions.firePercent) {
      //   if (this.firePool.getLength()) {
      //     const fire = this.firePool.getFirst();
      //     fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
      //     fire.y = posY - 46;
      //     fire.alpha = 1;
      //     fire.active = true;
      //     fire.visible = true;
      //     this.firePool.remove(fire);
      //   } else {
      //     const fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 46, 'fire');
      //     fire.setImmovable(true);
      //     fire.setVelocityX(platform.body.velocity.x);
      //     fire.setSize(8, 2, true);
      //     fire.anims.play('burn');
      //     fire.setDepth(2);
      //     this.fireGroup.add(fire);
      //   }
      // }
    }
  }

  jump() {
    if ((!this.dying) && (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < this.gameOptions.jumps))) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(this.gameOptions.jumpForce * -1);
      this.playerJumps += 1;

      // stops animation
      this.player.anims.stop();
    }
  }

  update() {
    // this.ftrees.tilePositionX -= 0.05;
    this.trees.tilePositionX -= 0.3;
    this.mountains.tilePositionX -= 0.75;
    // this.mountainfaar.tilePositionX -= 0.85;
    this.mountain2.tilePositionX -= 0.95;


    // game over
    if (this.player.y > 600) {
      this.scene.start('PlayGame');
    }

    this.player.x = this.gameOptions.playerStartPosition;

    // recycling platforms
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

    // recycling spiders
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


    // recycling fire
    // this.fireGroup.getChildren().forEach(function (fire) {
    //   if (fire.x < -fire.displayWidth / 2) {
    //     this.fireGroup.killAndHide(fire);
    //     this.fireGroup.remove(fire);
    //   }
    // }, this);

    // // recycling mountains
    // this.mountainGroup.getChildren().forEach(function (mountain) {
    //   if (mountain.x < -mountain.displayWidth) {
    //     const rightmostMountain = this.getRightmostMountain();
    //     mountain.x = rightmostMountain + Phaser.Math.Between(100, 350);
    //     mountain.y = 400 + Phaser.Math.Between(0, 100);
    //     mountain.setFrame(Phaser.Math.Between(0, 3));
    //     if (Phaser.Math.Between(0, 1)) {
    //       mountain.setDepth(1);
    //     }
    //   }
    // }, this);

    // adding new platforms
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
