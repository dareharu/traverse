import { expect, test } from 'vitest'

import { main } from '../src'

test(`main()`, () => {
  expect(main()).toBe(`The Quick Brown Fox Jumps Over The Lazy Dog`)
})
