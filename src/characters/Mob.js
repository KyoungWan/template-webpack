import Phaser from "phaser";

export default class Mob extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, animKey, initHp, dropRate) {
    // super(scene, Config.width / 2, Config.height / 2, "player");
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // 몹은 멈출일이 없다.
    this.play(animKey);

    // z-index개념 (디폴트 0)
    this.setDepth(50);
    this.scale = 2;

    this.m_speed = 50;
    this.m_hp = initHp;
    this.m_dropRate = dropRate;

    if (texture == "mob1") {
      this.setBodySize(24, 14, false); // 기어다니는 놈들은 중심점을 센터에 주면 안된다.
      this.setOffset(0, 14);
    }
    if (texture == "mob2") {
      this.setBodySize(24, 32);
    }
    if (texture == "mob3") {
      this.setBodySize(24, 32);
    }
    if (texture == "mob4") {
      this.setBodySize(24, 32);
    }
    if (texture == "lion") {
      this.setBodySize(40, 64);
    }

    // 몹들이 캐릭터를 따라가도록
    this.m_events = [];
    this.m_events.push(
      this.scene.time.addEvent({
        delay: 100,
        callback: () => {
          scene.physics.moveToObject(this, scene.m_player, this.m_speed);
        },
        loop: true,
      })
    );

    // Phaser.Scnene 은 update 가 있지만, Mob은 없다.
    // Scene의 update가 실행될때마다 mob도 update함수가 실행되도록 한다.
    scene.events.on("update", (time, delta) => {
      this.update(time, delta);
    });
  }
  update(time, delta) {
    if (!this.body) {
      return;
    }

    if (this.x < this.scene.m_player.x) {
      this.flipX = true;
    } else {
      this.flipX = false;
    }
    if (this.m_hp <= 0) {
      this.destroy();
    }
  }
}
