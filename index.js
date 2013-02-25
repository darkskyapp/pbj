var fs   = require("fs"),
    zlib = require("zlib");

function PBJ(data) {
  this.data = data;
};

PBJ.readFile = function(pathname, callback) {
  return fs.readFile(pathname, function(err, data) {
    if(err)
      return callback(err);

    if(!/\.pbj(?:\.g)?z$/.test(pathname))
      return callback(err, new PBJ(data));

    return zlib.gunzip(data, function(err, data) {
      if(err)
        return callback(err);

      return callback(err, new PBJ(data));
    });
  });
};

PBJ.prototype = {
  width: function() {
    return this.data.readUInt16LE(0);
  },
  height: function() {
    return this.data.readUInt16LE(2);
  },
  bitAt: function(x, y) {
    if(x < 0 || y < 0)
      return false;

    var width  = this.width(),
        height = this.height();

    if(x >= width || y >= height)
      return false;

    var index      = y * width + x,
        byteOffset = 4 + (index >>> 3),
        bitMask    = 1 << (7 - (index & 7));

    return !!(this.data.readUInt8(byteOffset, true) & bitMask);
  }
};

module.exports = PBJ;
