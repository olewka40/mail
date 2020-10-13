import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

export const Search = () => {
  const [test, setTest] = useState("");

  const clickButton = () => {
    console.log(test);
  };

  return (
    <div>
      <Style>
        <InputBlock>
          <TextField
            id="outlined-basic"
            label="Имя"
            variant="outlined"
            onChange={(e) => {
              setTest(e.target.value);
            }}
          />

          <Button
            variant="contained"
            color="primary"
            href="#contained-buttons"
            onClick={clickButton}
          >
            Ввести
          </Button>
        </InputBlock>

        <InputBlock>
          <TextField
            id="outlined-basic"
            label="Пароль"
            variant="outlined"
            onChange={(e) => {
              setTest(e.target.value);
            }}
          />

          <Button
            variant="contained"
            color="primary"
            href="#contained-buttons"
            onClick={clickButton}
          >
            Ввести
          </Button>
        </InputBlock>
      </Style>
    </div>
  );
};

const Style = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const InputBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default Search;
