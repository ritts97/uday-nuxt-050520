<template>
  <div>
    <div class="container mb-3">
      <div class="row px-3">
        <div class="col-md-12 bg-white rounded py-5 px-5">
          Edit Profile <br><br>
          Ha ID <br>
          Current Cluster <br>
          Cluster ID <br>
          Name <br>
          Gender <br>
          City <br>
          DOB <br>
          State, State ID <br>
          Country <br>
          Language <br>
          Emergency Contact (name, relation, number) <br>
          Courses Completed <br>
          Govt. ID <br>
          Is Verified <br>
          Direct Supervisor <br>
          Created By <br>
          Date Registered <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  mounted() {
    let path = [
      {
        title: 'Edit Profile',
        url: '/ha'
      },
    ]

    this.$store.commit('updatePath', path)
  },
  data() {
    return {}
  },
}
</script>

<style>
</style>
