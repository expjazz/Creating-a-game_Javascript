import 'phaser';
import Button from '../components/Button';

export default class FreePlay extends Phaser.Scene {
  constructor() {
    super('FreePlay');
  }

  create() {
    const phaseOneBtn = new Button('First', 1, 'One', this);
    phaseOneBtn.create();

    const phaseTwoBtn = new Button('Second', 0, 'PhaseTwo', this);
    phaseTwoBtn.create();

    const phaseThreeBtn = new Button('Third', -1, 'PhaseThree', this);
    phaseThreeBtn.create();
  }
}