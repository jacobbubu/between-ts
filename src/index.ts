function strord(a: string, b: string) {
  return a === b ? 0 : a < b ? -1 : 1
}

function inject(candidates?: string) {
  const charsArr = (
    candidates || '!0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~'
  )
    .split('')
    .sort()
  const chars = charsArr.join('')

  const charsLength = chars.length
  const lookup = charsArr.reduce(function(accumulator, char, idx) {
    accumulator[char] = idx
    return accumulator
  }, {} as Record<string, number>)

  const lo = chars[0]
  const hi = chars[chars.length - 1]

  function randstr(len: number) {
    let arr = new Array(len)
    while (len-- > 1) {
      arr[len] = chars[Math.floor(Math.random() * charsLength)]
    }

    arr[0] = chars[Math.floor(Math.random() * (charsLength - 2)) + 1]

    return arr.join('')
  }

  // trim lo chars on the right
  function trim(s: string) {
    let end = s.length
    while (end > 1 && s[end - 1] === lo) {
      end--
    }
    return s.slice(0, end)
  }

  function between(a = lo, b = hi, bypassCheck = false) {
    let betweenString = ''
    let i = 0

    if (!bypassCheck && strord(trim(a), trim(b)) >= 0) {
      throw Error(
        `Impossible to generate a string that lexicographically sorts between '${a}' and '${b}'`
      )
    }

    // invariant: a < b
    const guard = a.length + b.length
    const guard2 = Math.max(a.length, b.length)

    while (i <= guard) {
      let _a = lookup[a[i]] || 0
      let _b = lookup[b[i]]

      if (_b === void 0) {
        _b = charsLength - 1
      }

      const c = chars[_a + 1 < _b || i >= guard2 ? Math.round((_a + _b) / 2) : _a]

      betweenString += c

      if (a < betweenString && betweenString < b && c !== exports.lo) {
        return betweenString
      }

      i++
    }

    throw Error(
      `Unable to produce proper string that can be sorted between '${a}' and '${b}'. Generated: ${betweenString}`
    )
  }

  return { lo, hi, randstr, chars, between }
}

const { lo, hi, randstr, chars, between } = inject()
export { strord, lo, hi, randstr, between, chars, inject }
