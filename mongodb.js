//CRUD create read update delete

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID=mongodb.ObjectID;
const { MongoClient, ObjectID } = require("mongodb");

const id = new ObjectID();
console.log(id);
console.log(id.id.length);
console.log(id.toHexString().length);
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// MongoClient.connect(
//   connectionURL,
//   { useNewUrlParser: true },
//   (error, client) => {
//     if (error) return console.log("error occurred");
//     else {
//       const db = client.db(databaseName);
//       //   console.log(db);
//       //   db.collection("users").insertOne(
//       //     {
//       //       _id: id,
//       //       name: "Vikram",
//       //       age: 25,
//       //     },
//       //     (error, result) => {
//       //       if (error) return console.log("enable to insert user");
//       //       console.log(result.ops);
//       //     }
//       //   );
//       //   db.collection("users").insertMany(
//       //     [
//       //       {
//       //         name: "Bhumi",
//       //         age: 21,
//       //       },
//       //       { name: "Geeta", age: "52" },
//       //     ],
//       //     (error, results) => {
//       //       if (error) return console.log("enable to insert user");
//       //       console.log(results.ops);
//       //     }
//       //   );
//       //   db.collection("task").insertMany(
//       //     [
//       //       {
//       //         string: "task1",
//       //         complete: true,
//       //       },
//       //       {
//       //         string: "task2",
//       //         complete: false,
//       //       },
//       //       {
//       //         string: "task3",
//       //         complete: true,
//       //       },
//       //     ],
//       //     (error, result) => {
//       //       if (error) return console.log(error);
//       //       else console.log(result.ops);
//       //     }
//       //   );

//       db.collection("users").findOne(
//         { _id: new ObjectID("5f0b5dea3de1434a687a0a2b") },
//         (error, result) => {
//           if (error) return console.log("unable to fetch");
//           else if (result) console.log(result);
//           else console.log("Nothing found");
//         }
//       );
//       db.collection("users")
//         .find({ name: "Ashutosh" })
//         .toArray((error, result) => {
//           if (error) return console.log("unable to fetch");
//           else if (result) console.log(result);
//           else console.log("Nothing found");
//         });
//       db.collection("task")
//         .find({ complete: false })
//         .count((error, count) => {
//           console.log(count);
//         });
//     }
//   }
// );
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) return console.log("error occurred");
    else {
      const db = client.db(databaseName);
      // const updatePromise = db
      //   .collection("users")
      //   .updateOne(
      //     {
      //       _id: new ObjectID("5f0b5dea3de1434a687a0a2b"),
      //     },
      //     {
      //       // $set: { name: "Mike" },
      //       $inc: { age: 1 },
      //     }
      //   )
      //   .then((result) => {
      //     console.log(result);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      // db.collection("task")
      //   .updateMany({ complete: true }, { $set: { complete: false } })
      //   .then((data) => {
      //     console.log(data.modifiedCount);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      //   db.collection("task")
      //     .update({ complete: true }, { $set: { complete: false } })
      //     .then((data) => {
      //       console.log(data.result.modifiedCount);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      db.collection("users")
        .deleteMany({ age: 27 })
        .then((result) => {
          console.log(result.deletedCount);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
);
