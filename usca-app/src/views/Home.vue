<!-- <template> -->
<!-- <div class="home"> -->
<!--   <Navbar /> -->
<!--   <div class="tile is-ancestor"> -->
<!--     <div class="tile is-8 is-parent"> -->
<!--       <div class="tile is-child"> -->
<!--         <FallCalendar /> -->
<!--       </div> -->
<!--       <div class="tile is-child"> -->
<!--         <WinterCalendar /> -->
<!--       </div> -->
<!--     </div> -->
<!--     <div class="tile is-4 is-vertical is-parent"> -->
<!--       <div class="tile is-child is-12"> -->
<!--         <Searchbar /> -->
<!--       </div> -->
<!--       <div v-show="courseInfoLoaded" class="tile is-child box is-12"> -->
<!--         <CourseInfo /> -->
<!--       </div> -->
<!--       <div v-show="courseInfoLoaded" class="tile  is-child box is-12"> -->
<!--         <Panel /> -->
<!--       </div> -->
<!--     </div> -->
<!--   </div> -->
<!-- </div> -->
<!-- </template> -->

<template>
  <div class="home">
    <Navbar />
    <div class="columns">
    <div class="column">
      <FallCalendar />
    </div>
    <div class="column">
      <WinterCalendar />
    </div>
    <div class="column is-one-third">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-parent">
          <div class="tile is-child box">
            <Searchbar />
          </div>
          <div v-show="courseInfoLoaded" class="tile is-child box">
            <CourseInfo />
          </div>
          <div v-show="courseInfoLoaded" class="tile is-child box">
            <Panel />
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import WinterCalendar from "@/components/WinterCalendar.vue";
import FallCalendar from "@/components/FallCalendar.vue";
import Searchbar from "@/components/SearchBar.vue";
import Panel from "@/components/CourseSelectionPanel.vue";
import Navbar from "@/components/Navbar.vue";
import CourseInfo from "@/components/CourseInfoBox.vue";
import { bus } from "../main";

export default {
  name: "Home",
  components: {
    FallCalendar,
    WinterCalendar,
    Searchbar,
    Panel,
    CourseInfo,
    Navbar
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
