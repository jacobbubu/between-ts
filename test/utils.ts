import * as u from '../src'

export function assertBetween(
  lo: typeof u.lo,
  hi: typeof u.hi,
  depth: number = 1,
  between: typeof u.between = u.between
) {
  const b = between(lo, hi)

  expect(b > lo).toBeTruthy()
  expect(b < hi).toBeTruthy()

  if (depth === 0) return

  if (Math.random() >= 0.5) {
    assertBetween(lo, b, depth - 1, between)
  } else {
    assertBetween(b, hi, depth - 1, between)
  }
}
