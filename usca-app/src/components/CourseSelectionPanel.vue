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
      perPage: 4,
      lectures: [],
      tutorials: [],
      practicals: [],
      selected: {},
      columnsLectures: [
        {
          field: "dayTime",
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
        },
        {
          field: "location",
          label: "Location"
        }
      ],
      columnsOther: [
        {
          field: "dayTime",
          label: "Day and Time"
        },
        {
          field: "title",
          label: "Course Title"
        },
        {
          field: "location",
          label: "Location"
        }
      ],
      courseAdded: 0
    };
  },
  methods: {
    addToCalendar(event) {
      console.log("event here: ", event);
      if(event.title.charAt(8) == "Y")
      {
        console.log("yearly");
        bus.$emit("fall event added", event);
        bus.$emit("winter event added", event);
      }
      else if (event.semester == "Winter")
      {
        bus.$emit("winter event added", event);
      }
      else
      {
        bus.$emit("fall event added", event);
      }
    },
    removeFromCalendar(event)
    {
      bus.$emit("remove events", event);
      
      this.selected = null;
    }


  },
  created() {
    bus.$on("course selected", course => {
      //       console.log(course);
      //     console.log(course.lectures);
      //   console.log(course.lectures.L0101[0]);
      // console.log(course);
      console.log(course.courseData);

      this.lectures = [];
      let k = 0;
      let j = 0;
      for (const [key, value] of Object.entries(course.courseData.lectures)) {
        //          console.log(key, value[0]);
        
        let i = 0;
        //console.log(value[i]);
        //value[i]["bob"] = "is your uncle";
        while (i < value.length) {
          // console.log(i);
          // console.log(j);
          // console.log(k);
          this.lectures.push(value[i]);
          this.lectures[k]["bob"] = "is your uncle";
          // console.log("tmes");
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
      // console.log("Lectures here: ", this.lectures)

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
        // console.log("looking for empty practicals");
        if (value.length != 0) {
          this.practicals.push(value[0]);
        }
      }

      // console.log("bottom of created method");
      // console.log(this.practicals);

    });
  }
};
</script>
























































