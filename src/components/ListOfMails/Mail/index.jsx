import React from "react";
import { TableCell, Button, TableRow } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import styled from "styled-components";

export const Mail = ({ mail }) => {
  return (
    <TableRow>
      <TableCell>{mail.trek}</TableCell>
      <TableCell>{mail.mailsender}</TableCell>
      <TableCell>{mail.mailreceiver}</TableCell>
      <TableCell>{mail.mailtype}</TableCell>
      <TableCell>{mail.class}</TableCell>
      <TableCell>{mail.time}</TableCell>
      <TableCell>{mail.deliverycost}</TableCell>
      <TableCell>{mail.weight}</TableCell>
      <TableCell>{mail.decvalue}</TableCell>
      <TableCell>{mail.fullcost}</TableCell>
      <TableCell>{mail.sendadr}</TableCell>
      <TableCell>{mail.recadr ? <DoneIcon /> : <CloseIcon />}</TableCell>
      {/*<TableCell>{ mail.finishweight }</TableCell>*/}
      {/*<TableCell>{ mail.paid  ? <DoneIcon/> : <CloseIcon/> }</TableCell>*/}
      {/*<TableCell>{ mail.delivered  ? <DoneIcon/> : <CloseIcon/> }</TableCell>*/}
      {/*<TableCell>{ mail.finished  ? <DoneIcon/> : <CloseIcon/> }</TableCell>*/}
      {/*<TableCell>{ mail.weightdiff  ? <DoneIcon/> : <CloseIcon/> }</TableCell>*/}
      {/*<TableCell>{mail.DeliveredLate ? <DoneIcon/> : <CloseIcon/> }</TableCell>*/}
      <TableCell>
        <Actions>
          <Button variant="contained" color="primary">
            Accept
          </Button>
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
        </Actions>
      </TableCell>
    </TableRow>
  );
};

const Actions = styled.div`
  display: flex;
  > button {
    margin: 5px;
  }
`;
