<template>
  <div>
    <div class="container mb-3">
      <div class="row">
        <div class="col-md-12">
            <button @click="showAlert()">Add to Patient Queue</button>    
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  methods: {
    showAlert: function () {
      alert("This episode has been recorded.")
    },
  },
  data() {
    return {
    }
  },
}
</script>
