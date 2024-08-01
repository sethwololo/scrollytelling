/**
 * Calcula a interpolação linear entre dois números.
 *
 * @param {number} start - O valor inicial.
 * @param {number} end - O valor final.
 * @param {number} t - O fator de interpolação, um valor entre 0 e 1.
 * @return {number} O valor interpolado.
 */
export function lerp(start: number, end: number, t: number) {
  return start + t * (end - start)
}
