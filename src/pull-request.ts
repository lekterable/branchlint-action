class PullRequest {
  #head
  #createdAt

  constructor({ head, createdAt }: { head: string; createdAt: Date }) {
    this.#head = head
    this.#createdAt = createdAt
  }

  get head() {
    return this.#head
  }

  get createdAt() {
    return this.#createdAt
  }
}

export default PullRequest
