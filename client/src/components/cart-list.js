import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import Spinner from "./shared/spinner";
import cartTableData from "../utils/cart_table_data.json";

const CartList = (props) => {
  const { headers } = cartTableData;
  const { cartInfo, removeFromCart } = props;
  const [selected, setSelected] = useState([]);
  const [deleting, setDeleting] = useState(false);

  const useStyles = makeStyles({
    container: {
      maxHeight: 550,
    },
  });
  const classes = useStyles();

  const handleSelect = (checked, id) => {
    if (id) {
      if (!checked)
        setSelected((prevState) => prevState.filter((item) => item !== id));
      else setSelected((prevState) => [...prevState, id]);
    } else {
      if (!checked) setSelected([]);
      else setSelected(cartInfo.cartItems.map((item) => item.id));
    }
  };
  const handleDelete = async () => {
    setDeleting(true);
    await removeFromCart(selected);
    setSelected([]);
    setDeleting(false);
  };
  const headerCells = [
    <TableCell padding="checkbox">
      <Checkbox
        indeterminate={
          selected.length > 0 && selected.length < cartInfo.cartItems.length
        }
        checked={
          selected.length > 0 && selected.length === cartInfo.cartItems.length
        }
        onChange={(_, checked) => handleSelect(checked)}
      />
    </TableCell>,
    ...headers.map((header, index) => (
      <TableCell
        key={index}
        align={header.align}
        style={{ minWidth: header.minWidth }}
      >
        {header.name}
      </TableCell>
    )),
  ];
  const bodyCells = [
    ...cartInfo.cartItems.map((item, index) => (
      <TableRow hover selected={selected.includes(item.id)} key={index}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected.includes(item.id)}
            onChange={(_, checked) => handleSelect(checked, item.id)}
          />
        </TableCell>
        <TableCell align={headers[0].align}>{item.name}</TableCell>
        <TableCell align={headers[1].align}>{item.price}</TableCell>
        <TableCell align={headers[2].align}>{item.quantity}</TableCell>
        <TableCell align={headers[3].align}>{`₹${item.totalPrice}`}</TableCell>
      </TableRow>
    )),
    <TableRow>
      <TableCell rowSpan={1} />
      <TableCell align="right" colSpan={3}>
        <div className="cart-total">Total</div>
      </TableCell>
      <TableCell align="right">
        <div className="cart-total">{`₹${cartInfo.total}`}</div>
      </TableCell>
    </TableRow>,
  ];
  return (
    <React.Fragment>
      <Toolbar>
        <div className="cart-title">
          {selected.length > 0 ? `${selected.length} Selected` : "Your Cart"}
        </div>
        <div className="grow" />
        {deleting ? (
          <Spinner />
        ) : selected.length > 0 ? (
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="secondary" />
          </IconButton>
        ) : (
          <div />
        )}
      </Toolbar>
      <Paper>
        <TableContainer className={classes.container}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>{headerCells}</TableRow>
            </TableHead>
            <TableBody>{bodyCells}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
};

export default CartList;
