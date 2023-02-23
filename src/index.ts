import { getInput, getMultilineInput } from '@actions/core'
import { context } from '@actions/github'
import run from './run'
import PullRequest from './pull-request'
import Config from './config'

// @ts-expect-error -- Types are imprecise and don't specify those properties on `pull_request`, but they exist
const { created_at, head } = context.payload.pull_request
const pullRequest = new PullRequest({
  head: head.ref,
  createdAt: new Date(created_at)
})

const allowed = getMultilineInput('allowed', { required: true })
const errorMessage = getInput('errorMessage', { required: false })
const startAfter = getInput('startAfter', { required: false })

const config = new Config({
  allowed,
  errorMessage,
  startAfter: startAfter ? new Date(startAfter) : undefined
})

run(pullRequest, config)
