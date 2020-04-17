const { validateName, run } = require('../src/')
const core = require('@actions/core')

jest.mock('@actions/core', () => ({
  getInput: () => `development\n/(fix|feat|chore)/DEV-\\d{4}/`,
  setFailed: jest.fn()
}))
jest.mock('@actions/github', () => ({
  context: {
    payload: {
      pull_request: {
        head: {
          ref: 'development'
        }
      }
    }
  }
}))

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

describe('run', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should fail if branch name is not allowed', () => {
    run('master')

    expect(core.setFailed).toBeCalledTimes(1)
    expect(core.setFailed).toBeCalledWith('Your branch name is not allowed')
  })

  it('should pass if branch name is an allowed string', () => {
    run('development')

    expect(core.setFailed).not.toBeCalled()
  })

  it('should pass if branch name is an allowed Regex', () => {
    run('fix/DEV-1234')

    expect(core.setFailed).not.toBeCalled()
  })
})
