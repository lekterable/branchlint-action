import RegexParser from 'regex-parser'
import isRegexy from 'is-regexy'

const validateName = (branchName: string, patterns: string[]) =>
  patterns.some(pattern =>
    isRegexy(pattern)
      ? RegexParser(pattern).test(branchName)
      : pattern === branchName
  )

export default validateName
