import React, { memo } from "react";
import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Paper,
} from "@material-ui/core";
import { Mail } from "./Mail";

const ListOfMails = memo(({ mails }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableRow>
            <TableCell align="left">trek</TableCell>
            <TableCell align="left">mailsender</TableCell>
            <TableCell align="left">mailreceiver</TableCell>
            <TableCell align="left">mailtype</TableCell>
            <TableCell align="left">class</TableCell>
            <TableCell align="left">time</TableCell>
            <TableCell align="left">deliverycost</TableCell>
            <TableCell align="left">weight</TableCell>
            <TableCell align="left">decvalue</TableCell>
            <TableCell align="left">fullcost</TableCell>
            <TableCell align="left">sendadr</TableCell>
            <TableCell align="left">recadr</TableCell>
            {/*<TableCell align="left">finishweight</TableCell>*/}
            {/*<TableCell align="left">paid</TableCell>*/}
            {/*<TableCell align="left">delivered</TableCell>*/}
            {/*<TableCell align="left">finished</TableCell>*/}
            {/*<TableCell align="left">weightdiff</TableCell>*/}
            {/*<TableCell align="left">DeliveredLate</TableCell>*/}
            <TableCell align="left">
              Actions
            </TableCell>
          </TableRow>

          <TableBody>
            {mails.map((mail, key) => (
              <Mail key={key} mail={mail} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});

export default ListOfMails;
