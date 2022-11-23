const mongoose = require("mongoose");
//Update with new database name
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/merchantalchemist",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
