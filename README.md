PBJ
===

PBJ is a really tiny, stupid image format for (monochrome) bitmaps. It's
comparable to [the PBM file format](http://netpbm.sourceforge.net/doc/pbm.html)
but it's even more trivial. The format goes like this:

1.  The width of the image as an unsigned, little-endian 16-bit integer.
2.  The height of the image as an unsigned, little-endian 16-bit integer.
3.  The bits of the image, ordered from left to right and top to bottom, packed
    eight to a byte. If the number of bits in an image is not an even multiple
    of eight, the extraneous bits in the last byte of the image are ignored.

It's not a very space-efficient format, but that's why God invented
[GZIP](http://zlib.net/). If you pass this library a file ending in ".pbj.gz"
or ".pbjz", it will decompress it for you.

We have, at times, used it in place of PNGs as a storage format since it's much
more efficient to work with.

License
-------

To the extend possible by law, The Dark Sky Company, LLC has [waived all
copyright and related or neighboring rights][cc0] to this library.

[cc0]: http://creativecommons.org/publicdomain/zero/1.0/
