import React, { useState } from "react";
import { connect } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import KeyValueTableCell from "./shared/key_value_table_cell";
import Spacer from "./shared/spacer";
import Button from "@material-ui/core/Button";
import Spinner from "./shared/spinner";

const CartCheckout = (props) => {
  const { user, total, initiatePayment } = props;
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    await initiatePayment();
    setLoading(false);
  };
  const handleComplete = (response) => {
    console.log(response);
    console.log("woooo");
    setPaid(true);
  };

  return (
    <section className="cart-checkout-section">
      <Toolbar>
        <div className="cart-title">Checkout</div>
      </Toolbar>
      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <TableBody>
              <KeyValueTableCell
                table_key="Name"
                table_value={`${user.fname} ${user.lname}`}
              />
              <KeyValueTableCell
                table_key="Contact"
                table_value={user.contact}
              />
              <KeyValueTableCell table_key="Email" table_value={user.email} />
              <KeyValueTableCell table_key="Address">
                {user.address}
              </KeyValueTableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Spacer v={20} />
      {loading ? (
        <Spinner />
      ) : paid ? (
        <Button variant="outlined">Paid</Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleCheckout(handleComplete)}
        >
          {`Pay ₹${total}`}
        </Button>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(CartCheckout);
