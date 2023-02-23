const generateSkipMessage = (createdAt: Date, startAfter: Date) =>
  `Linting was skipped as the branch was created on \`${createdAt.toDateString()}\` which is before the provided \`startAfter\` date of \`${startAfter.toDateString()}\`.`

export default generateSkipMessage
