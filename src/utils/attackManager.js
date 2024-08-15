import Beam from "../effects/Beam";
export function addAttackEvent(
  scene,
  attackType,
  attackDamage,
  attackScale,
  repeatGap
) {
  switch (attackType) {
    case "beam":
      let timer = scene.time.addEvent({
        delay: repeatGap,
        callback: () => {
          shootBeam(scene, attackDamage, attackScale);
        },
        loop: true,
      });
      scene.m_attackEvents.beam = timer;
      break;
    default:
      break;
  }
}

const shootBeam = (scene, attackDamage, attackScale) => {
  new Beam(
    scene,
    [scene.m_player.x, scene.m_player.y - 16],
    attackDamage,
    attackScale
  );
};
