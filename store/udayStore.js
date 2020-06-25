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
        mds: [{
            id: "md001",
            status: "offline",
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
          id: "ha001",
          demographics: {
            name: "Jane Doe",
            bio: "Hello, my name is Jane Doe, and I'm studying to become a nurse! I'm happy help you!"
          },
          patients: []
        }],
        patients: [
          {
            id: "pa001",
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
            episodes: [{
                episodeID: "EP0 FU0",
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
              },
              {
                episodeID: "EP1 FU0",
                title: "Episode 1",
                created: "2 days ago",
                lastUpdated: "Just now",
                numFollowUps: "0",
                complaint: {
                  chiefComplaint: "",
                  vitals: "",
                  genExams: "",
                  specExams: "",
                  addPhotos: ""
                },
                feedback: {
                  medicine: "",
                  advice: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem est placeat perspiciatis vero! Corrupti voluptatum beatae ducimus quod voluptas qui?',
                  investigations: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem est placeat perspiciatis vero! Corrupti voluptatum beatae ducimus quod voluptas qui?',
                  advice: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem est placeat perspiciatis vero! Corrupti voluptatum beatae ducimus quod voluptas qui?'
                },
                followUps: []
              }
            ],
            services: []
          },
          {
            id: "pa002",
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
            episodes: [{
                episodeID: "EP0 FU0",
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
              },
              {
                episodeID: "EP1 FU0",
                title: "Episode 1",
                created: "2 days ago",
                lastUpdated: "2 days ago",
                numFollowUps: "0",
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
          }
        ]
      },
      cluster002: {
        admins: [],
        mds: [],
        has: [],
        patients: []
      }
    }
  }
}