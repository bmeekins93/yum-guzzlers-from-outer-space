// src/scenes/HUDScene.js
export default class HUDScene extends Phaser.Scene {
  constructor() { super('HUD'); }
  create() {
    const level = this.scene.get('Level');
    this.scoreText = this.add.text(12, 8, 'Score: 0',  { fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', fontSize: 16, color: '#e5e7eb' }).setScrollFactor(0);
    this.yumText   = this.add.text(12, 28, 'Yum: 100', { fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', fontSize: 16, color: '#93c5fd' }).setScrollFactor(0);
    this.timeText  = this.add.text(12, 48, 'Time: 0',  { fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', fontSize: 16, color: '#cbd5e1' }).setScrollFactor(0);
    this.livesText = this.add.text(12, 68, 'Lives: 3', { fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', fontSize: 16, color: '#fca5a5' }).setScrollFactor(0);
    const onUpdate = (p) => {
      if (p.score !== undefined) this.scoreText.setText('Score: ' + p.score);
      if (p.yum   !== undefined) this.yumText.setText('Yum: ' + p.yum);
      if (p.time  !== undefined) this.timeText.setText('Time: ' + p.time);
      if (p.lives !== undefined) this.livesText.setText('Lives: ' + p.lives);
    };
    level.events.on('hud:update', onUpdate);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => level.events.off('hud:update', onUpdate));
  }
}
