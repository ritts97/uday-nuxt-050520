export default {
  cat: 'dog',
  udayDb: {
    superadmins: [
      {
        id: "su001",
        name: "Super Admin"
      }
    ],
    clusters: {
      cluster001: {
        admins: [],
        patientsInQueue: [],
        mds: [{
            id: "md001",
            status: "offline",
            allocatedPatients: ['pa001', 'pa002', 'pa003'],
            demographics: {
              name: "Dr. Akshit Gupta"
            }
          },
          {
            id: "md002",
            status: "offline",
            demographics: {
              name: "Dr. Kumar Shhin"
            }
          },
          {
            id: "md003",
            status: "offline",
            demographics: {
              name: "Jamaica Samsung"
            }
          }
        ],
        has: [{
          name: 'Teresa Mendoza (RN)',
          id: 'ha0001',
          role: 'ha',
          status: 'online',
          cluster: 'cluster0001',
          bio: 'Hello, my name is Teresa Mendoza, and I\'m studying to become a nurse! I\'m happy help you!',
          phone: '1-415-555-1234',
          address: '2222 Market Street',
          location: 'Calcutta, IN',
          email: ''
        }],
        patients: [
          {
            id: "pa01",
            status: "registered",
            regBy: "Charlotte Hale",
            demographics: {
              name: "Delores Abernathy",
              occupation: 'Industrial Worker',
              gender: "m",
              age: "29",
              address: "4444 Market St.",
              address2: "Address 2",
              police: "Police Station",
              phone: "1-415-555-5555",
              location: "Hyderabad, IN"
            },
            episodes: [
              {
                episodeID: "EP0 FU0",
                title: "Registered",
                created: "1 week ago",
                lastUpdated: "1 week ago",
                numFollowUps: "3",
                allocated: false,
                complaint: {
                  chiefComplaint: "",
                  vitals: "",
                  genExams: "",
                  specExams: "",
                  addPhotos: ""
                },
              },
              {
                episodeID: "EP1 FU0",
                title: "Episode 1",
                created: "2 days ago",
                lastUpdated: "Just now",
                numFollowUps: "0",
                allocated: false,
                complaint: {
                  chiefComplaint: "Episode 1",
                  vitals: "Episode 1",
                  genExams: "Episode 1",
                  specExams: "Episode 1",
                  addPhotos: "Episode 1"
                },
                feedback: {
                  medicine: "",
                  advice: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem est placeat perspiciatis vero! Corrupti voluptatum beatae ducimus quod voluptas qui?',
                  investigations: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem est placeat perspiciatis vero! Corrupti voluptatum beatae ducimus quod voluptas qui?',
                  advice: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem est placeat perspiciatis vero! Corrupti voluptatum beatae ducimus quod voluptas qui?',
                  diagnosis: '',
                },
                followUps: [
                  {
                    name: 'Follow Up 1',
                    type: 'followup',
                    complaint: {
                      chiefComplaint: "Follow Up 1",
                      vitals: "Follow Up 1",
                      genExams: "Follow Up 1",
                      specExams: "Follow Up 1",
                      addPhotos: "Follow Up 1"
                    },
                    feedback: {
                      hasFeedback: false,
                      medicine: "",
                      advice: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem est placeat perspiciatis vero! Corrupti voluptatum beatae ducimus quod voluptas qui?',
                      investigations: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem est placeat perspiciatis vero! Corrupti voluptatum beatae ducimus quod voluptas qui?',
                      advice: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem est placeat perspiciatis vero! Corrupti voluptatum beatae ducimus quod voluptas qui?',
                      diagnosis: '',
                    }
                  },
                  {
                    name: 'Follow Up 2',
                    type: 'followup',
                    complaint: {
                      chiefComplaint: "Follow Up 2",
                      vitals: "Follow Up 2",
                      genExams: "Follow Up 2",
                      specExams: "Follow Up 2",
                      addPhotos: "Follow Up 2"
                    },
                    feedback: {
                      hasFeedback: false,
                      medicine: "",
                      advice: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem est placeat perspiciatis vero! Corrupti voluptatum beatae ducimus quod voluptas qui?',
                      investigations: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem est placeat perspiciatis vero! Corrupti voluptatum beatae ducimus quod voluptas qui?',
                      advice: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem est placeat perspiciatis vero! Corrupti voluptatum beatae ducimus quod voluptas qui?',
                      diagnosis: '',
                    }
                  },
                  {
                    name: 'Perform ECG',
                    type: 'service',
                    complaint: {
                      chiefComplaint: "Perform ECG",
                      vitals: "Perform ECG",
                      genExams: "Perform ECG",
                      specExams: "Perform ECG",
                      addPhotos: "Perform ECG"
                    },
                    feedback: {
                      hasFeedback: false,
                      medicine: "",
                      advice: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem est placeat perspiciatis vero! Corrupti voluptatum beatae ducimus quod voluptas qui?',
                      investigations: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem est placeat perspiciatis vero! Corrupti voluptatum beatae ducimus quod voluptas qui?',
                      advice: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem est placeat perspiciatis vero! Corrupti voluptatum beatae ducimus quod voluptas qui?',
                      diagnosis: '',
                    }
                  }
                ]
              }
            ],
            services: []
          },
          {
            id: "pa02",
            status: "released",
            regBy: "Charlotte Hale",
            demographics: {
              name: "Charlotte Hale",
              occupation: 'Industrial Worker',
              gender: "f",
              age: "27",
              address: "4444 Market St.",
              address2: "Address 2",
              police: "Police Station",
              phone: "1-415-555-5555",
              location: "New Southwick, Germany"
            },
            episodes: [{
                episodeID: "EP0 FU0",
                title: "Registered",
                created: "1 week ago",
                lastUpdated: "1 week ago",
                allocated: false,
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
              },
              {
                episodeID: "EP1 FU0",
                title: "Episode 1",
                created: "2 days ago",
                lastUpdated: "2 days ago",
                numFollowUps: "0",
                allocated: false,
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
                  diagnosis: '',
                }
              }
            ],
            services: []
          }
        ]
      },
      cluster002: {
        admins: [],
        patientsInQueue: [],
        mds: [],
        has: [],
        patients: []
      }
    }
  }
}