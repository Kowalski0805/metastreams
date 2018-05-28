'use strict';
const metatests = require('metatests');

function TypedArray() {
  const ta = new Uint32Array(4);
  ta[0] = 4294967295;
  return ta[0];
}

function ArrayBufferWithTypedArray() {
  const ab = new ArrayBuffer(4);
  const ta = new Uint32Array(ab);
  ta[0] = 4294967295;
  return ta[0];
}

function ArrayBufferWithDataView() {
  const ab = new ArrayBuffer(4);
  const dv = new DataView(ab);
  dv.setUint32(0, 4294967295, true);
  return dv.getUint32(0, 0, true);
}

function NodeBuffer() {
  const buf = Buffer.alloc(4);
  buf.writeUInt32LE(4294967295, 0, true);
  return buf.readUInt32LE(0, true);
}

metatests.speed('ArrayBuffer vs Node.js Buffer', 1e5, [
  TypedArray,
  NodeBuffer,
  ArrayBufferWithTypedArray,
  ArrayBufferWithDataView,
]);
