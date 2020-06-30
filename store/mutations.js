export default {
  updatePath(state, payload) {
    state.currPath = payload
  },
  updateStatus(state, payload) {
    state.currPatient.status = payload
  },
  updateCurrUser(state) {
    let CLUSTER_ID = state.currCluster

    state.currUser = state.udayDb.clusters[CLUSTER_ID].has[0]
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
  updateFeedback(state, payload) {
    const clusterID = payload.clusterID
    const patientID = payload.patientID
    const episodeID = payload.episodeID
    const feedback = payload.feedback

    console.log('Ooga booga')
    console.log(clusterID)
    // find episode (from clusterID => patientID => episodeID)
    state.udayDb.clusters[clusterID].patients.find(patient => patient.id === patientID).episodes.find(episode => episode.episodeID === episodeID).feedback = feedback
    // alert('Your feedback has been updated.')
  },
  recordNewEpisode(state, payload) {
    let CLUSTER_ID = state.currCluster
    let PATIENT_ID = state.currPatient.id

    let episodeLen = state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID).episodes.length

    let d = new Date();

    state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID).episodes.push({
      type: 'episode',
      billed: '',
      link: '/ha/profile/profile-visit?id=AAA1&visit=ep0fl01',
      episodeID: 'PA01EP1',
      title: 'Episode ' + episodeLen,
      created: d.getTime(),
      lastUpdated: '',
      numFollowUps: '',
      followUps: [],
      services: [],
      complaint: {
        chiefComplaint: {
          name: 'Ooga booga',
          symptons: 'Ooga booga',
          addInformation: 'Ooga booga'
        },
        vitals: 'ooga booga',
        genExams: 'ooga booga',
        specExams: 'ooga booga',
        addPhotos: 'ooga booga'
      },
      feedback: {
        hasFeedback: false,
        medicine: [{
          id: 'AAU',
          name: 'Lorazepam',
          type: 'AAU',
          batch: 135,
          expiry: '12/22',
          stock: 99,
          mrp: '$99',
          gst: '$99',
          dis: 10,
          crit: 10
        }],
        investigations: '',
        advice: '',
        diagnosis: '',
      }
    })
  },
  recordNewService(state) {
    let CLUSTER_ID = state.currCluster
    let PATIENT_ID = state.currPatient.id

    let d = new Date();
    let serviceCount = state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID).services.length

    serviceCount++

    state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID).services.push({
      type: 'service',
      billed: '',
      link: '/ha/profile/profile-visit',
      episodeID: PATIENT_ID + 'SV' + serviceCount,
      title: 'Service ' + serviceCount,
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
    })
  },
  registerPatient(state, payload) {
    let CLUSTER_ID = state.currCluster
    let PATIENT_COUNT = state.udayDb.clusters[CLUSTER_ID].patients.length + 1

    let d = new Date();

    let baseProfile = {
      id: "pa0" + PATIENT_COUNT,
      status: "registered",
      regBy: "Jane Doe",
      demographics: {
        ...payload
      },
      episodes: [{
        episodeID: "PA01EP0",
        title: "Registered",
        created: d.getTime(),
        lastUpdated: "",
        numFollowUps: "",
      }],
      services: []
    };

    state.udayDb.clusters[CLUSTER_ID].patients.push(
      baseProfile
    )
  },
  registerHA(state, payload) {
    let CLUSTER_ID = state.currCluster

    state.udayDb.clusters[CLUSTER_ID].has.push(
      payload
    )
  },
  registerMD(state, payload) {
    let CLUSTER_ID = state.currCluster

    state.udayDb.clusters[CLUSTER_ID].mds.push(
      payload
    )
  },
  registerCluster(state, payload) {
    let date = new Date()
    let CLUSTER_ID = state.currCluster

    state.udayDb.clusters[date.getTime()] = payload
  },
  addPatientToQueue(state, payload) {
    let CLUSTER_ID = state.currCluster

    state.udayDb.clusters[CLUSTER_ID].patientsInQueue.push(
      payload
    )
  },
  releasePatient(state, payload) {
    const clusterID = payload.clusterID
    const patientID = payload.patientID

    const filteredPatients = state.udayDb.clusters[clusterID].patientsInQueue.filter(allocatedID => allocatedID !== patientID)

    state.udayDb.clusters[clusterID].patientsInQueue = filteredPatients
    state.udayDb.clusters[clusterID].patients.find(patient => patient.id === patientID).status = 'released'
  }
}