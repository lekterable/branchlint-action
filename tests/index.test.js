const { isRegex, validateName } = require('../src/')

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

describe('validateName', () => {
  const patterns = ['development', '/(fix|feat|chore)/DEV-\\d{4}/']

  it('should validate using string pattern', () => {
    expect(validateName('development', patterns)).toBe(true)
    expect(validateName('dev', patterns)).toBe(false)
  })

  it('should validate using Regex pattern', () => {
    expect(validateName('fix/DEV-1234', patterns)).toBe(true)
    expect(validateName('foo/DEV-1234', patterns)).toBe(false)
  })
})
