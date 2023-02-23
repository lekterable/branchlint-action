import generateSkipMessage from './generate-skip-message'

describe('generateSkipMessage', () => {
  it('should generate a skip message', () => {
    const createdAt = new Date('1998-02-02')
    const startAfter = new Date('2001-09-07')

    expect(generateSkipMessage(createdAt, startAfter)).toMatchInlineSnapshot(
      `"Linting was skipped as the branch was created on \`Mon Feb 02 1998\` which is before the provided \`startAfter\` date of \`Fri Sep 07 2001\`."`
    )
  })

  it('should generate a skip message with timestamp', () => {
    const createdAt = new Date('1998-02-02 00:00:00')
    const startAfter = new Date('2001-09-07 00:00:00')

    expect(generateSkipMessage(createdAt, startAfter)).toMatchInlineSnapshot(
      `"Linting was skipped as the branch was created on \`Mon Feb 02 1998\` which is before the provided \`startAfter\` date of \`Fri Sep 07 2001\`."`
    )
  })
})
