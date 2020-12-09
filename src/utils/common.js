const pipelineAsyncArray = async (array, cb) => {
  const res = array.reduce(
    async (promise, item) => {
      await promise;
      return cb(item);
    },
    Promise.resolve(),
  );
  return res;
};

module.exports = {
  pipelineAsyncArray,
};
