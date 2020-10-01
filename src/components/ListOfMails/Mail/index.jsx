import React from "react";
import { TableCell, TableRow } from "@material-ui/core";

export const Mail = ({ mail }) => {
  console.log(mail);
  return (
    <TableRow>
      <TableCell>TrackNumber</TableCell>
      <TableCell>sender</TableCell>
      <TableCell>receiver</TableCell>
      <TableCell>mailtype</TableCell>
      <TableCell>clas</TableCell>
      <TableCell>weight</TableCell>
      <TableCell>decvalue</TableCell>
      <TableCell>sendadr</TableCell>
      <TableCell>recadr</TableCell>
      <TableCell>Actions</TableCell>

      {/*<TableCell>*/}
      {/*  {window.web3.utils.fromWei(2, "Ether")}*/}
      {/*  Eth*/}
      {/*</TableCell>*/}

      {/*<TableCell>*/}
      {/*  <Button color="primary" variant="contained">*/}
      {/*    Action*/}
      {/*  </Button>*/}
      {/*</TableCell>*/}
    </TableRow>
  );
};
