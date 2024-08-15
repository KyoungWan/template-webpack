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
    this.m_canBeAttacked = true;

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
  }
  // mob이 dynamic attack에 맞을 경우 실행되는 함수입니다.
  hitByDynamic(weaponDynamic, damage) {
    console.log("!!!!!!!!!!!!!!!!hit!!!!!!!!!!!!!!!!!!");

    // 공격에 맞은 소리를 재생합니다.
    // this.scene.m_hitMobSound.play();
    // 몹의 hp에서 damage만큼 감소시킵니다.
    this.m_hp -= damage;
    // 공격받은 몹의 투명도를 1초간 조절함으로써 공격받은 것을 표시합니다.
    this.displayHit();

    // dynamic 공격을 제거합니다.
    weaponDynamic.destroy();
  }

  // mob이 static attack에 맞을 경우 실행되는 함수입니다.
  hitByStatic(damage) {
    // 쿨타임인 경우 바로 리턴합니다.
    if (!this.m_canBeAttacked) return;

    // 공격에 맞은 소리를 재생합니다.
    // this.scene.m_hitMobSound.play();
    // 몹의 hp에서 damage만큼 감소시킵니다.
    this.m_hp -= damage;
    // 공격받은 몹의 투명도를 1초간 조절함으로써 공격받은 것을 표시합니다.
    this.displayHit();
    // 쿨타임을 갖습니다.
    this.getCoolDown();
  }

  // 공격받은 mob을 투명도를 1초간 조절함으로써 공격받은 것을 표시합니다.
  displayHit() {
    // 몹의 투명도를 0.5로 변경하고,
    // 1초 후 1로 변경합니다.
    this.alpha = 0.5;
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.alpha = 1;
      },
      loop: false,
    });
  }

  // 1초 쿨타임을 갖는 함수입니다.
  getCoolDown() {
    // 공격받을 수 있는지 여부를 false로 변경하고,
    // 1초 후 true로 변경합니다.
    this.m_canBeAttacked = false;
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.m_canBeAttacked = true;
      },
      loop: false,
    });
  }
}
