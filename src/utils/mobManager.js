import Mob from "../characters/Mob";
import { getRandomPosition } from "./math";
export function addMobEvent(
  scene,
  repeatGap,
  mobTexture,
  mobAnimKey,
  mobHp,
  dropRate
) {
  let timer = scene.time.addEvent({
    delay: repeatGap,
    callback: () => {
      let [x, y] = getRandomPosition(scene.m_player.x, scene.m_player.y);
      scene.m_mobs.add(
        new Mob(scene, x, y, mobTexture, mobAnimKey, mobHp, dropRate)
      );
    },
    loop: true,
  });
  scene.m_mobEvents.push(timer);
}

export function removeOldestMobEvent(scene) {
  let timer = scene.m_mobEvents.shift();
  timer.remove();
}
