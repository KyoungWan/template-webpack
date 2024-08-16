import Phaser from "phaser";

// Mob 과 동일
export default class Beam extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, startingPosition, damage, scale) {
    super(scene, startingPosition[0], startingPosition[1], "beam");

    this.SPEED = 100;
    this.DURATION = 1500;
    scene.add.existing(this);
    // 충돌감지가 가능하게 한다.
    scene.physics.world.enableBody(this);

    scene.m_weaponDynamic.add(this);
    // scene.m_beamSound.play();

    this.m_damage = damage;
    this.scale = scale;

    this.setScale(scale);

    this.setDepth(30);
    this.setVelocity();
    this.setAngle();

    scene.time.addEvent({
      delay: this.DURATION,
      callback: () => {
        this.destroy();
      },
      loop: false,
    });
  }

  setVelocity() {
    if (!this.scene.m_closest) {
      this.setVelocityY(-this.SPEED);
      return;
    }

    const _x = this.scene.m_closest.x - this.x;
    const _y = this.scene.m_closest.y - this.y;
    const _r = Math.sqrt(_x * _x + _y * _y) / 2;
    this.body.velocity.x = (_x / _r) * this.SPEED;
    this.body.velocity.y = (_y / _r) * this.SPEED;
  }

  setAngle() {
    const angleToMob = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.scene.m_closest.x,
      this.scene.m_closest.y
    );
    // this.rotation = angleToMob;
    // this.rotation = angleToMob + Math.PI;
    this.rotation = angleToMob + Math.PI / 2 + Math.PI / 4;

    // 회전속도
    this.body.setAngularVelocity(0);
  }

  setDamage(damage) {
    this.m_damage = damage;
  }
}
