const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
  urls: {
    type: String,
  },
  shortId: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});
const ShortUrl = mongoose.model("URL", shortUrlSchema);
module.exports = ShortUrl;
