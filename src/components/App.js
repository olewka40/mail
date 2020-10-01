import React, { Component } from "react";
import Web3 from "web3";
import WorldSkills from "../abis/WorldSkills.json";
import { Navbar } from "./Navbar";
import Main from "./Main";
import { FunctionsContext } from "./context/FunctionsContext";
import { createGlobalStyle } from "styled-components";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    height: 100vh;
    width: 100%;
    
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0074C6",
    },
    secondary: {
      main: "#0074C6",
    },
  },
});

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      console.log(window.ethereum);
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();

    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = WorldSkills.networks[networkId];

    if (networkData) {
      const worldSkills = web3.eth.Contract(
        WorldSkills.abi,
        networkData.address
      );
      this.setState({ worldSkills });
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
    };
  }

  render() {
    const { createProduct, purchaseProduct } = this;
    const { products, worldSkills, account } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <FunctionsContext.Provider
          value={{
            createProduct,
            purchaseProduct,
            products,
            worldSkills,
            account,
          }}
        >
          <GlobalStyle />
          <Navbar />
          <Main />
        </FunctionsContext.Provider>
      </ThemeProvider>
    );
  }
}

export default App;
