<template>
  <article class="panel is-warning">
    <p class="panel-heading">Course Time Selector</p>
    <p class="panel-tabs">
      <b-tabs size="is-small">
        <b-tab-item label="Lectures">
          <section>
            <button class="button field is-danger" @click="removeFromCalendar($event)">
              <b-icon icon="close"></b-icon>
              <span>Clear selected</span>
            </button>

            <b-table
              :data="lectures"
              :columns="columnsLectures"
              :selected.sync="selected"
              :paginated="true"
              :per-page="perPage"
              focusable
              @select="addToCalendar($event)"
            ></b-table>
          </section>
        </b-tab-item>
        <b-tab-item label="Tutorials">
          <section>
            <button class="button field is-danger" @click="removeFromCalendar($event)">
              <b-icon icon="close"></b-icon>
              <span>Clear selected</span>
            </button>

            
                <b-table
                  :data="tutorials"
                  :columns="columnsOther"
                  :selected.sync="selected"
               :paginated="true"
              :per-page="perPage"
                  focusable
                  @select="addToCalendar($event)"
                ></b-table>
              
          </section>
        </b-tab-item>
        <b-tab-item label="Practicals">
          <section>
            <button class="button field is-danger" @click="removeFromCalendar($event)">
              <b-icon icon="close"></b-icon>
              <span>Clear selected</span>
            </button>

            
                <b-table
                  :data="practicals"
                  :columns="columnsOther"
                  :selected.sync="selected"
                                :paginated="true"
              :per-page="perPage"
                  focusable
                  @select="addToCalendar($event)"
                ></b-table>
           
          </section>
        </b-tab-item>
      </b-tabs>
      <!-- <a class="is-active">Lectures</a>
      <a>Tutorials</a>
      <a>Practicals</a>-->
    </p>
    <!-- <section v-for="lecture in lectures" v-bind:key="lecture">
      <a class="panel-block">
        <b-switch @click="act($event)">{{lecture}}</b-switch>
      </a>
    </section>-->
  </article>
</template>



<script>
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy, { defaultIconPack: 'fa'})
import { bus } from "../main";
import axios from "axios";

export default {
  data() {
    return {
      perPage: 5,
      lectures: [],
      tutorials: [],
      practicals: [],
      selected: {},
      columnsLectures: [
        {
          field: "Day/Time",
          label: "Day and Time"
        },
        {
          field: "professor",
          label: "Professor"
        },
        {
          field: "RMPRating",
          label: "Rate My Professor Rating"
        },
        {
          field: "title",
          label: "Course Title"
        }
      ],
      columnsOther: [
        {
          field: "Day/Time",
          label: "Day and Time"
        },
        {
          field: "title",
          label: "Course Title"
        }
      ],
      courseAdded: 0
    };
  },
  methods: {
    addToCalendar(event) {
      bus.$emit("event added", event);
    },
    removeFromCalendar(event)
    {
      bus.$emit("remove events", event);
      console.log("still in course selection panel");
      this.selected = null;
    }


  },
  created() {
    bus.$on("course selected", course => {
      console.log("inside the selection panel!");
      //       console.log(course);
      //     console.log(course.lectures);
      //   console.log(course.lectures.L0101[0]);
      console.log(course);

      this.lectures = [];
      let k = 0;
      let j = 0;
      for (const [key, value] of Object.entries(course.courseData.lectures)) {
        //          console.log(key, value[0]);
        
        let i = 0;
        //console.log(value[i]);
        //value[i]["bob"] = "is your uncle";
        while (i < value.length) {
          console.log(i);
          console.log(j);
          console.log(k);
          this.lectures.push(value[i]);
          this.lectures[k]["bob"] = "is your uncle";
          console.log("tmes");
          if(course.professorData[j].data.length != 0)
          {
            this.lectures[k]["RMPRating"] = course.professorData[j].data[0].overall_rating;
          }
          else
          {
            this.lectures[k]["RMPRating"] = "-";
          }
          k += 1;
          i += 1;
        }

        j+= 1;
        
    
          
        
      }
      console.log("Lectures here: ", this.lectures)

      this.tutorials = [];
      for (const [key, value] of Object.entries(course.courseData.tutorials)) {
        //          console.log(key, value[0]);

        if (value.length != 0) {
          this.tutorials.push(value[0]);
        }

        // console.log("looking for empty tutorials");
        // console.log(value);
        // console.log(value.length == 0);
      }

      this.practicals = [];
      for (const [key, value] of Object.entries(course.courseData.practicals)) {
        console.log("looking for empty practicals");
        if (value.length != 0) {
          this.practicals.push(value[0]);
        }
      }

      console.log("bottom of created method");
      console.log(this.practicals);

      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];

      let i = 0;
      while (i < this.lectures.length) {
        const day = weekday[new Date(this.lectures[i].end).getDay()];
        this.lectures[i]["Day/Time"] =
          day +
          " " +
          this.lectures[i].start.slice(11) +
          " to " +
          this.lectures[i].end.slice(11);
        //console.log(this.lectures[i]);
        i += 1;
      }

  




      i = 0;
      while (i < this.tutorials.length) {
        const day = weekday[new Date(this.tutorials[i].end).getDay()];
        this.tutorials[i]["Day/Time"] =
          day +
          " " +
          this.tutorials[i].start.slice(11) +
          " to " +
          this.tutorials[i].end.slice(11);

        i += 1;
      }

      i = 0;
      while (i < this.practicals.length) {
        const day = weekday[new Date(this.practicals[i].end).getDay()];

        const formattedDay =
          day +
          " " +
          this.practicals[i].start.slice(11) +
          " to " +
          this.practicals[i].end.slice(11);

        this.practicals[i]["Day/Time"] = formattedDay;
        i += 1;
      }

      //const endDate = this.lectures[0].end;
      //  console.log(this.lectures);
      //    console.log(new Date(endDate).getDay());
      //      console.log(new Date(this.lectures[0].end).getDay());
    });
  }
};
</script>

























































