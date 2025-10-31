// src/scenes/LevelScene.js
import Player from '../objects/Player.js';

export default class LevelScene extends Phaser.Scene {
  constructor() {
    super('Level');
    this.hud = { score: 0, yum: 100, lives: 3, time: 0 };
  }
  init(data) { this.levelIndex = data?.level ?? 1; }
  create() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#0f172a');
    this.platforms = this.physics.add.staticGroup();
    const groundY = height - 40;
    for (let x = 0; x < width; x += 64) {
      this.platforms.create(x + 32, groundY, 'platform').refreshBody();
    }
    this.platforms.create(width * 0.25, groundY - 100, 'platform').refreshBody();
    this.platforms.create(width * 0.55, groundY - 160, 'platform').refreshBody();
    this.platforms.create(width * 0.80, groundY - 120, 'platform').refreshBody();

    // Player
    this.player = new Player(this, 96, groundY - 100);
    this.physics.add.collider(this.player, this.platforms);

    // Camera follow
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12, 0, 40);

    // Non-movement hotkeys
    this.keys = this.input.keyboard.addKeys('ESC,P,G,M');

    // HUD timer
    this.timeEvent = this.time.addEvent({
      delay: 1000, loop: true,
      callback: () => { this.hud.time += 1; this.emitHud(); }
    });

    if (!this.scene.isActive('HUD')) this.scene.launch('HUD');
    this.emitHud();

    const openPause = () => {
      if (!this.scene.isActive('Pause')) {
        this.scene.launch('Pause'); this.scene.pause(); this.scene.pause('HUD');
      }
    };
    this.input.keyboard.on('keydown-ESC', openPause);
    this.input.keyboard.on('keydown-P', openPause);
    this.input.keyboard.on('keydown-G', () => this.goGameOver());
    this.input.keyboard.on('keydown-M', () => this.toMenu());
  }
  emitHud() { this.events.emit('hud:update', { ...this.hud }); }
  toMenu() { this.timeEvent?.remove(); this.scene.stop('HUD'); this.scene.start('MainMenu'); }
  goGameOver() {
    this.timeEvent?.remove(); this.scene.stop('HUD');
    this.scene.start('GameOver', { score: this.hud.score, time: this.hud.time });
  }
  update() {
    // Player handles its own movement in preUpdate.
  }
}
