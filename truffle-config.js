require("babel-register");
require("babel-polyfill");

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: 5777,
      gas: 6721975,
      from: "0xa11e0a833eef7cd3ffa20f132c92bc84f6b2add2",
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
