import { Request, Response } from "express";
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb+srv://bob123:syntax@cluster0-gcdjv.azure.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'courses';
var testo: any;


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

        };
        practicals[currSection.code].push(courseSectionAsEvent);
      }

    }
  }


  return {"courseCode" : course.code, "lectures" : lectures, "tutorials" : tutorials, "practicals" : practicals};
}



const findDocuments = function (db: { collection: (arg0: string) => any; }, courseId: string, callback: (arg0: any) => void) {
  // Get the documents collection
  const collection = db.collection('course_information');
  // Find some documents
  console.log("This is the course id passed: " + courseId);




  if (courseId != undefined) {

    collection.find({"code" : {$regex: "^" + courseId, $options: "i"} }).limit(5).toArray(function (err: any, docs: any) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs)
    });

  }
  else {
    collection.find().toArray(function (err: any, docs: any) {
      assert.equal(err, null);
      console.log("Found the following records~");
      console.log(docs)
      callback(docs)
    });

  }
}

export default [
  {
    path: "/transactions/",
    method: "get",
    handler: async (req: Request, res: Response) => {
      res.send("Hello world!");
    }
  },
  {
    path: "/getCourse/:courseId",
    method: "get",
    handler: async (req: Request, res: Response) => {
      const client = new MongoClient(url);

      console.log("hello");
      const courseId = req.params.courseId;

      client.connect(function (err: any) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);



        findDocuments(db, courseId, function (docs) {
          client.close();
          // console.log(testo);
          // console.log(docs);

          let i = 0;
          while (i < docs.length) {
            docs[i] = getCourseInfo(docs[i]);
            i += 1
          }
          res.send(docs);
        });
      });
    }
  },
  {
    path: "/getAllCourses",
    method: "get",
    handler: async (req: Request, res: Response) => {
      const client = new MongoClient(url);

      console.log("hello");
      const courseId = req.params.courseId;

      client.connect(function (err: any) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);



        findDocuments(db, courseId, function (docs) {
          client.close();
          // console.log(testo);
          // console.log(docs);
          res.send(docs);
        });
      });
    }
  }
] as Route[];
