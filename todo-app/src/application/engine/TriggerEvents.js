import interceptors from "../interceptors"

class TriggerEvent {
  async triggerOnStartEvents() {
    const starterPromise = Promise.resolve(null)
    const tasks = Object.keys(interceptors)

    await tasks.reduce(
      (p, task) => p.then(() => interceptors[task].execute().then()),
      starterPromise
    )
  }
}

export default new TriggerEvent()
