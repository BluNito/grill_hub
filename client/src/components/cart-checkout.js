import React, { useState } from "react";
import { connect } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import TableBody from "@material-ui/core/TableBody";
import { initiatePayment, dropCart } from "../store/actions/orderActions";
import KeyValueTableCell from "./shared/key_value_table_cell";
import Spacer from "./shared/spacer";
import Spinner from "./shared/spinner";

const CartCheckout = (props) => {
  const { user, total, initiatePayment, dropCart } = props;
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [billDetails, setBillDetails] = useState({
    orderId: "",
  });

  const handleCheckout = async () => {
    setLoading(true);
    const options = await initiatePayment();
    options.prefill = {
      name: `${user.fname} ${user.lname}`,
      email: user.email,
      contact: user.contact,
    };
    options.handler = handleCheckoutSuccess;
    const rzpl = new window.Razorpay(options);
    rzpl.open();
    setLoading(false);
  };
  const handleCheckoutSuccess = (response) => {
    setBillDetails({
      orderId: response.razorpay_order_id,
    });
    dropCart();
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
        <Button variant="outlined" startIcon={<DoneAllIcon color="primary" />}>
          Paid
        </Button>
      ) : total > 0 ? (
        <Button variant="contained" color="secondary" onClick={handleCheckout}>
          {`Pay ₹${total}`}
        </Button>
      ) : (
        <div />
      )}
      {paid ? (
        <div>
          <Toolbar>
            <div className="cart-title">Bill Details</div>
          </Toolbar>
          <Paper variant="outlined">
            <TableContainer>
              <Table>
                <TableBody>
                  <KeyValueTableCell
                    width={90}
                    table_key="Order ID"
                    table_value={billDetails.orderId}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      ) : (
        <div />
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { initiatePayment, dropCart })(
  CartCheckout
);
