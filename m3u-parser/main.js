var parsers = require("playlist-parser");
var M3U = parsers.M3U;

var fs = require("fs");
var playlist = M3U.parse(fs.readFileSync(__dirname + "/android_playlist.m3u", { encoding: "utf8" }));

console.log('playlist:', playlist[1])