export default class Button {
  constructor(content, position, startScene, actualScene, nextScene) {
    this.content = content;
    this.position = position;
    this.startScene = startScene;
    this.actualScene = actualScene;
    this.nextScene = nextScene;
  }

  create() {
    const button = this.actualScene.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.actualScene.centerButton(button, this.position);
    const text = this.actualScene.add.text(0, 0, content, { fontSize: '32px', fill: '#fff' });
    this.actualScene.centerButtonText(text, button);
    button.on('pointerdown', (pointer) => this.actualScene.start(this.nextScene));
  }
}