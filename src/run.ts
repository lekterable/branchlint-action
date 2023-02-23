import { notice, setFailed } from '@actions/core'
import Config from './config'
import PullRequest from './pull-request'
import generateSkipMessage from './utils/generate-skip-message'
import isSkip from './utils/is-skip'
import validateName from './utils/validate-name'

const run = (
  { createdAt, head }: PullRequest,
  { allowed, errorMessage, startAfter }: Config
) => {
  try {
    if (isSkip(createdAt, startAfter)) {
      return notice(generateSkipMessage(createdAt, startAfter as Date))
    }

    if (!validateName(head, allowed)) throw new Error(errorMessage)
  } catch (error: any) {
    setFailed((error && error.message) || 'Unknown Error')
  }
}

export default run
