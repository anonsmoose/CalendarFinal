
<template>
  <div class="gpa">
      <Navbar />
      <a href="https://gpacalc.utoronto.ca/calculator/#/">Visit the University of Toronto's official GPA calculator</a>
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
};
</script>
