<template>
  <div class="tile is-ancestor">
    <div class="tile is-9 is-parent">
      <div class="tile is-child">
        <Calendar />
      </div>
    </div>
    <div class="tile is-3 is-vertical is-parent">
      <div class="tile is-child is-12">
        <Searchbar />
      </div>
      <div v-show="courseInfoLoaded" class="tile is-child box is-12">
        <CourseInfo />
      </div>
      <div class="tile  is-child box is-12">
        <Panel />
      </div>
    </div>
  </div>
</template>

<!-- <template> -->
<!--   <div class="home"> -->
<!--     <Navbar /> -->
<!--     <div class="columns is-multiline is-variable is-1-mobile is-3-desktop is-2-widescreen is-2-fullhd"> -->
<!--       <div class="column is-three-quarters"> -->
<!--         <Calendar /> -->
<!--       </div> -->
<!--       <div class="column is-one-quarter"> -->
<!--         <Searchbar /> -->
<!--       </div> -->
<!--       <div class="column is-three-quarters"> -->
<!--       </div> -->
<!--       <div class="column is-one-quarter"> -->
<!--        <Panel /> -->   
<!--       </div> -->
<!--     </div> -->
<!--   </div> -->
<!-- </template> -->
<script>
// @ is an alias to /src
import Calendar from "@/components/Calendar.vue";
import Searchbar from "@/components/SearchBar.vue";
import Panel from "@/components/CourseSelectionPanel.vue";
import CourseInfo from "@/components/CourseInfoBox.vue";
import { bus } from "../main";

export default {
  name: "Home",
  components: {
    Calendar,
    Searchbar,
    Panel,
    CourseInfo
  },
  data() {
    return {
      courseInfoLoaded: false
    };
  },
  created()
  {
    bus.$on("information loaded", data => {
      this.courseInfoLoaded = true;
    });
  }
};
</script>
