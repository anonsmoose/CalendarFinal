<template>
  <section>
    <b-field label="Search for a course">
      <b-autocomplete
        rounded
        v-model="name"
        :data="filteredDataArray"
        placeholder="CSC301"
        icon="magnify"
        clearable
        @select="sendData($event)"
        @input="getCourses($event)"
      >
        <template slot="empty">No results found</template>
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { bus } from "@/main.ts";
import axios from "axios";

const courseData = [];
const selectedCourseData = [];

Vue.use(Buefy);

export default {
  data() {
    return {
      data: courseData,
      name: "",
      selected: null,
      selectedCourseD: selectedCourseData
    };
  },

  computed: {
    filteredDataArray() {
      return this.data.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
        );
      });
    }
  },
  methods: {
    getCourses(input) {
      if (input != "") {
        axios.get("http://localhost:3000/getCourse/" + input).then(res => {
          let i = 0;
          while (i < res.data.length) {
            courseData[i] = res.data[i].courseCodeLong;
            i += 1;
          }
          // console.log(res.data);
          courseData.__ob__.dep.notify();
        });
      }
    },
    sendData(selectedCourse) {
      let courseD = {};
      console.log("hello");
      if (selectedCourse != "") {
        axios
          .get("http://localhost:3000/getCourse/" + selectedCourse.slice(0, 9))
          .then(res => {
            courseD = res.data[0];
            // const requestOne = axios.get(
            //   "http://localhost:3000/getProfessor/UTM/A/Weir"
            // );
            // return axios.get('http://localhost:3000/getProfessor/' + course.campus + "/" + this.lectures[i].professor.charAt(0) + "/" + this.lectures[i].professor.slice(2));

            // console.log("about to emit");
            // bus.$emit('course selected', res.data[0]);
            bus.$emit("course selected", {
              courseData: courseD
            });
          });
      }
    }
  }
};
</script>
