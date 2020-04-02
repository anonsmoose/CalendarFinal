<template>
  <div class="home">
    <Navbar />
    <div class="columns is-multiline is-mobile">
      <div class="column is-three-quarters">
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

export default {
  name: "Home",
  components: {
    Calendar,
    Searchbar,
  },
};
</script>
