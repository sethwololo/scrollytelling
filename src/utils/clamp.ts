/**
 * Restringe um valor entre um valor mínimo e máximo.
 *
 * @param {number} val - O valor a ser restringido.
 * @param {number} min - O valor mínimo.
 * @param {number} max - O valor máximo.
 * @return {number} O resultado.
 */
export function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}
