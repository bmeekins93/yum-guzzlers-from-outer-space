// src/objects/Player.js
// Player controller with coyote time + jump buffer + variable jump height.
// Phaser 3 Arcade Physics

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // ---- Physics tuning ----
    this.setCollideWorldBounds(true);
    this.setMaxVelocity(260, 1100);
    this.setDragX(1200); // strong ground friction when no input
    this.body.setSize(14, 16).setOffset(1, 0); // slight inset for nicer platforming

    // ---- Movement parameters (README baseline) ----
    this.runSpeed = 220;
    this.accel = 1200;
    this.airAccel = 800;
    this.airDrag = 80;
    this.jumpVel = -520;
    this.maxFall = 900;

    // Coyote + buffer (ms)
    this.coyoteMS = 100;
    this.bufferMS = 100;

    // Extra gravity when rising without holding jump, and when falling
    this.extraRiseGravity = 900;
    this.extraFallGravity = 990;

    // State timers (ms)
    this.coyoteTimer = 0;
    this.bufferTimer = 0;

    // Input setup
    this.keys = scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE
    });

    // Buffer jump on press (any of the jump keys)
    const setBuffer = () => { this.bufferTimer = this.bufferMS; };
    scene.input.keyboard.on('keydown-UP', setBuffer);
    scene.input.keyboard.on('keydown-W', setBuffer);
    scene.input.keyboard.on('keydown-SPACE', setBuffer);

    this._cleanup = () => {
      scene.input.keyboard.off('keydown-UP', setBuffer);
      scene.input.keyboard.off('keydown-W', setBuffer);
      scene.input.keyboard.off('keydown-SPACE', setBuffer);
    };
    this.on('destroy', this._cleanup);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    const dt = delta; // ms

    const onGround = this.body.blocked.down;

    // --- Timers ---
    if (onGround) this.coyoteTimer = this.coyoteMS;
    else if (this.coyoteTimer > 0) this.coyoteTimer -= dt;

    if (this.bufferTimer > 0) this.bufferTimer -= dt;

    // --- Horizontal movement (accel + friction/drag) ---
    const left = this.keys.left.isDown || this.keys.a.isDown;
    const right = this.keys.right.isDown || this.keys.d.isDown;

    const target = left ? -this.runSpeed : right ? this.runSpeed : 0;
    const accel = onGround ? this.accel : this.airAccel;

    if (target !== 0) {
      this.setAccelerationX(accel * Math.sign(target));
      this.setDragX(onGround ? 100 : this.airDrag); // lower drag while accelerating
    } else {
      this.setAccelerationX(0);
      this.setDragX(onGround ? 1200 : this.airDrag);
    }

    // --- Jumping (buffer + coyote) ---
    const jumpHeld = this.keys.space.isDown || this.keys.up.isDown || this.keys.w.isDown;
    const wantsJump = this.bufferTimer > 0;
    if (wantsJump && (onGround || this.coyoteTimer > 0)) {
      this.setVelocityY(this.jumpVel);
      this.coyoteTimer = 0;
      this.bufferTimer = 0;
    }

    // --- Variable jump height & falling gravity ---
    if (this.body.velocity.y < 0 && !jumpHeld) {
      this.body.setGravityY(this.extraRiseGravity);     // world g + extra
    } else if (this.body.velocity.y >= 0) {
      this.body.setGravityY(this.extraFallGravity);     // heavier fall
    } else {
      this.body.setGravityY(0);                         // just world gravity
    }

    // Clamp fall speed
    if (this.body.velocity.y > this.maxFall) this.setVelocityY(this.maxFall);
  }

  destroy(fromScene) {
    if (this._cleanup) this._cleanup();
    super.destroy(fromScene);
  }
}
