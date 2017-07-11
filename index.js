"use strict";
const fs   = require("fs"),
      zlib = require("zlib");

class PBJ {
  constructor(data) {
    this.data = data;
  }

  get width() {
    return this.data.readUInt16LE(0);
  }

  get height() {
    return this.data.readUInt16LE(2);
  }

  get(x, y) {
    x = x >>> 0;
    y = y >>> 0;
    if(x >= this.width || y >= this.height) {
      return false;
    }

    const i = y * this.width + x;
    return !!(this.data[4 + (i >>> 3)] & (1 << (7 - (i & 7))));
  }

  set(x, y) {
    x = x >>> 0;
    y = y >>> 0;
    if(x < this.width && y < this.height) {
      const i = y * this.width + x;
      this.data[4 + (i >>> 3)] |= 1 << (7 - (i & 7));
    }
  }

  /* deprecated */
  bitAt(x, y) {
    return this.get(x, y);
  }

  static readFileSync(pathname) {
    let data = fs.readFileSync(pathname);
    if(/\.pbj(?:\.g)?z$/.test(pathname)) {
      data = zlib.gunzipSync(data);
    }
    return new PBJ(data);
  }

  static readFile(pathname, callback) {
    fs.readFile(pathname, (err, data) => {
      if(err) {
        callback(err);
      }

      else if(!/\.pbj(?:\.g)?z$/.test(pathname)) {
        callback(null, new PBJ(data));
      }

      else {
        zlib.gunzip(data, (err, data) => {
          if(err) {
            callback(err);
          }

          else {
            callback(null, new PBJ(data));
          }
        });
      }
    });
  }
}

module.exports = PBJ;
