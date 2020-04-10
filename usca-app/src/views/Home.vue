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
      <div class="tile is-child box is-12">
        <p class="title">One</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Proin ornare magna eros, eu pellentesque tortor vestibulum ut. 
          Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
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

export default {
  name: "Home",
  components: {
    Calendar,
    Searchbar,
    Panel
  }
};
</script>
