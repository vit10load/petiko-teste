export default {
  setItem(login) {
    localStorage.setItem("login", JSON.stringify(login))
  },

  updateItem(login) {
    const tokenAtual = this.getItem()
    login.token = tokenAtual.token

    localStorage.setItem("login", JSON.stringify(login))
  },

  getItem() {
    if (localStorage.getItem("login")) {
      try {
        return JSON.parse(localStorage.getItem("login"))
      } catch (error) {
        localStorage.removeItem("login")
      }
    }
  },

  removeItem() {
    localStorage.removeItem("login")
  }
}
