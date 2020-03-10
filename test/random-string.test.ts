import { randstr, chars, inject } from '../src'

function validRandomString(candidates: string, len: number, value: string) {
  expect(value.length).toBe(len)
  for (let i = 0; i < value.length; i++) {
    expect(candidates.indexOf(value[i])).toBeGreaterThanOrEqual(0)
  }
}

describe('randstr', () => {
  it('randstr', () => {
    let len = 1024
    validRandomString(chars, len, randstr(len))
  })

  it('randstr-customized', () => {
    let len = 1024
    const { chars, randstr } = inject('01234')
    validRandomString(chars, len, randstr(len))
  })
})
