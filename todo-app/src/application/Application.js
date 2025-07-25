import TriggerEvents from "@/application/engine/TriggerEvents"
import RootPageCreator from "@/application/engine/RootPageCreator"

export default class Application {
  static run() {
    TriggerEvents.triggerOnStartEvents().then(() => {
      RootPageCreator.createInstance()
    })
  }
}
