import React, { memo, useContext, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Test } from "../styled";
import { FunctionsContext } from "../context/FunctionsContext";

const NotReceived = memo(() => {
  const [name, setName] = useState("");
  const [mail_id, setMail_id] = useState("");

  const { worldSkills, account } = useContext(FunctionsContext);
  const notReceived = async () => {
    await worldSkills.methods
      .NotReceived(name, mail_id)
      .send({ from: account });
  };

  return (
    <>
      <Test>
        <TextField
          label="Name"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <TextField
          label="Mail_id"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={(e) => setMail_id(e.target.value)}
        />
        <Button color="primary" variant="contained" onClick={notReceived}>
          notReceived
        </Button>
      </Test>
    </>
  );
});

export default NotReceived;
