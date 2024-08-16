import Phaser from "phaser";
import { clamp } from "../utils/math";
import Config from "../Config";

export default class ExpBar extends Phaser.GameObjects.Graphics {
  constructor(scene, maxExp) {
    super(scene);

    this.HEIGHT = 30;
    this.BORDER = 4;

    this.m_x = 0;
    this.m_y = 30;

    this.m_maxExp = maxExp;
    this.m_currentExp = 0;

    this.draw();
    // setScrollFactor는 화면이 이동해도 오브젝트의 위치가 고정되어 보이게 하는 함수입니다.
    this.setScrollFactor(0);
    this.setDepth(20);

    scene.add.existing(this);
  }

  increase(amount) {
    console.log(`increase: ${amount}`);
    this.m_currentExp = clamp(this.m_currentExp + amount, 0, this.m_maxExp);
    this.draw();
  }

  reset() {
    this.m_currentHp = 0;
    this.draw();
  }

  draw() {
    this.clear();

    this.fillStyle(0x000000);
    this.fillRect(this.m_x, this.m_y, Config.width, this.HEIGHT);

    this.fillStyle(0xffffff);
    this.fillRect(
      this.m_x + this.BORDER,
      this.m_y + this.BORDER,
      Config.width - 2 * this.BORDER,
      this.HEIGHT - 2 * this.BORDER
    );

    this.fillStyle(0x3665d5);
    const width =
      (Config.width - 2 * this.BORDER) * (this.m_currentExp / this.m_maxExp);
    console.log(
      "this.m_currentExp, this.m_maxExp",
      this.m_currentExp,
      this.m_maxExp
    );
    this.fillRect(
      this.m_x + this.BORDER,
      this.m_y + this.BORDER,
      width,
      this.HEIGHT - 2 * this.BORDER
    );
  }
}
