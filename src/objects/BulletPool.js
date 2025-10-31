// src/objects/BulletPool.js
// Simple projectile pool using Phaser Arcade Physics.
// Bullets recycle on worldbounds, platform hits, or after a short lifespan.

export default class BulletPool extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    // Start empty; we'll spawn on demand
    this.createMultiple({
      frameQuantity: 0,
      key: 'bullet',
      active: false,
      visible: false,
      classType: Phaser.Physics.Arcade.Image,
    });

    // Worldbounds recycle
    this.world.on('worldbounds', (body) => {
      const go = body.gameObject;
      if (go && go.active && go.pool === this) this.recycle(go);
    });
  }

  fire(x, y, dir = 1, speed = 600) {
    const b = this.get(x, y, 'bullet');
    if (!b) return null;

    b.pool = this;
    b.setActive(true).setVisible(true);
    b.body.enable = true;
    b.setDepth(5);
    b.setAllowGravity(false);
    b.setBounce(0);
    b.setCollideWorldBounds(true);
    b.body.onWorldBounds = true;
    b.body.setSize(6, 2);

    b.setVelocity(speed * dir, 0);

    // Safety timeout in case a collider misses
    b.lifespan = 1200; // ms
    b.spawnTime = this.scene.time.now;
    return b;
  }

  recycle(b) {
    this.killAndHide(b);
    b.body.enable = false;
    b.setVelocity(0);
  }

  update(time) {
    this.children.iterate((b) => {
      if (!b || !b.active) return;
      if (time - (b.spawnTime || 0) > (b.lifespan || 1200)) this.recycle(b);
    });
  }
}
