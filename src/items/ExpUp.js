import Phaser from "phaser";
const ITEM_PROPERTY = {
  mob1: {
    exp: 22,
    color: "red",
  },
  mob2: {
    exp: 20,
    color: "blue",
  },
  mob3: {
    exp: 20,
    color: "blue",
  },
  mob4: {
    exp: 20,
    color: "blue",
  },
};

export default class ExpUp extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, mob) {
    const x = mob.x;
    const y = mob.y;
    super(scene, x, y, "exp-up");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.m_exp = ITEM_PROPERTY[mob.texture.key].exp;
    this.play(ITEM_PROPERTY[mob.texture.key].color);

    // 크게 , depth, 영역
    this.scale = 1.5;
    this.setDepth(7);
    this.setBodySize(20, 20);
  }
}
