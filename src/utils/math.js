import Config from "../Config";

export function getRandomPosition(x, y) {
  const randRad = Math.random() * Math.PI * 2;
  const _r =
    Math.sqrt(Config.width * Config.width + Config.height * Config.height) / 2;
  const _x = x + Math.cos(randRad) * _r;
  const _y = y + Math.sin(randRad) * _r;
  return [_x, _y];
}

/***
 * @param {Number} value
 * @param {Number} lo
 * @param {Number} hi
 * @returns {number} value가 lo 이상 hi 이하라면 value 그대로, lo 미만이면 lo, hi 초과면 hi를 리턴한다.
 * @type Number
 */
export function clamp(value, lo, hi) {
  return Math.min(Math.max(value, lo), hi);
}
