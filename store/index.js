import udayDBStore from "./udayStore"

export const state = () => ({
  counter: 10,
  currPath: [
    {
      title: "Dashboard",
      url: "/ha"
    }
  ],
  currCluster: 'cluster001',
  currUser: {
    name: 'Jane Doe (RN)',
    id: 'ha0001',
    role: 'ha',
    status: 'online',
    cluster: 'cluster0001',
    bio: 'Hello, my name is Jane Doe, and I\'m studying to become a nurse! I\'m happy help you!',
    phone: '1-415-555-1234',
    address: '2222 Market Street',
    location: 'Calcutta, IN'
  },
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
    episodes: [{
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
          advice: ""
        }
      }
    ],
    services: []
  },
  ...udayDBStore,
});

export const mutations = {
  updatePath(state, payload) {
    state.currPath = payload
  },
  updateStatus(state, payload) {
    state.currPatient.status = payload
  },
  updateCurrPatient(state, payload) {
    let CLUSTER_ID = state.currCluster
    let PATIENT_ID = payload.id || state.currPatient.id

    let patientProf = state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID) || state.currPatient

    console.log(patientProf)

    state.currPatient = patientProf
  },
  increment(state, payload) {
    if (payload) {
      state.counter += payload
    } else {
      state.counter++
    }
  },
  recordNewEpisode(state, payload) {    
    let CLUSTER_ID = state.currCluster
    let PATIENT_ID = state.currPatient.id

    let episodeLen = state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID).episodes.length

    let d = new Date();

    console.log('recorded new episode', episodeLen)
    console.log(PATIENT_ID)

    state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID).episodes.push(
      {
        type: 'episode',
        billed: '',
        link: '/ha/profile/profile-visit?id=AAA1&visit=ep0fl01',
        episodeID: 'PA001EP1',
        title: 'Episode ' + episodeLen,
        created: d.getTime(),
        lastUpdated: '',
        numFollowUps: '',
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
  },
  recordNewService(state) {
    let CLUSTER_ID = state.currCluster
    let PATIENT_ID = state.currPatient.id

    let d = new Date();
    // get cluster
    // get patientID

    // state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID).services.push

    // find patient
    // add service to services arr

    state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID).services.push(
      {
        type: 'service',
        billed: '',
        link: '/ha/profile/profile-visit',
        episodeID: 'SV 01',
        title: 'New Service',
        created: d.getTime(),
        lastUpdated: '',
        numFollowUps: '',
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
  }, 
  registerPatient(state, payload) {
    let CLUSTER_ID = state.currCluster
    let PATIENT_COUNT = state.udayDb.clusters[CLUSTER_ID].patients.length + 1

    let d = new Date();

    // console.log('xxxxxx')
    // console.log(PATIENT_COUNT)

    let baseProfile = {
      id: "pa0" + PATIENT_COUNT,
      status: "registered",
      regBy: "Jane Doe",
      demographics: {
        ...payload
      },
      episodes: [
        {
          episodeID: "PA01EP0",
          title: "Registered",
          created: d.getTime(),
          lastUpdated: "",
          numFollowUps: "",
        }
      ],
      services: []
    };


    console.log('xxxxxx')
    state.udayDb.clusters[CLUSTER_ID].patients.push(
      baseProfile
    )
  },
}

export const actions = {
  recordEpisodeUpdateCurrPat (context, payload) {
    context.commit('recordNewEpisode', payload)
    context.commit('updateCurrPatient')
  }
}
