import React, { memo, useContext, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { FunctionsContext } from "../context/FunctionsContext";
import { v4 } from "uuid";
import { Test } from "../styled";
import "react-dadata/dist/react-dadata.css";
import ReactDadataBox from "react-dadata-box";

const AddWorker = memo(() => {
  const [homeAddress, setHomeAddress] = useState("");
  const [name, setName] = useState("");
  const [wallet, setWallet] = useState("");

  const { worldSkills, account } = useContext(FunctionsContext);
  const addWorker = async () => {
    const id = v4();
    await worldSkills.methods
      .AddWorker(wallet, name, homeAddress.value.toString(), id)
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
        <Button color="primary" variant="contained" onClick={addWorker}>
          AddWorker
        </Button>
      </Test>
    </>
  );
});

export default AddWorker;
