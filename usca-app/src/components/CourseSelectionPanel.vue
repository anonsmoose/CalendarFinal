<template>
  <article class="panel is-warning">
    <p class="panel-heading">Course time selector</p>
    <p class="panel-tabs">
      <b-tabs size="is-small">
        <b-tab-item label="Lectures">
          <section>
            <button class="button field is-danger" @click="selected = null" :disabled="!selected">
              <b-icon icon="close"></b-icon>
              <span>Clear selected</span>
            </button>

                <b-table
                  :data="lectures"
                  :columns="columns"
                  :selected.sync="selected"
                  focusable
                  @select="addToCalendar($event)"
                ></b-table>

          </section>
        </b-tab-item>
        <b-tab-item label="tutorials">
          <section>
            <button class="button field is-danger" @click="selected = null" :disabled="!selected">
              <b-icon icon="close"></b-icon>
              <span>Clear selected</span>
            </button>

            <b-tabs>
              <b-tab-item label="Table">
                <b-table
                  :data="tutorials"
                  :columns="columns"
                  :selected.sync="selected"
                  focusable
                  @select="addToCalendar($event)"
                ></b-table>
              </b-tab-item>

              <b-tab-item label="Selected">
                <pre>{{ selected }}</pre>
              </b-tab-item>
            </b-tabs>
          </section>
        </b-tab-item>
        <b-tab-item label="practicals">
          <section>
            <button class="button field is-danger" @click="selected = null" :disabled="!selected">
              <b-icon icon="close"></b-icon>
              <span>Clear selected</span>
            </button>

            <b-tabs>
              <b-tab-item label="Table">
                <b-table
                  :data="practicals"
                  :columns="columns"
                  :selected.sync="selected"
                  focusable
                  @select="addToCalendar($event)"
                ></b-table>
              </b-tab-item>

              <b-tab-item label="Selected">
                <pre>{{ selected }}</pre>
              </b-tab-item>
            </b-tabs>
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
import { bus } from "../main";

export default {
  data() {
    return {
      lectures: [],
      tutorials: [],
      practicals: [],
      selected: {},
      columns: [
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
      for (const [key, value] of Object.entries(course.lectures)) {
        //          console.log(key, value[0]);

        this.lectures.push(value[0]);
       
      }

      this.tutorials = [];
      for (const [key, value] of Object.entries(course.tutorials)) {
        //          console.log(key, value[0]);

        this.tutorials.push(value[0]);
      }

      this.practicals = [];
      for (const [key, value] of Object.entries(course.practicals)) {
        //          console.log(key, value[0]);

        this.practicals.push(value[0]);
      }
      console.log(this.lectures);
      console.log("bottom of created method");

      const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturady"];

      let i = 0;
      while (i < this.lectures.length)
      
      {
        const day = weekday[new Date(this.lectures[i].end).getDay()];
        this.lectures[i]["Day/Time"] = day + " " + this.lectures[i].start.slice(11) + " to " + this.lectures[i].end.slice(11);
        //console.log(this.lectures[i]);
        i+=1;
        
      }

       i = 0;
      while (i < this.tutorials.length)
      
      {
        const day = weekday[new Date(this.tutorials[i].end).getDay()];
        this.tutorials[i]["Day/Time"] = day + " " + this.tutorials[i].start.slice(11) + " to " + this.tutorials[i].end.slice(11);
        console.log(this.tutorials[i]);
        i+=1;
        
      }

        i = 0;
      while (i < this.practicals.length)
      
      {
        const day = weekday[new Date(this.practicals[i].end).getDay()];
        this.practicals[i]["Day/Time"] = day + " " + this.practicals[i].start.slice(11) + " to " + this.praticals[i].end.slice(11);
        console.log(this.practicals[i]);
        i+=1;
        
      }
      
      //const endDate = this.lectures[0].end;
    //  console.log(this.lectures);
  //    console.log(new Date(endDate).getDay());
//      console.log(new Date(this.lectures[0].end).getDay());
    });
  }
};
</script>















conswsii











































