import Config from "../Config";

export function getRandomPosition(x, y) {
  const randRad = Math.random() * Math.PI * 2;
  const _r =
    Math.sqrt(Config.width * Config.width + Config.height * Config.height) / 2;
  const _x = x + Math.cos(randRad) * _r;
  const _y = y + Math.sin(randRad) * _r;
  return [_x, _y];
}
