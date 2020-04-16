const { isRegex } = require('../src/')

describe('isRegex', () => {
  it('should validate non-Regex', () => {
    expect(isRegex('development')).toBe(false)
  })

  it('should validate Regex', () => {
    expect(isRegex('/development/')).toBe(true)
  })

  it('should validate Regex with flag', () => {
    expect(isRegex('/development/i')).toBe(true)
  })

  it('should validate Regex with multiple flags', () => {
    expect(isRegex('/development/ig')).toBe(true)
  })

  it('should validate Regex with invalid flag', () => {
    expect(isRegex('/development/x')).toBe(false)
  })
})
