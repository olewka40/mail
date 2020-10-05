import React, { memo, useContext, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Test } from "../styled";
import { FunctionsContext } from "../context/FunctionsContext";

const UserNotification = memo(() => {
  const [trek, setTrek] = useState("");

  const { worldSkills, account } = useContext(FunctionsContext);
  const userNotification = async () => {
    await worldSkills.methods.UserNotification(trek).send({ from: account });
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

        <Button color="primary" variant="contained" onClick={userNotification}>
          UserNotification
        </Button>
      </Test>
    </>
  );
});

export default UserNotification;
