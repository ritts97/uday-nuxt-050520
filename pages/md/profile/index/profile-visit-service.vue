<template>
  <div>
    <div class="container mt-2">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline">
            <li v-for="(tab, index) in tabs" :key="index" class="list-inline-item">
              <button  @click="getTab(tab.name)" class="btn px-3 small" :class="tab.isActive ? 'btn-dark' : 'btn-light'" role="button">
                {{ tab.title }}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item text-center pointer" v-for="(tab, index) in subTabs" :key="index">
              <div class="px-2 mr-2 pb-1 mb-1" @click="getSubTab(tab.name)" role="button" :class="{ underline: tab.isActive }">
                {{ tab.title }}
              </div>
            </li>
          </ul>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[0].isActive">
            <div class="row mt-1">
              <div class="col-md-12 text-muted small mb-3">
                  Please complete to the best of your ability.
                </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 1">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 2">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 3">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 4">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 5">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 6">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 7">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 8">
              </div>
            </div>
          </div>
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="subTabs[1].isActive">
            <div class="row mt-1">
              <div class="col-md-12 text-muted small mb-3">
                  Please complete to the best of your ability.
                </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 1">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 2">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 3">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 4">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 5">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 6">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 7">
              </div>
              <div class="col-md-6">
                <input type="text" class="w-100 p-2 mb-3" placeholder="Complaint 8">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  methods: {
    getSubTab: function (tabName) {
      let tabs = this.subTabs
      let ref = 0

      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].name === tabName) {
          tabs[i].isActive = true
          ref = i
        } else {
          tabs[i].isActive = false
        }

        if (ref == (tabs.length - 1)) {
          this.showComplete = true
        } else {
          this.showComplete = false
        }
      }
    }
  },
  data() {
    return {
      list: [],
      showDocsFeedback: false,
      showDemographics: true,
      showComplete: false,
      tabs: [
        {
          name: 'service1',
          title: 'Service 1',
          isActive: true
        },
      ],
      subTabs: [
        {
          name: 'allocated',
          title: 'Service Results',
          isActive: true,
        },
        {
          name: 'billing',
          title: 'Billing Details',
          isActive: false,
        }
      ]
    }
  },
}
</script>

<style>
.list-inline-item {
  margin-right: 16px !important;
}

thead tr th {
  border-top: none !important;
}

.btn-dark {
  background-color: #444f5a;
  border: none;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

.btn-dark:hover {
  background-color: #5d666e;
  border: none;
}

.btn-light {
  background-color: #e4e4e4;
  border: none;
}

.shape-status {
  width: 12px;
  margin-right: 7px;
  margin-bottom: 4px;
}

.pointer:hover {
  cursor: pointer;
}
</style>
