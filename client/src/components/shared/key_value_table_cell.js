import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const KeyValueTableCell = (props) => {
  return (
    <TableRow>
      <TableCell width={props.width ? props.width : 40}>
        {props.table_key}
      </TableCell>
      <TableCell>
        {props.children ? props.children : props.table_value}
      </TableCell>
    </TableRow>
  );
};

export default KeyValueTableCell;
