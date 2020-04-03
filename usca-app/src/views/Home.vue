<template>
  <div class="home">
    <Navbar />
    <div class="columns is-multiline is-variable is-1-mobile is-3-desktop is-2-widescreen is-2-fullhd">
      <div class="column is-three-quarters">
        <Calendar />
      </div>
      <div class="column is-one-quarter">
        <Searchbar />
      </div>
      <div class="column is-three-quarters">
      </div>
      <div class="column is-one-quarter">
       <Panel />   
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from "@/components/Calendar.vue";
import Searchbar from "@/components/SearchBar.vue";
import Navbar from "@/components/Navbar.vue";
import Panel from "@/components/CourseSelectionPanel.vue";

export default {
  name: "Home",
  components: {
    Calendar,
    Searchbar,
    Navbar,
    Panel
  },
};
</script>
