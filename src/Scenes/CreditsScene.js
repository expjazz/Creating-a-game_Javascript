import 'phaser';
import config from '../Config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.add.image(400, 300, 'bgScore');

    this.creditsText = this.add.text(400, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    // eslint-disable-next-line quotes
    this.madeByText = this.add.text(400, 0, `Created By: Expedito Andrade  \n Assets Providers: 
    \n- The Cynic Project / cynicmusic.com / pixelsphere.org
    \n- Joth 
    \n- Iwan qubodup Gabovitch 
    \n- Tamara Ramsay 
    \n- Marta Nowaczyk
    \n- Luis Zuno (@ansimuz)`, { fontSize: '26px', fill: '#fff', align: 'center' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    this.madeByText.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete() {
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 15000,
      delay: 1000,
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this),
    });
  }
}
