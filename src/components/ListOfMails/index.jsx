import React, { memo, useContext, useState, useCallback } from "react";
import { FunctionsContext } from "../context/FunctionsContext";
import {
  Button,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Paper,
} from "@material-ui/core";
import "react-dadata/dist/react-dadata.css";
import { Mail } from "./Mail";

const ListOfMails = memo(() => {
  const [data, setData] = useState([]);
  const { worldSkills } = useContext(FunctionsContext);
  const getData = useCallback(async () => {
    const mailCount = await worldSkills.methods.globalMailCount().call();
    for (let i = 1; i <= mailCount; i++) {
      const mail = await worldSkills.methods.getMail(i).call();
      setData({
        data: [...data, mail],
      });
    }
    console.log(data);
  }, [data, worldSkills]);
  return (
    <>
      <Button onClick={getData}>geqgeqg</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableRow>
            <TableCell align="left">TrackNumber</TableCell>
            <TableCell align="left">sender</TableCell>
            <TableCell align="left">receiver</TableCell>
            <TableCell align="left">mailtype</TableCell>
            <TableCell align="left">clas</TableCell>
            <TableCell align="left">weight</TableCell>
            <TableCell align="left">decvalue</TableCell>
            <TableCell align="left">sendadr</TableCell>
            <TableCell align="left">recadr</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>

          <TableBody>
            {data.map((mail, key) => (
              <Mail key={key} mail={mail} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});

export default ListOfMails;
