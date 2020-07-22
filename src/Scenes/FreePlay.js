import 'phaser';
import Button from '../components/Button';

export default class FreePlay extends Phaser.Scene {
  constructor() {
    super('FreePlay');
  }

  create() {
    const phaseOneBtn = new Button('First', 1, 'One', this, true);
    phaseOneBtn.create();

    const phaseTwoBtn = new Button('Second', 0, 'PhaseTwo', this, true);
    phaseTwoBtn.create();

    const phaseThreeBtn = new Button('Third', -1, 'PhaseThree', this, true);
    phaseThreeBtn.create();
  }
}