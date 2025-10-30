// src/scenes/MainMenuScene.js
export default class MainMenuScene extends Phaser.Scene {
  constructor() { super('MainMenu'); }
  create() {
    const { width, height } = this.scale;
    this.add.text(width/2, height/2 - 40, 'Yum Guzzlers\nFrom Outer Space', {
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', fontSize: 40, align: 'center', color: '#f8fafc'
    }).setOrigin(0.5);
    this.add.text(width/2, height/2 + 40, 'Press Enter or Click to Start', {
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', fontSize: 18, color: '#cbd5e1'
    }).setOrigin(0.5);
    this.input.once('pointerdown', () => this.startGame());
    this.input.keyboard.once('keydown-ENTER', () => this.startGame());
  }
  startGame() { this.scene.start('Level', { level: 1 }); }
}
