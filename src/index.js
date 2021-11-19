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

const run = async branchName => {
  try {
    const currentdate = new Date()
    let startDate = core.getInput('startDate', { required: true })

    if (startDate != '') {
      startDate = new Date(startDate)

      if (startDate >= currentdate) return
    }

    const allowed = core.getInput('allowed', { required: true })
    const patterns = allowed.split('\n')
    const isCorrect = validateName(branchName, patterns)

    let errorMsg = core.getInput('error', { required: false })

    if (errorMsg == '') errorMsg = 'Your branch name is not allowed'

    if (!isCorrect) throw new Error(errorMsg)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run(github.context.payload.pull_request.head.ref)

module.exports = { validateName, run }
