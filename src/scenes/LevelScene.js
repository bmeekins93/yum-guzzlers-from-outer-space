// src/scenes/LevelScene.js
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
    this.player = this.physics.add.sprite(96, groundY - 100, 'player');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W,A,S,D,ESC,P,G,M');
    this.timeEvent = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.hud.time += 1;
        this.emitHud();
      }
    });
    if (!this.scene.isActive('HUD')) {
      this.scene.launch('HUD');
    }
    this.emitHud();
    const openPause = () => {
      if (!this.scene.isActive('Pause')) {
        this.scene.launch('Pause');
        this.scene.pause();
        this.scene.pause('HUD');
      }
    };
    this.input.keyboard.on('keydown-ESC', openPause);
    this.input.keyboard.on('keydown-P', openPause);
    this.input.keyboard.on('keydown-G', () => this.goGameOver());
    this.input.keyboard.on('keydown-M', () => this.toMenu());
  }
  emitHud() {
    this.events.emit('hud:update', { ...this.hud });
  }
  toMenu() {
    this.timeEvent?.remove();
    this.scene.stop('HUD');
    this.scene.start('MainMenu');
  }
  goGameOver() {
    this.timeEvent?.remove();
    this.scene.stop('HUD');
    this.scene.start('GameOver', { score: this.hud.score, time: this.hud.time });
  }
  update() {
    const onGround = this.player.body?.blocked.down;
    const left = this.cursors.left.isDown || this.keys.A.isDown;
    const right = this.cursors.right.isDown || this.keys.D.isDown;
    const up = this.cursors.up.isDown || this.keys.W.isDown;
    const speed = 180;
    const jumpSpeed = -420;
    if (left) this.player.setVelocityX(-speed);
    else if (right) this.player.setVelocityX(speed);
    else this.player.setVelocityX(0);
    if (up && onGround) this.player.setVelocityY(jumpSpeed);
  }
}
