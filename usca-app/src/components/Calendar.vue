<template>
  <div class="calendar">
    <vue-cal selected-date="2018-11-19"
         :time-from="9 * 60"
         :disable-views="['years', 'year']"
         default-view="week"
         events-on-month-view="short"
         :events="events"
         style="height: 600px">
</vue-cal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueCal from "vue-cal";
import 'vue-cal/dist/vuecal.css'

export default Vue.extend({
  name: "calendar",
  components: { VueCal },
  props: {
   
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
