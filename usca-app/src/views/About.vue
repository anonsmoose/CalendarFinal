<template>
  <div class="about">
    <navbar />
    <h1>This is a timetable planner for the University of Toronto</h1>
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
      
    }
  }
};
</script>
