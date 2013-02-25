(function() {
  "use strict";

  var expect = require("chai").expect,
      path   = require("path"),
      PBJ    = require("./");

  describe("PBJ", function() {
    it("should read a gzipped pbj from disk and let the user look up bits", function(done) {
      PBJ.readFile(path.join(__dirname, "test.pbj.gz"), function(err, pbj) {
        expect(err).to.be.null;
        expect(pbj).to.be.an.instanceOf(PBJ);
        expect(pbj.width()).to.equal(128);
        expect(pbj.height()).to.equal(128);
        expect(pbj.bitAt(0, 0)).to.be.false;
        expect(pbj.bitAt(32, 0)).to.be.true;
        expect(pbj.bitAt(32, -1)).to.be.false;
        expect(pbj.bitAt(30, 49)).to.be.false;
        expect(pbj.bitAt(28, 80)).to.be.true;
        done();
      });
    });
  });
}());
