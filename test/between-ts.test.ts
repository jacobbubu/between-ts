import { between, randstr, inject } from '../src'
import { assertBetween } from './utils'

describe('between', () => {
  it('between', () => {
    expect(between('A', 'B')).toBe('AV')
    expect(inject('012').between('0', '2')).toBe('1')
    expect(inject('01').between('0', '1')).toBe('01')
    expect(inject('01').between('0', '01')).toBe('00')
    expect(() => inject('01').between('0', '0')).toThrowError(/Impossible*/)
    expect(() => inject('01').between('1', '0')).toThrowError(/Impossible*/)
  })

  it('between-bypass', () => {
    expect(() => inject('01').between('0', '0', true)).toThrowError(/Unable*/)
  })

  it('between-repeated', () => {
    assertBetween('!', '~', 200)
  })

  /*
    same as above but this time, append a random string to each.
    (I'm gonna use this to generate concurrently ordered strings
    that are unlikely to collide)
  */
  it('between-repeated2', () => {
    assertBetween('!', '~', 200, function(a, b) {
      return between(a, b) + randstr(5)
    })
  })

  it('between-repeated3', () => {
    assertBetween('!', '~', 10, inject('$&[{}(=*)+]!#~`').between)
  })
})
