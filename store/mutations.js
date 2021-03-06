let getCurrDate = function () {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  let dateObj = new Date();
  let month = monthNames[dateObj.getMonth()];
  let day = String(dateObj.getDate()).padStart(2, '0');
  let year = dateObj.getFullYear();

  return month + ' ' + day + ', ' + year;
}

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

    // console.log(patientProf)

    state.currPatient = patientProf
  },
  updateDemographics(state, payload) {
    let PATIENT_ID = payload[0]
    let CLUSTER_ID = state.currCluster;
    let PATIENT_DEMOGRAPHICS = payload[1]

    let patientProf =
      state.udayDb.clusters[CLUSTER_ID].patients.find(
        patient => patient.id === PATIENT_ID
      ) || state.currPatient; 
      
    patientProf.demographics = {...PATIENT_DEMOGRAPHICS };
    console.log(patientProf)
  },
  updateCurrEpisode(state, payload) {
    state.currEpisode = payload
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
  recordNewFollowUp(state, payload) {
    console.log('start new followup entry');

    let CLUSTER_ID = state.currCluster;
    let PATIENT_ID = state.currPatient.id;
    let EPISODE_ID = payload[0]

    let FOLLOWUP_PAYLOAD = payload[1]

    // console.log(episodeID);
    // console.log(episodePayload);

    // update FollowUp meta data
    let newID = Math.random() .toString(36) .substr(2, 6);
    FOLLOWUP_PAYLOAD.meta.visitID = newID;
    FOLLOWUP_PAYLOAD.meta.createDate = getCurrDate();

    state.udayDb.clusters[CLUSTER_ID].patients
      .find(patient => patient.id === PATIENT_ID)
      .episodes.find(episode => episode.episodeID === EPISODE_ID)
      .followUps.push(FOLLOWUP_PAYLOAD);
      
    console.log("end new followup entry");
  },
  recordNewEpisode(state, payload) {
    let CLUSTER_ID = state.currCluster
    let PATIENT_ID = state.currPatient.id

    let episodeLen = state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID).episodes.length

    let currentDate = getCurrDate()

    // generate random UID
    let newID = Math.random().toString(36).substr(2, 6)
    
    console.log('Payload: ', payload)

    state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID).episodes.push({
      type: 'episode',
      billed: '',
      link: '/ha/profile/profile-visit?id=AAA1&visit=ep0fl01',
      episodeID: newID,
      title: 'Episode ' + episodeLen,
      created: currentDate,
      lastUpdated: currentDate,
      numFollowUps: '',
      allocated: true,
      followUps: [],
      services: [],
      episodeDetails: payload,
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
          id: 'hashID',
          medicine: 'Lorazopram',
          unit: '1',
          morning: '2',
          afternoon: '3',
          evening: '4',
          dinner: '5',
          other: '6',
          duration: '7',
          time: '8'
        }],
        investigations: '',
        advice: '',
        diagnosis: '',
      }
    })
  },
  clearVisitID(state, payload) {
    state.currEpisode = {}
  },
  recordNewService(state, payload) {
    let SERVICE_PAYLOAD = payload[0]
    let EPISODE_ID = payload[1]
    let CLUSTER_ID = state.currCluster
    let PATIENT_ID = state.currPatient.id

    let serviceCount = state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID).services.length
    let currentDate = getCurrDate()

    serviceCount++

    if (!EPISODE_ID) { 
      console.log("No episode ID")
      state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID).services.push({
        type: 'service',
        billed: '',
        link: '/ha/profile/profile-visit',
        episodeID: PATIENT_ID + 'SV' + serviceCount,
        title: 'Service ' + serviceCount,
        created: currentDate,
        lastUpdated: currentDate,
        episodeDetails: payload[0],
        numFollowUps: '',
      })
    } else {
      console.log()
      state.udayDb.clusters[CLUSTER_ID].patients
        .find(patient => patient.id === PATIENT_ID)
        .episodes.find(episode => episode.episodeID === EPISODE_ID)
        .services.push(SERVICE_PAYLOAD);
    }
  },
  registerPatient(state, payload) {
    let CLUSTER_ID = state.currCluster
    let PATIENT_COUNT = state.udayDb.clusters[CLUSTER_ID].patients.length + 1

    let currentDate = getCurrDate()

    // generate random UID
    let newID = Math.random().toString(36).substr(2, 6)

    let baseProfile = {
      id: newID,
      status: "registered",
      dateRegistered: currentDate,
      regBy: payload.regBy,
      lastVisited: currentDate,
      demographics: {
        ...payload.demographics
      },
      episodes: [{
        episodeID: "PA01EP0",
        title: "Registered",
        created: currentDate,
        lastUpdated: currentDate,
        numFollowUps: "",
      }],
      services: []
    };

    state.udayDb.clusters[CLUSTER_ID].patients.push(
      baseProfile
    )

    this.$router.push({path: '/ha/'})
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
  addMedicineToEpisode(state, payload) {
    const CLUSTER_ID = payload.clusterID
    const PATIENT_ID = payload.patientID
    const EPISODE_ID = payload.episodeID

    // console.log(CLUSTER_ID)
    // console.log(PATIENT_ID)
    // console.log(EPISODE_ID)
    // console.log(payload.newMedicine)
    // console.log(state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID).episodes.find(episode => episode.episodeID === EPISODE_ID).feedback)

    state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID).episodes.find(episode => episode.episodeID === EPISODE_ID).feedback.medicine.push(payload.newMedicine)
    state.udayDb.clusters[CLUSTER_ID].patients.find(patient => patient.id === PATIENT_ID).episodes.find(episode => episode.episodeID === EPISODE_ID).feedback.hasFeedback = true
  },
  releasePatient(state, payload) {
    const clusterID = payload.clusterID
    const patientID = payload.patientID

    const filteredPatients = state.udayDb.clusters[clusterID].patientsInQueue.filter(allocatedID => allocatedID !== patientID)

    state.udayDb.clusters[clusterID].patientsInQueue = filteredPatients
    state.udayDb.clusters[clusterID].patients.find(patient => patient.id === patientID).status = 'released'
  }
}