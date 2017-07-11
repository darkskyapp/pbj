"use strict";
const expect = require("chai").expect,
      path   = require("path"),
      PBJ    = require("./");

describe("PBJ", () => {
  it("should read a gzipped pbj from disk and let the user look up bits", done => {
    PBJ.readFile(path.join(__dirname, "var/1.pbjz"), (err, pbj) => {
      expect(err).to.be.null;
      expect(pbj).to.be.an.instanceOf(PBJ);
      expect(pbj.width).to.equal(128);
      expect(pbj.height).to.equal(128);
      expect(pbj.bitAt(0, 0)).to.be.false;
      expect(pbj.bitAt(32, 0)).to.be.true;
      expect(pbj.bitAt(32, -1)).to.be.false;
      expect(pbj.bitAt(30, 49)).to.be.false;
      expect(pbj.bitAt(28, 80)).to.be.true;
      done();
    });
  });

  it("should read a different gzipped pbj from disk and let the user look up bits", done => {
    PBJ.readFile(path.join(__dirname, "var/2.pbjz"), (err, pbj) => {
      expect(err).to.be.null;
      expect(pbj).to.be.an.instanceOf(PBJ);
      expect(pbj.width).to.equal(128);
      expect(pbj.height).to.equal(128);
      expect(pbj.bitAt(68, 67)).to.be.true;
      expect(pbj.bitAt(68, 67)).to.be.true;
      expect(pbj.bitAt(67, 68)).to.be.true;
      expect(pbj.bitAt(67, 68)).to.be.true;
      done();
    });
  });

  it("should fail to read a nonexistent PBJ", done => {
    PBJ.readFile(path.join(__dirname, "var/3.pbjz"), (err, pbj) => {
      expect(err).
        to.be.an.instanceOf(Error).
        that.has.a.property("code").
        that.equals("ENOENT");
      done();
    });
  });

  it("should allow setting bits", done => {
    PBJ.readFile(path.join(__dirname, "var/1.pbjz"), (err, pbj) => {
      expect(pbj.get(0, 0)).to.be.false;

      pbj.set(0, 0);
      expect(pbj.get(0, 0)).to.be.true;

      done();
    });
  });
});
