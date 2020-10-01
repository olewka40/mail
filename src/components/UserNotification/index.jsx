import React, { memo, useContext, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Test } from "../styled";
import { FunctionsContext } from "../context/FunctionsContext";

const UserNotification = memo(() => {
  const [trek, setTrek] = useState("");
  const [mail_id, setMailId] = useState("");
  const [startweight, setStartWeight] = useState("");
  const [finishweight, setFinishWeight] = useState("");

  const { worldSkills, account } = useContext(FunctionsContext);
  const userNotification = async () => {
    await worldSkills.methods
      .UserNotification(trek, mail_id, startweight, finishweight)
      .send({ from: account });
  };

  return (
    <>
      <Test>
        <TextField
          label="trek"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={(e) => setTrek(e.target.value)}
        />
        <TextField
          label="mail_id"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={(e) => setMailId(e.target.value)}
        />
        <TextField
          label="startweight"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          type="number"
          onChange={(e) => setStartWeight(e.target.value)}
        />
        <TextField
          label="finishweight"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          type="number"
          onChange={(e) => setFinishWeight(e.target.value)}
        />
        <Button color="primary" variant="contained" onClick={userNotification}>
          UserRegister
        </Button>
      </Test>
    </>
  );
});

export default UserNotification;
