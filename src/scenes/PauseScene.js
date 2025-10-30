// src/scenes/PauseScene.js
export default class PauseScene extends Phaser.Scene {
  constructor() { super('Pause'); }
  create() {
    const { width, height } = this.scale;
    const bg = this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.45);
    bg.setInteractive();
    this.add.text(width/2, height/2 - 10, 'Paused', { fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', fontSize: 36, color: '#e5e7eb' }).setOrigin(0.5);
    this.add.text(width/2, height/2 + 30, 'Press Esc or Click to resume', { fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', fontSize: 16, color: '#cbd5e1' }).setOrigin(0.5);
    const resume = () => { this.scene.resume('Level'); this.scene.resume('HUD'); this.scene.stop(); };
    this.input.keyboard.once('keydown-ESC', resume);
    this.input.once('pointerdown', resume);
  }
}
