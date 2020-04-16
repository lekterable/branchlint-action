const core = require('@actions/core')
const github = require('@actions/github')
const RegexParser = require('regex-parser')

const isRegex = (input = '') => /^\/.*\/[gimsuy]*$/.test(input)
const validateName = (branchName = '', patterns = []) =>
  patterns.some(pattern =>
    isRegex(pattern)
      ? RegexParser(pattern).test(branchName)
      : pattern === branchName
  )

const run = async branchName => {
  try {
    const allowed = core.getInput('allowed', { required: true })
    const patterns = allowed.split('\n')

    const isCorrect = validateName(branchName, patterns)

    if (!isCorrect) throw new Error('Your branch name is not allowed')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run(github.context.payload.pull_request.head.ref)

module.exports = { isRegex, validateName }
