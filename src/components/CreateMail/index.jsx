import React, { memo, useContext, useState } from "react";
import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import { Test } from "../styled";
import { FunctionsContext } from "../context/FunctionsContext";
import styled from "styled-components";
import ReactDadataBox from "react-dadata-box";
import moment from "moment";
const CreateMail = memo(() => {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [startpostindex, setStartpostindex] = useState("");
  const [endpostindex, setEndpostindex] = useState("");
  const [mailtype, setMailtype] = useState("");
  const [clas, setClass] = useState("");
  const [weight, setWeight] = useState("");
  const [decvalue, setDecvalue] = useState("");
  const [sendadr, setSendadr] = useState("");
  const [recadr, setRecadr] = useState("");
  const [count, setCount] = useState(1);

  const { worldSkills, account } = useContext(FunctionsContext);
  const createMail = async () => {
    let dateNow = moment().format("DDMMYYYY");
    console.log(dateNow);
    const startIndex = sendadr.data.postal_code;
    const endIndex = recadr.data.postal_code;

    const trek = `RR${dateNow}${count}${startIndex}${endIndex}`;
    console.log(trek);
    await worldSkills.methods
      .CreateMail(
        trek,
        sender,
        receiver,
        startpostindex,
        endpostindex,
        mailtype,
        clas,
        weight,
        decvalue,
        sendadr.value,
        recadr.value
      )
      .send({ from: account });
    setCount(count + 1);
  };

  return (
    <>
      <Test>
        <TextField
          label="sender"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={(e) => setSender(e.target.value)}
        />
        <TextField
          label="receiver"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={(e) => setReceiver(e.target.value)}
        /><TextField
          label="startpostindex"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={(e) => setStartpostindex(e.target.value)}
        /><TextField
          label="endpostindex"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={(e) => setEndpostindex(e.target.value)}
        />
        <StyledSelect
          styled={{ height: 40, width: 223 }}
          label="mailtype"
          value={mailtype}
          variant="outlined"
          onChange={(e) => setMailtype(e.target.value)}
        >
          <MenuItem value="Письмо">Письмо</MenuItem>
          <MenuItem value="Бандероль">Бандероль</MenuItem>
          <MenuItem value="Поссылка">Поссылка</MenuItem>
        </StyledSelect>
        <TextField
          label="clas"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          type="number"
          onChange={(e) => setClass(e.target.value)}
        />
        <TextField
          label="weight"
          type="number"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={(e) => setWeight(e.target.value)}
        />
        <TextField
          label="decvalue"
          type="number"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={(e) => setDecvalue(e.target.value)}
        />
        <ReactDadataBox
          token="832d7c2cf450039412f06b0eaf6d167af99293d9"
          placeholder="Введите начальный адрес"
          value={sendadr}
          onChange={setSendadr}
        />
        <ReactDadataBox
          token="832d7c2cf450039412f06b0eaf6d167af99293d9"
          placeholder="Введите конечный адрес"
          value={recadr}
          onChange={setRecadr}
        />

        <Button color="primary" variant="contained" onClick={createMail}>
          CreateMail
        </Button>
      </Test>
    </>
  );
});

export default CreateMail;

const StyledSelect = styled(Select)`
  height: 40px;
  width: 223px;
`;
