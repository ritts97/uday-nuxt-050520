import udayDBStore from "./udayStore"
import udayMutations from "./mutations"

export const state = () => ({
  currPath: [
    {
      title: "Dashboard",
      url: "/ha"
    }
  ],
  currCluster: 'cluster001',
  currUser: {},
  currPatient: {
    id: "",
    status: "",
    regBy: "",
    demographics: {
      name: "",
      occupation: '',
      gender: "",
      age: "",
      hswd: '',
      address: "",
      address2: "",
      police: "",
      phone: "",
      location: ""
    },
    episodes: [],
    services: []
  },
  currEpisode: {},
  ...udayDBStore,
});

export const mutations = udayMutations;

export const actions = {
  recordEpisodeUpdateCurrPat (context, payload) {
    context.commit('recordNewEpisode', payload)
    context.commit('updateCurrPatient')
  }
}
