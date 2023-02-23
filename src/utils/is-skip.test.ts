import isSkip from './is-skip'

describe('isSkip', () => {
  const createdAt = new Date('1998-02-02 00:00:00')
  it('should return `true` if `createdAt` is before the `startAfter` date', () => {
    const startAfter = new Date(
      new Date(createdAt).setDate(createdAt.getDate() + 1)
    )

    expect(isSkip(createdAt, startAfter)).toBe(true)
  })

  it('should return `true` if `createdAt` is equal to the `startAfter` date', () => {
    const startAfter = createdAt

    expect(isSkip(createdAt, startAfter)).toBe(true)
  })

  it('should return `false` if `createdAt` is after the `startAfter` date', () => {
    const startAfter = new Date(
      new Date(createdAt).setDate(createdAt.getDate() - 1)
    )

    expect(isSkip(createdAt, startAfter)).toBe(false)
  })
})
