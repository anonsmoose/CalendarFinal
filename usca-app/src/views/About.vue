<template>
  <div class="about">
    <navbar />
    <h1>This is an about page</h1>
    <b-button @click="getCourse">Grab a course</b-button>
  </div>
</template>


<!-- <template> -->
<!--   <div class ="block"> -->
<!--     <div class="notification"> -->
<!--       lorem ip -->
<!--     </div> -->
<!--   </div> -->
<!-- </template> -->

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";


export default {
  name: "Home",
  components: {
    Navbar,
  },
  data: () => ({
    course:"test"
  }),

  methods: {
    getCourse()
    {
      // this.$buefy.notification.open("Asking for a course");
      // fetch("http://localhost:3000/getAllCourses")
      // .then(res => res.text())
      // .then(res => this.course = res)
      // .catch(err => err);
      // console.log(this.course);
      console.log(this.$buefy);
      
    }
  }
};
</script>
