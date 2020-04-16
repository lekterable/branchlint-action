const core = require('@actions/core')
const github = require('@actions/github')
const RegexParser = require('regex-parser')

const isRegex = (input = '') => /^\/.*\/[gimsuy]*$/.test(input)
const validateName = (patterns = [], branchName = '') =>
  patterns.some(pattern =>
    isRegex(pattern)
      ? RegexParser(pattern).test(branchName)
      : pattern === branchName
  )

const run = async () => {
  try {
    const allowed = core.getInput('allowed', { required: true })
    const branchName = github.context.payload.pull_request.head.ref
    const patterns = allowed.split('\n')

    const isCorrect = validateName(patterns, branchName)

    if (!isCorrect) throw new Error('Your branch name is not allowed')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

module.exports = { isRegex }
