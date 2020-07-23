import 'phaser';
import Button from '../components/Button';
import prop from '../Config/gameProperties';

export default class FreePlay extends Phaser.Scene {
  constructor() {
    super('FreePlay');
  }

  create() {
    this.add.image(400, 300, 'restBG');
    prop.gameProperty.freePlay = true;

    const phaseOneBtn = new Button('First', 1, 'One', this, true);
    phaseOneBtn.create();

    const phaseTwoBtn = new Button('Second', 0, 'PhaseTwo', this, true);
    phaseTwoBtn.create();

    const phaseThreeBtn = new Button('Third', -1, 'PhaseThree', this, true);
    phaseThreeBtn.create();

    const menuuBtn = new Button('Main menu', -2, 'Title', this);
    menuuBtn.create();
  }
}