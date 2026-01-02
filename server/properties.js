const NODE_PORT = 4000;

module.exports = {
  NODE_PORT,
  WSS_PORT: 4001,
  LOCAL_SERVER: (host) => `${host}//localhost:${NODE_PORT}`,
};
