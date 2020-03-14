import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

export const bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");




function getCourseInfo(course) {
  var meeting_sections = course.meeting_sections;
  var curr_section = null;
  var lectures = {};
  var tutorials = {};
  var practicals = {};
  var days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

  var num_ms_in_hour = 3600;
  var curr_day = null;
  var start_hour = null;
  var end_hour = null;
  var course_section_as_event = null;

  for (var i =0; i < meeting_sections.length; i++) {

    curr_section = meeting_sections[i];
  

    if (curr_section.code[0] == "L") { // If lecture
      lectures[curr_section.code] = [];
      for (var j = 0; j < curr_section.times.length; j++){
        start_hour = (curr_section.times[j].start / num_ms_in_hour).toString();
        end_hour = (curr_section.times[j].end / num_ms_in_hour).toString();
        curr_day = curr_section.times[j].day;
        curr_day = (days.indexOf(curr_day) + 6).toString();

        if (curr_day.length == 1) {
          curr_day = "0" + curr_day;
        }

        course_section_as_event = {
          start: "2020-01-" + curr_day + " " +  start_hour + ":00",
          end: "2020-01-" + curr_day + " " +  end_hour + ":00",
          title: course.code + " " + curr_section.code,
          class: "lunch",
          background: true

        }
        lectures[curr_section.code].push(course_section_as_event);
      }

    }

    else if (curr_section.code[0] == "T") { // If Tutorial
    tutorials[curr_section.code] = [];
      for (var j = 0; j < curr_section.times.length; j++){
        start_hour = (curr_section.times[j].start / num_ms_in_hour).toString();
        end_hour = (curr_section.times[j].end / num_ms_in_hour).toString();
        curr_day = curr_section.times[j].day;
        curr_day = (days.indexOf(curr_day) + 6).toString();

        if (curr_day.length == 1) {
          curr_day = "0" + curr_day;
        }

        course_section_as_event = {
          start: "2020-01-" + curr_day + " " +  start_hour + ":00",
          end: "2020-01-" + curr_day + " " +  end_hour + ":00",
          title: course.code + " " + curr_section.code,
          class: "lunch",
          background: true

        }
        tutorials[curr_section.code].push(course_section_as_event);
      }


    }

    else { //Its a practical
    practicals[curr_section.code] = [];
      for (var j = 0; j < curr_section.times.length; j++){
        start_hour = (curr_section.times[j].start / num_ms_in_hour).toString();
        end_hour = (curr_section.times[j].end / num_ms_in_hour).toString();
        curr_day = curr_section.times[j].day;
        curr_day = (days.indexOf(curr_day) + 6).toString();



        if (curr_day.length == 1) {
          curr_day = "0" + curr_day;
        }

        course_section_as_event = {
          start: "2020-01-" + curr_day + " " +  start_hour + ":00",
          end: "2020-01-" + curr_day + " " +  end_hour + ":00",
          title: course.code + " " + curr_section.code,
          class: "lunch",
          background: true

        }
        practicals[curr_section.code].push(course_section_as_event);
      }

    }
  }


  return {"lectures" : lectures, "tutorials" : tutorials, "practicals" : practicals};
}
