import validateName from './validate-name'

describe('validateName', () => {
  const allowed = ['development', '/(fix|feat|chore)/DEV-\\d{4}/']

  it('should validate using string', () => {
    expect(validateName('development', allowed)).toBe(true)
    expect(validateName('dev', allowed)).toBe(false)
  })

  it('should validate using Regex', () => {
    expect(validateName('fix/DEV-1234', allowed)).toBe(true)
    expect(validateName('foo/DEV-1234', allowed)).toBe(false)
  })
})
