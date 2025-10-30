// src/scenes/PreloadScene.js
function hexToNum(hex) { return Phaser.Display.Color.HexStringToColor(hex).color; }
function makeRectTexture(scene, key, w, h, fill = '#38bdf8', stroke = '#0ea5e9') {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(hexToNum(fill), 1); g.fillRect(0, 0, w, h);
  if (stroke) { g.lineStyle(2, hexToNum(stroke), 1); g.strokeRect(1, 1, w-2, h-2); }
  g.generateTexture(key, w, h); g.destroy();
}
export default class PreloadScene extends Phaser.Scene {
  constructor() { super('Preload'); }
  create() {
    const { width, height } = this.scale;
    this.add.text(width/2, height/2 - 20, 'Preparing...', {
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', fontSize: 24, color: '#e5e7eb'
    }).setOrigin(0.5);
    makeRectTexture(this, 'player', 16, 16, '#fbbf24', '#f59e0b');
    makeRectTexture(this, 'grunt', 16, 16, '#ef4444', '#b91c1c');
    makeRectTexture(this, 'bullet', 6, 2, '#93c5fd', '#60a5fa');
    makeRectTexture(this, 'platform', 64, 16, '#64748b', '#475569');
    this.time.delayedCall(250, () => { this.scene.start('MainMenu'); });
  }
}
