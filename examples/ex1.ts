import { between, inject } from '../src'

console.log(between('A', 'B'))
// AV

const binaryBetween = inject('01').between
console.log(binaryBetween('0', '1'))
// 01

console.log(binaryBetween('0', '0'))
// Error: Impossible to generate a string that lexicographically sorts between '0' and '0'
