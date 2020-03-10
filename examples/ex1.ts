import { between, inject } from '../src'

console.log(between('A', 'B'))
// AV

const binaryBetween = inject('01').between
console.log(binaryBetween('0', '0', true))
// 01
