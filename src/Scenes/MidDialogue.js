import Phaser from 'phaser';

export default class MidDialogue extends Phaser.Scene {
  constructor(scene, title, content, nextScene) {
    super(scene);
    this.title = title;
    this.content = content;
    this.nextScene = nextScene;
  }

  preload() {
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI',
    });
  }

  create() {
    const scene = this;
    Alert(scene, this.title, this.content)
      .then(() => this.scene.start(this.nextScene));
  }

  update() { }
}

const CreateAlertDialog = (scene) => {
  const dialog = scene.rexUI.add.dialog({
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
    }),

    content: scene.add.text(0, 0, '', {
      fontSize: '24px',
    }),

    actions: [
      scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),

        text: scene.add.text(0, 0, 'OK', {
          fontSize: '24px',
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
    .on('button.over', (button, groupName, index, pointer, event) => {
      button.getElement('background').setStrokeStyle(1, 0xffffff);
    })
    .on('button.out', (button, groupName, index, pointer, event) => {
      button.getElement('background').setStrokeStyle();
    });

  return dialog;
};

const SetAlertDialog = (dialog, title, content) => {
  if (title === undefined) {
    title = '';
  }
  if (content === undefined) {
    content = '';
  }
  dialog.getElement('title').text = title;
  dialog.getElement('content').text = content;
  return dialog;
};

let AlertDialog;
const Alert = (scene, title, content, x, y) => {
  if (x === undefined) {
    x = 400;
  }
  if (y === undefined) {
    y = 300;
  }
  if (!AlertDialog) {
    AlertDialog = CreateAlertDialog(scene);
  }
  SetAlertDialog(AlertDialog, title, content);
  AlertDialog
    .setPosition(x, y)
    .setVisible(true)
    .layout();

  return AlertDialog
    .moveFromPromise(1000, undefined, '-=400', 'Bounce')
    .then(() => scene.rexUI.waitEvent(AlertDialog, 'button.click'))
    .then(() => AlertDialog.moveToPromise(1000, undefined, '-=400', 'Back'))
    .then(() => {
      AlertDialog.setVisible(false);
      return Promise.resolve();
    });
};
