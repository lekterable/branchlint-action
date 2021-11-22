const { validateName, run } = require('../src/')
const core = require('@actions/core')
const github = require('@actions/github')

jest.mock('@actions/core', () => ({
  getInput: name =>
    process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '',
  setFailed: jest.fn()
}))

jest.mock('@actions/github', () => ({
  context: {
    payload: {
      pull_request: {
        created_at: '2011-01-26T19:01:12Z',
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
    github.context.payload.pull_request.head.ref = 'master'
    process.env.INPUT_ALLOWED = `development\n/(fix|feat|chore)/DEV-\\d{4}/`
    process.env.INPUT_ERROR = ''
    process.env.INPUT_STARTDATE = ''
  })

  it('should fail if branch name is not allowed', () => {
    run(github.context.payload.pull_request)

    expect(core.setFailed).toBeCalledTimes(1)
    expect(core.setFailed).toBeCalledWith('Your branch name is not allowed')
  })

  it('should fail with a custom message if branch name is not allowed', () => {
    const errorMsg = 'This is a custom error message'
    process.env.INPUT_ERROR = errorMsg

    run(github.context.payload.pull_request)

    expect(core.setFailed).toBeCalledTimes(1)
    expect(core.setFailed).toBeCalledWith(errorMsg)
  })

  it('should pass if created at is before start date', () => {
    let date = new Date(github.context.payload.pull_request.created_at)
    date.setDate(date.getDate() + 1)
    process.env.INPUT_STARTDATE = date.toISOString()

    run(github.context.payload.pull_request)

    expect(core.setFailed).not.toBeCalled()
  })

  it('should fail if created at is after start date', () => {
    let date = new Date(github.context.payload.pull_request.created_at)
    date.setDate(date.getDate() - 1)
    process.env.INPUT_STARTDATE = date.toISOString()

    run(github.context.payload.pull_request)

    expect(core.setFailed).toBeCalledTimes(1)
    expect(core.setFailed).toBeCalledWith('Your branch name is not allowed')
  })

  it('should pass if branch name is an allowed string', () => {
    github.context.payload.pull_request.head.ref = 'development'
    run(github.context.payload.pull_request)

    expect(core.setFailed).not.toBeCalled()
  })

  it('should pass if branch name is an allowed Regex', () => {
    github.context.payload.pull_request.head.ref = 'fix/DEV-1234'
    run(github.context.payload.pull_request)

    expect(core.setFailed).not.toBeCalled()
  })
})
