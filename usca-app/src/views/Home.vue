<template>
  <div class="home">
    <Navbar />
    <div class="columns">
      <div class="column">
        <Calendar />
      </div>
      <div class="column is-one-quarter">
        <Searchbar />
      </div>
    </div>
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
import Calendar from "@/components/Calendar.vue";
import Searchbar from "@/components/SearchBar.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Calendar,
    Searchbar,
    Navbar
  },
};
</script>
