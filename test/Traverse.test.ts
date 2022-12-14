import { beforeEach, describe, expect, test } from 'vitest'

import { Traverse } from '@/Traverse'

const traverser = new Traverse({ a: 10, b: 20, c: { d: 45 } })

describe(`#get()`, () => {
  test(`should be match getting "a" to 10`, () => {
    expect(traverser.get(`a`)).toBe(10)
  })

  test(`should be match getting "b" to 20`, () => {
    expect(traverser.get(`b`)).toBe(20)
  })

  test(`should be match getting literal "c.d" to 45`, () => {
    expect(traverser.get(`c.d`)).toBe(45)
  })

  test(`should be match getting nested "['c', 'd']" to 45`, () => {
    expect(traverser.get([`c`, `d`])).toBe(45)
  })
})

describe(`#has()`, () => {
  test(`should be exist getting "a" or "b"`, () => {
    expect(traverser.has(`a`)).toBe(true)
    expect(traverser.has(`b`)).toBe(true)
  })

  test(`should be exist getting literal "c.d"`, () => {
    expect(traverser.has(`c.d`)).toBe(true)
  })

  test(`should be exist getting nested "['c', 'd']"`, () => {
    expect(traverser.has([`c`, `d`])).toBe(true)
  })

  test(`should be no exist getting "e"`, () => {
    expect(traverser.has(`e`)).toBe(false)
  })
})

describe(`#set()`, () => {
  let traverser: Traverse<Record<string, unknown>, Traverse.Options>

  beforeEach(() => {
    traverser = new Traverse({})
  })

  test(`should be match putting "e" to 7`, () => {
    const [key, value] = [`e`, 7]

    expect(traverser.has(key)).toBe(false)
    expect(traverser.set(key, value)).toBe(value)

    expect(traverser.has(key)).toBe(true)
    expect(traverser.get(key)).toBe(value)
  })

  test(`should be match putting "f.g" to "value"`, () => {
    const [key, value] = [`f,g`, `Reinhardt`]

    expect(traverser.has(key)).toBe(false)
    expect(traverser.set(key, value)).toBe(value)

    expect(traverser.has(key)).toBe(true)
    expect(traverser.get(key)).toBe(value)
  })
})
