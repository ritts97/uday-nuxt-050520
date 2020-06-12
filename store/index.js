export const state = () => ({
  counter: 10,
  currPath: [
    {
      title: 'Dashboard',
      url: '/ha'
    }
  ]
})

export const mutations = {
  increment(state, payload) {
    state.currPath = payload
  }
}