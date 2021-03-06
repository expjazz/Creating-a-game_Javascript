import Phaser from 'phaser';
import prop from '../Config/gameProperties';

export default class MidDialogue extends Phaser.Scene {
  constructor(selfScene, title, content, jumpBonus, nextScene) {
    super(selfScene);
    this.title = title;
    this.selfScene = selfScene;
    this.content = content;
    this.nextScene = nextScene;
    this.jumpBonus = jumpBonus;
    this.AlertDialog = null;
  }

  preload() {
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI',
    });
  }

  create() {
    this.add.image(400, 300, 'restBG');
    prop.gameProperty.tripleJump = this.jumpBonus;
    const selfScene = this;
    this.Alert(selfScene, this.title, this.content)
      .then(() => this.scene.start(this.nextScene));
  }


  CreateAlertDialog(scene) {
    this.dialog = scene.rexUI.add.dialog({
      width: 300,
      background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),

      title: scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f),
        text: scene.add.text(0, 0, '', {
          fontSize: '24px',
        }),
        space: {
          left: 15,
          right: 15,
          top: 10,
          bottom: 10,
        },
        align: 'center',
      }),

      content: scene.add.text(200, 0, '', {
        fontSize: '24px',
        wordwrap: { width: 1000 },
        align: 'center',
      }),

      actions: [
        scene.rexUI.add.label({
          background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),

          text: scene.add.text(0, 0, 'OK', {
            fontSize: '12px',
          }),

          space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
          },
        }),
      ],

      space: {
        title: 25,
        content: 25,
        action: 15,

        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },

      align: {
        actions: 'center', // 'center'|'left'|'right'
      },

      expand: {
        content: false, // Content is a pure text object
      },
    })
      .on('button.over', (button) => {
        button.getElement('background').setStrokeStyle(1, 0xffffff);
      })
      .on('button.out', (button) => {
        button.getElement('background').setStrokeStyle();
      });

    return this.dialog;
  }

  SetAlertDialog(dialog, title, content) {
    this.dialogs = dialog;
    if (title === undefined) {
      title = '';
    }
    if (content === undefined) {
      content = '';
    }
    dialog.getElement('title').text = title;
    dialog.getElement('content').text = content;
    return dialog;
  }

  Alert(scene, title, content, x, y) {
    if (x === undefined) {
      x = 400;
    }
    if (y === undefined) {
      y = 300;
    }
    this.AlertDialog = this.CreateAlertDialog(scene);
    this.SetAlertDialog(this.AlertDialog, title, content);
    this.AlertDialog
      .setPosition(x, y)
      .setVisible(true)
      .layout();

    return this.AlertDialog
      .moveFromPromise(1000, undefined, '-=400', 'Bounce')
      .then(() => scene.rexUI.waitEvent(this.AlertDialog, 'button.click'))
      .then(() => this.AlertDialog.moveToPromise(1000, undefined, '-=400', 'Back'))
      .then(() => {
        this.AlertDialog.setVisible(false);
        return Promise.resolve();
      });
  }
}
