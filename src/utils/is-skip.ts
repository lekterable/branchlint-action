const isSkip = (createdAt: Date, startAfter?: Date) =>
  startAfter ? createdAt <= startAfter : false

export default isSkip
