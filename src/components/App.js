import React, { Component } from "react";
import Web3 from "web3";
import WorldSkills from "../abis/WorldSkills.json";
import { Navbar } from "./Navbar";
import Main from "./Main";
import { FunctionsContext } from "./context/FunctionsContext";
import { createGlobalStyle } from "styled-components";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Profile } from "./Profile";

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
      main: "#f50057",
    },
    error: {
      main: "#f50057",
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
      const worldSkills = new web3.eth.Contract(
        WorldSkills.abi,
        networkData.address
      );
      this.setState({ worldSkills });
      const mailCount = await worldSkills.methods.globalMailCount().call();

      this.setState({ mailCount });

      for (let i = 0; i <= mailCount; i++) {
        const data1 = await worldSkills.methods.getMail1(i).call();
        const data2 = await worldSkills.methods.getMail2(i).call();
        const data3 = await worldSkills.methods.getMail3(i).call();

        this.setState({
          mails: [
            ...this.state.mails,
            {
              trek: data1[0],
              mailsender: data1[1],
              mailreceiver: data1[2],
              mailtype: data1[3],
              class: data1[4],
              time: data1[5],
              deliverycost: data1[6],
              weight: data2[0],
              decvalue: data2[1],
              fullcost: data2[3],
              sendadr: data2[4],
              recadr: data2[5],
              paid: data2[6],
              delivered: data2[7],
              finishweight: data3[0],
              finished: data3[1],
              weightdiff: data3[2],
              DeliveredLate: data3[3],
            },
          ],
        });
      }
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      mails: [],
    };
  }

  render() {
    const updateMails = async () => {
      const { worldSkills } = this.state;
      const mailCount = await worldSkills.methods.globalMailCount().call();

      this.setState({ mailCount });

      for (let i = 0; i <= mailCount; i++) {
        const data1 = await worldSkills.methods.getMail1(i).call();
        const data2 = await worldSkills.methods.getMail2(i).call();
        const data3 = await worldSkills.methods.getMail3(i).call();

        this.setState({
          mails: [
            ...this.state.mails,
            {
              trek: data1[0],
              mailsender: data1[1],
              mailreceiver: data1[2],
              mailtype: data1[3],
              class: data1[4],
              time: data1[5],
              deliverycost: data1[6],
              weight: data2[0],
              decvalue: data2[1],
              fullcost: data2[3],
              sendadr: data2[4],
              recadr: data2[5],
              paid: data2[6],
              delivered: data2[7],
              finishweight: data3[0],
              finished: data3[1],
              weightdiff: data3[2],
              DeliveredLate: data3[3],
            },
          ],
        });
      }
    };
    const { products, worldSkills, mails, account } = this.state;
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <FunctionsContext.Provider
            value={{
              updateMails,
              mails,
              products,
              worldSkills,
              account,
            }}
          >
            <GlobalStyle />
            <Navbar />
            <Switch>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/">
                <Main />
              </Route>
            </Switch>
          </FunctionsContext.Provider>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
