/* eslint-disable no-undef */
import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('bgScore', 'assets/bgScore.jpg');
  }

  create() {
    this.scene.start('Preloader');
  }
}