export const
  { ReadableStream } = require('./spec/reference-implementation/lib/readable-stream'),
  { WritableStream } = require('./spec/reference-implementation/lib/writable-stream'),
  { ByteLengthQueuingStrategy } = require('./spec/reference-implementation/lib/byte-length-queuing-strategy'),
  { CountQueuingStrategy } = require('./spec/reference-implementation/lib/count-queuing-strategy'),
  { TransformStream } = require('./spec/reference-implementation/lib/transform-stream');

const interfaces = {
  ReadableStream,
  WritableStream,
  ByteLengthQueuingStrategy,
  CountQueuingStrategy,
  TransformStream
};

// Export
export default interfaces;

function getGlobals(){
  if(typeof self !== 'undefined'){
    return self;
  }else if(typeof window !== 'undefined'){
    return window;
  }else if(typeof global !== 'undefined'){
    return global;
  }
}

function assignInterfaces(globals, interfaces){
  for(let i in interfaces){
    // prefer native implementation if available
    if(typeof globals[i] === 'undefined'){
      globals[i] = interfaces[i];
    }
  }  
}

const globals = getGlobals();
// Add classes to window
assignInterfaces(globals, interfaces);
