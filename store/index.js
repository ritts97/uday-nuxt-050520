export const state = () => ({
  counter: 10,
  currPath: [
    {
      title: 'Dashboard',
      url: '/ha'
    }
  ],
  clusterData: {
    clusterName: 'Cluster AAA01',
    regDoctors: 10,
    regHas: 10,
    regPatients: 999,
    medicineInStock: 999,
    patientAnalytics: {
      avgAge: 99,
      gender: 99,
      occupations: 99,
      avgBMI: 99,
      avgBpRange: 99,
      mostCommonCC: 99,
    }
  },
  clusterMedicine: [],
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
    visits: [{
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
  users: [
    {
      name: 'has',
      userList: [

      ],
    },
    {
      name: 'mds',
      userList: [

      ],
    },
    {
      name: 'admins',
      userList: [

      ],
    },
    {
      name: 'superAdmins',
      userList: [

      ],
    },
  ],
  patientList: [],
  patientListDB: [
    {
      clusterName: 'Cluster AA1',
      clusterID: 'AA1',
      medicine: [],
      patients: [
        {
          name: 'Patient 001',
          demographics: '',
          visits: ''
        }, 
        {
          name: 'Patient 002',
          visits: ''
        },
        {
          name: 'Patient 003',
          visits: ''
        }, {
          name: 'Patient 004',
          visits: ''
        },
        {
          name: 'Patient 005',
          visits: ''
        }, {
          name: 'Patient 006',
          visits: ''
        },
      ]
    }, {
      clusterName: 'Cluster AA2',
      clusterID: 'AA2',
      patients: [
        {
          name: 'Patient 001',
          demographics: '',
          visits: ''
        }, 
        {
          name: 'Patient 002',
          visits: ''
        },
        {
          name: 'Patient 003',
          visits: ''
        }, {
          name: 'Patient 004',
          visits: ''
        },
        {
          name: 'Patient 005',
          visits: ''
        }, {
          name: 'Patient 006',
          visits: ''
        },
      ]
    },
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
    let episodeLen = state.currPatient.visits.length

    state.currPatient.visits.unshift(
      {
        type: 'episode',
        billed: '',
        link: '/ha/profile/profile-visit?id=AAA1&visit=ep0fl01',
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
  },
  recordNewService(state) {
    console.log(state.currPatient.services)

    state.currPatient.visits.unshift(
      {
        type: 'service',
        billed: '',
        link: '/ha/profile/profile-visit',
        episodeID: 'SV 01',
        title: 'New Service',
        created: '1 week ago',
        lastUpdated: '1 week ago',
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
    let patientCount = state.patientList.length;

    console.log('.......')

    let baseProfile = {
      id: 'AAA' + patientCount++,
      cluster: 'Cluster 001',
      status: 'registered',
      demographics: {},
      visits: [{
        episodeID: 'EP0 FU0',
        type: 'register',
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
      bills: [],
      ...payload
    }

    console.log(baseProfile)

    console.log('.......')

    state.patientList.unshift(
      baseProfile
    )
  },
}

export const actions = {
  increment (context, payload) {
    context.commit('increment', payload)
  }
}
