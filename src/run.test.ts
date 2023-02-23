import * as Core from '@actions/core'
import run from './run'
import PullRequest from './pull-request'
import Config, { defaultConfig } from './config'
import generateSkipMessage from './utils/generate-skip-message'

describe('run', () => {
  const createdAt = new Date('2011-01-26T19:01:12Z')
  const allowed = ['development', '/(fix|feat|chore)/DEV-\\d{4}/']

  let setFailedSpy: jest.SpiedFunction<typeof Core.setFailed>
  let noticeSpy: jest.SpiedFunction<typeof Core.notice>

  beforeEach(() => {
    setFailedSpy = jest.spyOn(Core, 'setFailed').mockImplementation()
    noticeSpy = jest.spyOn(Core, 'notice').mockImplementation()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should fail if branch name is not allowed', () => {
    run(
      new PullRequest({ head: 'new_feature', createdAt }),
      new Config({ allowed })
    )

    expect(setFailedSpy).toBeCalledTimes(1)
    expect(setFailedSpy).toBeCalledWith('Your branch name is not allowed.')
  })

  it('should fail with a custom message if branch name is not allowed', () => {
    const errorMessage = 'This is a custom error message.'

    run(
      new PullRequest({ head: 'new_feature', createdAt }),
      new Config({ allowed, errorMessage })
    )

    expect(setFailedSpy).toBeCalledTimes(1)
    expect(setFailedSpy).toBeCalledWith(errorMessage)
  })

  it('should fail with an unknown error message if an unknown error occurs', () => {
    jest
      .spyOn(jest.requireActual('./utils/is-skip'), 'default')
      .mockImplementationOnce(() => {
        throw new RangeError()
      })

    run(
      new PullRequest({ head: 'new_feature', createdAt }),
      new Config({ allowed })
    )

    expect(setFailedSpy).toBeCalledTimes(1)
    expect(setFailedSpy).toBeCalledWith('Unknown Error')
  })

  it('should skip if pull request is created before the `startAfter` date', () => {
    const pullRequest = new PullRequest({ head: 'development', createdAt })

    const futureDate = new Date(
      new Date(createdAt).setDate(createdAt.getDate() + 1)
    )

    run(pullRequest, new Config({ allowed, startAfter: futureDate }))

    expect(noticeSpy).toBeCalledTimes(1)
    expect(noticeSpy).toBeCalledWith(generateSkipMessage(createdAt, futureDate))
    expect(setFailedSpy).not.toBeCalled()
  })

  it('should skip if pull request is created on the `startAfter` date', () => {
    const pullRequest = new PullRequest({ head: 'development', createdAt })

    const futureDate = new Date(
      new Date(createdAt).setDate(createdAt.getDate())
    )

    run(pullRequest, new Config({ allowed, startAfter: futureDate }))

    expect(noticeSpy).toBeCalledTimes(1)
    expect(noticeSpy).toBeCalledWith(generateSkipMessage(createdAt, futureDate))
    expect(setFailedSpy).not.toBeCalled()
  })

  it('should validate if pull request is created after the `startAfter` date', () => {
    const pullRequest = new PullRequest({ head: 'new_feature', createdAt })

    const pastDate = new Date(
      new Date(createdAt).setDate(createdAt.getDate() - 1)
    )

    run(pullRequest, new Config({ allowed, startAfter: pastDate }))

    expect(noticeSpy).not.toBeCalled()
    expect(setFailedSpy).toBeCalledTimes(1)
    expect(setFailedSpy).toBeCalledWith(defaultConfig.errorMessage)
  })

  it('should pass if branch name is an allowed string', () => {
    run(
      new PullRequest({ head: 'development', createdAt }),
      new Config({ allowed })
    )

    expect(setFailedSpy).not.toBeCalled()
  })

  it('should pass if branch name is an allowed Regex', () => {
    run(
      new PullRequest({ head: 'fix/DEV-1234', createdAt }),
      new Config({ allowed })
    )

    expect(setFailedSpy).not.toBeCalled()
  })
})
