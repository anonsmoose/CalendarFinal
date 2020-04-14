<template>
  <section>
    <b-field label="Search for a course">
      <b-autocomplete
        rounded
        v-model="name"
        :data="data"
        placeholder="CSC301"
        icon="magnify"
        clearable
        @select="sendData($event)"
        @typing="getAsyncData"
      >
      <template slot-scope="props">
        <small>
            {{ props.option.courseCodeLong }}
        </small>
      </template>
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
import debounce from 'lodash/debounce'


const selectedCourseData = [];

Vue.use(Buefy);

export default {
  data() {
    return {
      data: [],
      name: "",
      selected: null,
      selectedCourseD: selectedCourseData,
      isFetching: false
    };
  },

  methods: {
    getAsyncData: debounce(function (name) {


                if (!name.length) {
                    this.data = []
                    return
                }
                // this.isFetching = true
                // this.$http.get(`http://localhost:3000/getCourse/${name}`)
                //     .then(({ data }) => {
                //         console.log("doing stuff");
                //         this.data = []
                //         data.results.forEach((item) => this.data.push(item))
                //     })
                //     .catch((error) => {
                //         this.data = []
                //         throw error
                //     })
                //     .finally(() => {
                //         this.isFetching = false
                //     })
                axios.get("http://localhost:3000/getCourse/" + name)
                    .then(res => {
                      this.data = [];
                      res.data.forEach((item) => this.data.push(item));
                    });
            }, 500),
    sendData(selectedCourse) {
      let courseD = {};
      if (selectedCourse != "") {
        axios
          .get("http://localhost:3000/getCourse/" + selectedCourse.courseCode)
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
