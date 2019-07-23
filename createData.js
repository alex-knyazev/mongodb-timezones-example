const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", {
  useNewUrlParser: true
});

const transactions = [
  {
    value: 90,
    date: new Date("2019-07-23T12:00:00Z"), // 05:00 in LA
    timezone: "America/Los_Angeles"
  },
  {
    value: 80,
    date: new Date("2019-07-23T14:00:00Z"), // 07:00 in LA
    timezone: "America/Los_Angeles"
  },
  {
    value: 70,
    date: new Date("2019-07-23T18:00:00Z"), // 11:00 in LA
    timezone: "America/Los_Angeles"
  },
  {
    value: 70,
    date: new Date("2019-07-23T20:00:00Z"), // 13:00 in LA
    timezone: "America/Los_Angeles"
  },
  {
    value: 70,
    date: new Date("2019-07-23T23:00:00Z"), // 16:00 in LA
    timezone: "America/Los_Angeles"
  },
  {
    value: 70,
    date: new Date("2019-07-23T12:00:00Z"), // 15:00 in Moscow
    timezone: "Europe/Moscow"
  },
  {
    value: 70,
    date: new Date("2019-07-23T21:00:00Z"), // 00:00 in Moscow
    timezone: "Europe/Moscow"
  }
];

mongoClient.connect(function(err, client) {
  if (err) {
    return console.log(err);
  }

  const db = client.db("timezones");
  const collection = db.collection("transactions");
  collection.insertMany(transactions, function(err, result) {
    if (err) {
      return console.log(err);
    }
    console.log(result.ops);
    client.close();
  });
});
