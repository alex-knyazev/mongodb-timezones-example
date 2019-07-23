const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", {
  useNewUrlParser: true
});

mongoClient.connect(function(err, client) {
  if (err) {
    return console.log(err);
  }

  const db = client.db("timezones");
  const collection = db.collection("transactions");
  collection
    .aggregate([
      {
        $addFields: {
          date1: {
            $dateFromParts: {
              year: 2019,
              month: 7,
              day: 23,
              hour: 15,
              timezone: "$timezone"
            }
          }
        }
      },
      {
        $addFields: {
          dateComp: { $cmp: ["$date", "$date1"] }
        }
      }
      // { $match: { dateComp: 1 } } // filter by comparing value
    ])
    .toArray(function(err, results) {
      console.log(results);
      client.close();
    });
});
