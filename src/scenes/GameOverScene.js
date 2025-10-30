// src/scenes/GameOverScene.js
export default class GameOverScene extends Phaser.Scene {
  constructor() { super('GameOver'); }
  init(data) {
    this.finalScore = data?.score ?? 0;
    this.timeSurvived = data?.time ?? 0;
  }
  create() {
    const { width, height } = this.scale;
    this.add.text(width/2, height/2 - 30, 'Game Over', {
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      fontSize: 42, color: '#fca5a5'
    }).setOrigin(0.5);
    this.add.text(width/2, height/2 + 6,
      `Score: ${this.finalScore}  Time: ${this.timeSurvived}s`,
      {
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        fontSize: 18,
        color: '#e5e7eb'
      }
    ).setOrigin(0.5);
    this.add.text(width/2, height/2 + 48, 'Press Space to return to Menu',
      {
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        fontSize: 16,
        color: '#cbd5e1'
      }
    ).setOrigin(0.5);
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('MainMenu');
    });
  }
}
