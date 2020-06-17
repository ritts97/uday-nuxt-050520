export const state = () => ({
  counter: 10,
  currPath: [
    {
      title: 'Dashboard',
      url: '/ha'
    }
  ],
  currPatient: {
    id: 'AAA1',
    name: 'Delores Abernathy (from Store)',
    gender: 'M',
    age: 99,
    phone: '1-415-555-1234',
    location: 'Hyperbad, IN',
    creator: 'Jane Doe',
    cluster: 'Cluster 001',
    status: 'registered',
    demographics: {},
    episodes: [{
      episodeID: 'EP0 FU0',
      title: 'Registered',
      created: '1 week ago',
      lastUpdated: '1 week ago',
      numFollowUps: '3',
      complaint: {
        chiefComplaint: '',
        vitals: '',
        genExams: '',
        specExams: '',
        addPhotos: ''
      },
      feedback: {
        medicine: '',
        investigations: '',
        advice: '',
      }
    }],
    services: [],
    bills: []
  },
  patientList: [
    {
      id: 'AAA1',
      name: 'Delores Abernathy (from Store)',
      gender: 'M',
      age: 99,
      phone: '1-415-555-1234',
      location: 'Hyperbad, IN',
      creator: 'Jane Doe',
      cluster: 'Cluster 001',
      status: 'registered',
      demographics: {},
      episodes: [
        {
          episodeID: 'EP01 FU00',
          title: 'Episode 1',
          created: '1 week ago',
          lastUpdated: '1 week ago',
          numFollowUps: '3',
          complaint: {
            chiefComplaint: '',
            vitals: '',
            genExams: '',
            specExams: '',
            addPhotos: ''
          },
          feedback: {
            medicine: '',
            investigations: '',
            advice: '',
          }
        }
      ],
      services: [],
      bills: []
    }
  ]
})

export const mutations = {
  updatePath(state, payload) {
    state.currPath = payload
  },
  updateStatus(state, payload) {
    state.currPatient.status = payload
  },
  increment(state, payload) {
    if (payload) {
      state.counter += payload
    } else {
      state.counter++
    }
  },
  recordNewEpisode(state, payload) {
    let episodeLen = state.currPatient.episodes.length

    state.currPatient.episodes.unshift(
      {
        type: 'episode',
        billed: '',
        link: '/ha/profile/profile-visit',
        episodeID: 'EP01 FL00',
        title: 'Episode ' + episodeLen,
        created: '1 week ago',
        lastUpdated: '1 week ago',
        numFollowUps: '3',
        complaint: {
          chiefComplaint: '',
          vitals: '',
          genExams: '',
          specExams: '',
          addPhotos: ''
        },
        feedback: {
          medicine: '',
          investigations: '',
          advice: '',
        }
      }
    )

    console.log(state.currPatient.episodes)
  },
  registerPatient(state, payload) {
    state.patientList.unshift(
      {
        id: 'AAA1',
        name: 'Delores Abernathy (from App)',
        gender: 'M',
        age: 99,
        phone: '1-415-555-1234',
        location: 'Hyperbad, IN',
        creator: 'Jane Doe',
        cluster: 'Cluster 001',
        status: 'registered',
        demographics: {},
        episodes: [{
          episodeID: 'EP01 FU00',
          title: 'Episode 1',
          created: '1 week ago',
          lastUpdated: '1 week ago',
          numFollowUps: '3',
          complaint: {
            chiefComplaint: '',
            vitals: '',
            genExams: '',
            specExams: '',
            addPhotos: ''
          },
          feedback: {
            medicine: '',
            investigations: '',
            advice: '',
          }
        }],
        services: [],
        bills: []
      }
    )
  },
}

export const actions = {
  increment (context, payload) {
    context.commit('increment', payload)
  }
}
