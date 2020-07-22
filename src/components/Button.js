export default class Button {
  constructor(content, position, startScene, actualScene) {
    this.content = content;
    this.position = position;
    this.startScene = startScene;
    this.actualScene = actualScene;
  }

  create() {
    const button = this.actualScene.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.actualScene.centerButton(button, this.position);
    const text = this.actualScene.add.text(0, 0, this.content, { fontSize: '32px', fill: '#fff' });
    this.actualScene.centerButtonText(text, button);
    button.on('pointerdown', (pointer) => this.actualScene.scene.start(this.startScene));
  }
}


// this.input.on('pointerover', (event, gameObjects) => {
//   gameObjects[0].setTexture('blueButton2');
// });

// this.input.on('pointerout', (event, gameObjects) => {
//   gameObjects[0].setTexture('blueButton1');
// });