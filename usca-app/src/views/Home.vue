<template>
  <div class="home">
    <div class="columns">
      <div class="column">
        <Calendar ref="test" />
      </div>
      <div class="column is-one-quarter">
        <Searchbar />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from "@/components/Calendar.vue";
import Searchbar from "@/components/SearchBar.vue";

export default {
  name: "Home",
  components: {
    Calendar,
    Searchbar
  },
};
</script>
