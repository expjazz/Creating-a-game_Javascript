import config from '../Config/config';
import prop from '../Config/gameProperties';

export default class Button {
  constructor(content, position, startScene, actualScene, freePlay = false) {
    this.content = content;
    this.position = position;
    this.startScene = startScene;
    this.actualScene = actualScene;
    this.freePlay = freePlay;
  }

  create() {
    const button = this.actualScene.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(button, this.position);
    const text = this.actualScene.add.text(0, 0, this.content, { fontSize: '28px', fill: '#fff' });
    this.centerButtonText(text, button);
    button.on('pointerdown', (pointer) => {
      if (this.freePlay) {
        prop.gameProperty.freePlay = true;
      } else {
        prop.gameProperty.freePlay = false;
      }
      this.actualScene.scene.start(this.startScene);
    });

    this.actualScene.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.actualScene.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.actualScene.add.zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}
