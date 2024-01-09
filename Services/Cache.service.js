const cache = new Map();
const retrievers = new Map();

const register = (key, retriever) => {
  if (retrievers.has(key)) {
    throw new Error(`Retriever already registered for key '${key}'`);
  }

  retrievers.set(key, retriever);
}

const retrieve = (key) => {
  if (cache.has(key)) {
    return Promise.resolve(cache.get(key));
  }

  const retrieveFunction = retrievers.get(key);
  if (!retrieveFunction) {
    return Promise.reject(new Error(`No retriever registered for key '${key}'`));
  }

  return retrieveFunction().then((value) => {
    cache.set(key, value);
    return value;
  });
}

const refresh = (key) => {
  const retrieveFunction = retrievers.get(key);
  if (!retrieveFunction) {
    return Promise.reject(new Error(`No retriever registered for key '${key}'`));
  }

  cache.delete(key);
  return retrieveFunction().then((value) => {
    cache.set(key, value);
  });
}

module.exports = {
  register,
  retrieve,
  refresh,
}