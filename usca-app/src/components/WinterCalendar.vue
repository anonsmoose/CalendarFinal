<template>
  <div class="vuecal">
    <vue-cal
      class="vuecal--full-height-delete"
      selected-date="2020-1-15"
      :time-from="8 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year']"
      default-view="week"
      events-on-month-view="short"
      :events="events"
      editable-events
      hide-weekends
      style="height: 736px"
    ></vue-cal>
  </div>
</template>

<!-- <template> -->
<!--   <div class="vuecal"> -->
<!--     <vue-cal -->
<!--       class="vuecal--blue-theme" -->
<!--       :time-from="8 * 60" -->
<!--       :time-to="23 * 60" -->
<!--       :disable-views="['years', 'year']" -->
<!--       default-view="week" -->
<!--       events-on-month-view="short" -->
<!--       :events="events" -->
<!--       hide-weekends -->
<!--       style="height: 600px" -->
<!--       hide-view-selector -->
<!--       hideTitleBar -->
<!--     ></vue-cal> -->
<!--   </div> -->
<!-- </template> -->

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
 
    ],
    selectedEvent: {}
  }),
  methods:
  {

  },
  created()
  {
    bus.$on('winter event added', (course: any) => {

      // console.log("inside the calendar");
      // console.log(course);
      // console.log(course.start);
      // // console.log(course.start.lastIndexOf("-"));
      // console.log(course.start.slice(0, 10));
      
      if (course.title.charAt(8) == "F" || course.title.charAt(8) == "Y")
      {
       
        if (course.start.startsWith("2020-01-07"))
        {
             course.start = "2019-09-10"  + course.start.slice(10);
             course.end = "2019-09-10" + course.end.slice(10);
        }
          else if (course.start.startsWith("2020-01-06"))
        {
             course.start = "2019-09-09"  + course.start.slice(10);
             course.end = "2019-09-09" + course.end.slice(10);
        }
          else if (course.start.startsWith("2020-01-08"))
        {
             course.start = "2019-09-11"  + course.start.slice(10);
             course.end = "2019-09-11" + course.end.slice(10);
        }
          else if (course.start.startsWith("2020-01-09"))
        {
             course.start = "2019-09-12"  + course.start.slice(10);
             course.end = "2019-09-12" + course.end.slice(10);
        }
           else if (course.start.startsWith("2020-01-10"))
        {
             course.start = "2019-09-13"  + course.start.slice(10);
             course.end = "2019-09-13" + course.end.slice(10);
        }
 
        // console.log(course);
      }
      // const startdate = new date(course.start.slice(0, 10));
      // console.log(startDate);
      // const endDate = new Date(course.end.slice(0, 10));

      const startDate = new Date(course.start.slice(0, 10).replace("-", "/").replace("-", "/"));
      
      const endDate = new Date(course.end.slice(0, 10).replace("-", "/").replace("-", "/"));
      // console.log(course.start.slice(0, 10).replace("-", "/").replace("-", "/"));
      

      // const date = new Date(startDate);
      // startDate.setDate(startDate.getDate() + 7);
      // console.log(startDate.toISOString().slice(0, 10) + " " + course.start.slice(11));
      
      // dateList.push(date)
      // console.log(dateList);

      // console.log(addWeeks(dt, 10).toString());

      
      let numWeeks;
      if(course.title.charAt(8) == "Y")
      {
        numWeeks = 30;
      }
      else
      {
        numWeeks = 13;
      }
      let i = 0;
      while (i < numWeeks)
      {
        const dict = {};

        dict["title"] = course.title;
        dict["background"] = true;
        dict["class"] = "lunch";
        dict["start"] = startDate.toISOString().slice(0, 10) + " " + course.start.slice(11);
        dict["end"] = endDate.toISOString().slice(0, 10) + " " + course.end.slice(11);
        startDate.setDate(startDate.getDate() + 7);
        endDate.setDate(endDate.getDate() + 7);
        i+=1;
        this.events.push(dict);

      }
      

    
      

      // dateList.push(5);
      // console.log(dateList);
      // dateList.push(1);
      // console.log(dateList);
      // dateList.push(9);
      // console.log(dateList);
      

      // let i = 1;
      // var startDateList = [];
      // const endDateList = [];
      // while (i < 14)
      // {
      //   // console.log(startDate);
      //   // console.log(endDate);
      //   startDate.setDate(startDate.getDate() + 7);
      //   console.log(startDate);
      //   startDateList.push(startDate);
        
      //   // endDate.setDate(endDate.getDate() + 7);
      //   // startDateList.push(startDate);
      //   // endDateList.push(endDate);
      //   i+=1;
      // } 
      // console.log(startDateList);
      // console.log(startDateList[1].toISOString());
      // console.log(endDateList);


      // const test = course.start.slice(8, 10)
      // console.log(test);
      // console.log(parseInt(test) + 5);
      // console.log(('0' + '5').slice(-2));

      // this.events.push(course);
    });
    bus.$on('remove events', (garbage: any) => {
      this.events = [];
    })
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.vuecal__event {
  background-color: #ffdd57;
  border-radius: 2px;
  color: #2c3e50;
  font-size: 10px;
  box-sizing: border-box;
  padding: 10px;
  margin-right: 20px;
}
.vuecal__event-time {
  display: inline-block;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.vuecal__menu, .vuecal__cell-events-count {background-color: #42b983;}
.vuecal__title-bar {background-color: #e4f5ef;}
.vuecal__cell--today, .vuecal__cell--current {background-color: rgba(240, 240, 255, 0.4);}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {background-color: rgba(235, 255, 245, 0.4);}
.vuecal__cell--selected:before {border-color: rgba(66, 185, 131, 0.5);}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {background-color: rgba(195, 255, 225, 0.5);}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {background-color: rgba(136, 236, 191, 0.25);}.vuecal__menu, .vuecal__cell-events-count {background-color: #42b983;}
.vuecal__title-bar {background-color: #e4f5ef;}
.vuecal__cell--today, .vuecal__cell--current {background-color: rgba(240, 240, 255, 0.4);}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {background-color: rgba(235, 255, 245, 0.4);}
.vuecal__cell--selected:before {border-color: rgba(66, 185, 131, 0.5);}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {background-color: rgba(195, 255, 225, 0.5);}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {background-color: rgba(136, 236, 191, 0.25);}

.vuecal__now-line {display: none}
</style>
