/* eslint-disable no-undef */
import 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';


export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  backgroundColor: '#777',
  physics: {
    default: 'arcade',
  },
  dom: {
    createContainer: true,
  },
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
};
