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



interface EventDict {
  [index: string]: Array<Event>;
}

interface Event {
  start: string;
  end: string;
  title: string;
  class: string;
  background: boolean;
}


interface Time {
  day: string;
  start: number;
  end: number;
  duration: number;
  location: string;
}


interface MeetingSection {
  code: string;
  instructors: Array<string>;
  times: Array<Time>;
  size: number;
  enrolment: number;
}


interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  division: string;
  department: string;
  prerequisites: string;
  exclusions: string;
  leve: number;
  campus: string;
  term: string;
  breadths: Array<number>;
  meeting_sections: Array<MeetingSection>;
}

function getCourseInfo(course: Course) {
  const meetingSections = course.meeting_sections;
  let currSection = null;
  const lectures: EventDict = {};
  const tutorials: EventDict = {};
  const practicals: EventDict = {};
  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

  const numMsInHour = 3600;
  let currDay = null;
  let startHour = null;
  let endHour = null;
  let courseSectionAsEvent = null;

  for (let i =0; i < meetingSections.length; i++) {

    currSection = meetingSections[i];
  

    if (currSection.code[0] == "L") { // If lecture
      lectures[currSection.code] = [];
      for (let j = 0; j < currSection.times.length; j++){
        startHour = (currSection.times[j].start / numMsInHour).toString();
        endHour = (currSection.times[j].end / numMsInHour).toString();
        currDay = currSection.times[j].day;
        currDay = (days.indexOf(currDay) + 6).toString();

        if (currDay.length == 1) {
          currDay = "0" + currDay;
        }

        courseSectionAsEvent = {
          start: "2020-01-" + currDay + " " +  startHour + ":00",
          end: "2020-01-" + currDay + " " +  endHour + ":00",
          title: course.code + " " + currSection.code,
          class: "lunch",
          background: true

        }
        lectures[currSection.code].push(courseSectionAsEvent);
      }

    }

    else if (currSection.code[0] == "T") { // If Tutorial
    tutorials[currSection.code] = [];
      for (let j = 0; j < currSection.times.length; j++){
        startHour = (currSection.times[j].start / numMsInHour).toString();
        endHour = (currSection.times[j].end / numMsInHour).toString();
        currDay = currSection.times[j].day;
        currDay = (days.indexOf(currDay) + 6).toString();

        if (currDay.length == 1) {
          currDay = "0" + currDay;
        }

        courseSectionAsEvent = {
          start: "2020-01-" + currDay + " " +  startHour + ":00",
          end: "2020-01-" + currDay + " " +  endHour + ":00",
          title: course.code + " " + currSection.code,
          class: "lunch",
          background: true

        }
        tutorials[currSection.code].push(courseSectionAsEvent);
      }


    }

    else { //Its a practical
    practicals[currSection.code] = [];
      for (let j = 0; j < currSection.times.length; j++){
        startHour = (currSection.times[j].start / numMsInHour).toString();
        endHour = (currSection.times[j].end / numMsInHour).toString();
        currDay = currSection.times[j].day;
        currDay = (days.indexOf(currDay) + 6).toString();



        if (currDay.length == 1) {
          currDay = "0" + currDay;
        }

        courseSectionAsEvent = {
          start: "2020-01-" + currDay + " " +  startHour + ":00",
          end: "2020-01-" + currDay + " " +  endHour + ":00",
          title: course.code + " " + currSection.code,
          class: "lunch",
          background: true

        }
        practicals[currSection.code].push(courseSectionAsEvent);
      }

    }
  }


  return {"lectures" : lectures, "tutorials" : tutorials, "practicals" : practicals};
}
