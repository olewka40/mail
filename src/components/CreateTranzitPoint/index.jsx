import React, { memo, useContext, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Test } from "../styled";
import { FunctionsContext } from "../context/FunctionsContext";

const CreateTranzitPoint = memo(() => {
  const [trek, setTrek] = useState("");
  const [index, setIndex] = useState("");
  const [weight, setWeight] = useState("");

  const { worldSkills, account } = useContext(FunctionsContext);
  const createTranzitPoint = async () => {
    await worldSkills.methods
      .CreateTranzitPoint(trek, index, weight)
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
          label="index"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          type="number"
          onChange={(e) => setIndex(e.target.value)}
        />
        <TextField
          label="weight"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          type="number"
          onChange={(e) => setWeight(e.target.value)}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={createTranzitPoint}
        >
          UserRegister
        </Button>
      </Test>
    </>
  );
});

export default CreateTranzitPoint;
