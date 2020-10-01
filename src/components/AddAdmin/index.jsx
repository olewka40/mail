import React, { memo, useContext, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Test } from "../styled";
import { FunctionsContext } from "../context/FunctionsContext";
import "react-dadata/dist/react-dadata.css";
import ReactDadataBox from "react-dadata-box";

const AddAdmin = memo(() => {
  const [homeAddress, setHomeAddress] = useState("");
  const [name, setName] = useState("");
  const [wallet, setWallet] = useState("");
  console.log(homeAddress.value);
  const { worldSkills, account } = useContext(FunctionsContext);
  const addAdmin = async () => {
    await worldSkills.methods
      .AddAdmin(wallet, name, homeAddress.value.toString())
      .send({ from: account });
  };

  return (
    <>
      <Test>
        <TextField
          label="Wallet"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={(e) => setWallet(e.target.value)}
        />
        <TextField
          label="Name"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={(e) => setName(e.target.value)}
        />

        <ReactDadataBox
          token="832d7c2cf450039412f06b0eaf6d167af99293d9"
          placeholder="Введите адрес"
          value={homeAddress}
          onChange={setHomeAddress}
        />
        <Button color="primary" variant="contained" onClick={addAdmin}>
          Add Admin
        </Button>
      </Test>
    </>
  );
});

export default AddAdmin;
