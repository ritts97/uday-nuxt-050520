import udayDBStore from "./udayStore"
import udayMutations from "./mutations"

export const state = () => ({
  counter: 10,
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
    episodes: [
      {
        episodeID: "EP0 FL0",
        title: "Registered",
        created: "1 week ago",
        lastUpdated: "1 week ago",
        numFollowUps: "3",
        complaint: {
          chiefComplaint: "",
          vitals: "",
          genExams: "",
          specExams: "",
          addPhotos: ""
        },
        feedback: {
          medicine: "",
          investigations: "",
          advice: "",
          diagnosis: ""
        }
      }
    ],
    services: []
  },
  ...udayDBStore,
});

export const mutations = udayMutations;

export const actions = {
  recordEpisodeUpdateCurrPat (context, payload) {
    context.commit('recordNewEpisode', payload)
    context.commit('updateCurrPatient')
  }
}
