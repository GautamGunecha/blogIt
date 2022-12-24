const mongoose = require("mongoose");

const DB = process.env.MONGODB_URI;
const DB_HISTORY = process.env.MONGODB_URI_HISTORY;

function connectToDB(mongoDbUri) {
  const db = mongoose.createConnection(mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  db.on("error", function (error) {
    console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
    db.close().catch(() =>
      console.log(`MongoDB :: failed to close connection ${this.name}`)
    );
  });

  db.on("connected", function () {
    mongoose.set("debug", function (col, method, query, doc) {
      console.log(
        `MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(
          query
        )},${JSON.stringify(doc)})`
      );
    });
    console.log(`MongoDB :: connected ${this.name}`);
  });

  db.on("disconnected", function () {
    console.log(`MongoDB :: disconnected ${this.name}`);
  });

  return db;
}

const mongoDB = connectToDB(DB);
const mongoDBHistory = connectToDB(DB_HISTORY);

module.exports = { mongoDB, mongoDBHistory };
