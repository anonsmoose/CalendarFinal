<template>
  <div class="vuecal">
    <vue-cal
      class="vuecal--blue-theme"
      :time-from="8 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year']"
      default-view="week"
      events-on-month-view="short"
      :events="events"
      hide-weekends
      style="height: 600px"
      hide-view-selector
      hideTitleBar
    ></vue-cal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { bus } from "../main";

export default Vue.extend({
  name: "calendar",
  components: { VueCal },
  props: {
    message: String
  },
  data: () => ({
    events: [
      {
        start: "2020-02-24 13:00",
        end: "2020-02-24 14:00",
        title: "PHL258H5 LEC0101"
      },
      {
        start: "2020-02-26 13:00",
        end: "2020-02-26 15:00",
        title: "PHL258H5 LEC0101"
      },
      {
        start: "2020-02-25 13:00",
        end: "2020-02-25 15:00",
        title: "CSC301H5 LEC0101"
      },
      {
        start: "2020-02-27 9:00",
        end: "2020-02-27 10:00",
        title: "CSC301H5 TUT0101"
      },
      {
        start: "2020-02-25 15:00",
        end: "2020-02-25 17:00",
        title: "CSC309H5 LEC0101"
      },
      {
        start: "2020-02-19 12:00",
        end: "2020-02-19 14:00",
        title: "LUNCH",
        class: "lunch",
        background: true
      },
      {
        start: "2020-02-20 12:00",
        end: "2020-02-20 14:00",
        title: "LUNCH",
        class: "lunch",
        background: true
      }
    ]
  }),
  created()
  {
    bus.$on('messageSent', () => {
      console.log("please god tell me this works" + 5);
      const day = Math.round(Math.random() * (13 - 9) + 9);
      const time = Math.round(Math.random() * (22 - 8) + 8);
      const title = [
                    'CSC301',
                    'CSC338',
                    'CSC343',
                    'STA107',
                    'STA256',
                    'STA260',
                    'STA302',
                    'STA313',
                    'CSC411',
                    'MAT301',
                    'MAT388',
                    'MAT382'
      ]
      const course = Math.round(Math.random() * (11 - 0) + 0);

      this.events.push(
        {
          start: "2020-03-" + day + " " +  time + ":00",
          end: "2020-03-" + day + " " +  (time + 2) + ":00",
          title: title[course],
          class: "lunch",
          background: true
        }
      )
    })
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.vuecal__event {
  background-color: #a8d6f7;
  border-radius: 2px;
  color: #2c3e50;
  font-size: 12px;
  box-sizing: border-box;
  padding: 10px;
  margin-right: 20px;
}
.vuecal__now-line {display: none}
</style>
