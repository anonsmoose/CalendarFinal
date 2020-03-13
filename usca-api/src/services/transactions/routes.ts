import { Request, Response } from "express";
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb+srv://bob123:syntax@cluster0-gcdjv.azure.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'courses';
var testo: any;

const findDocuments = function (db: { collection: (arg0: string) => any; }, courseId: string, callback: (arg0: any) => void) {
  // Get the documents collection
  const collection = db.collection('course_information');
  // Find some documents
  console.log("This is the course id passed");

  if (courseId != undefined) {

    collection.find({ code: courseId }).toArray(function (err: any, docs: any) {
      assert.equal(err, null);
      console.log("Found the following records");
      // console.log(docs)
      callback(docs)
    });

  }
  else {
    collection.find().toArray(function (err: any, docs: any) {
      assert.equal(err, null);
      console.log("Found the following records");
      // console.log(docs)
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