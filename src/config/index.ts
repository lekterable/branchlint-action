import defaultConfig from './defaultConfig'

class Config {
  #allowed
  #errorMessage
  #startAfter

  constructor({
    allowed,
    errorMessage,
    startAfter
  }: {
    allowed: string[]
    errorMessage?: string
    startAfter?: Date
  }) {
    this.#allowed = allowed
    this.#errorMessage = errorMessage ?? defaultConfig.errorMessage
    this.#startAfter = startAfter ?? defaultConfig.startAfter
  }

  get allowed() {
    return this.#allowed
  }

  get errorMessage() {
    return this.#errorMessage
  }

  get startAfter() {
    return this.#startAfter
  }
}

export default Config
export { defaultConfig }
