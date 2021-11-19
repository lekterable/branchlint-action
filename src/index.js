const core = require('@actions/core')
const github = require('@actions/github')
const RegexParser = require('regex-parser')
const isRegexy = require('is-regexy')

const validateName = (branchName, patterns) =>
  patterns.some(pattern =>
    isRegexy(pattern)
      ? RegexParser(pattern).test(branchName)
      : pattern === branchName
  )

const errorMessage = message => {
  if (message == '') return 'Your branch name is not allowed'

  return message
}

const validateDate = (createdAt, startDate) => {
  createdAt = new Date(createdAt)

  if (startDate != '') {
    startDate = new Date(startDate)

    return createdAt < startDate
  }

  return false
}

const run = async pullRequest => {
  try {
    const branchName = pullRequest.head.ref
    const createdAt = pullRequest.created_at

    const message = core.getInput('error', { required: false })
    const startDate = core.getInput('startDate', { required: true })
    const allowed = core.getInput('allowed', { required: true })

    const patterns = allowed.split('\n')
    const isCorrect = validateName(branchName, patterns)

    if (validateDate(createdAt, startDate)) return

    if (!isCorrect) throw new Error(errorMessage(message))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run(github.context.payload.pull_request)

module.exports = { validateName, run }
