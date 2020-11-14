import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Header from "./shared/header";
import Grid from "@material-ui/core/Grid";
import { setCartInfo, removeFromCart } from "../store/actions/orderActions";
import CartList from "./cart-list";
import CartCheckout from "./cart-checkout";
import Splash from "./shared/splash";

const Cart = (props) => {
  const [loading, setLoading] = useState(true);
  const [itemSize, setItemSize] = useState(6);
  const { setCartInfo, cartInfo } = props;

  const removeFromCart = async (ids) => {
    await props.removeFromCart(ids);
    setLoading(true);
    await setCartInfo();
    setLoading(false);
  };

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      await setCartInfo();
      setLoading(false);
    };
    loadItems();
  }, [setCartInfo]);

  return (
    <React.Fragment>
      <Header />
      {loading ? (
        <Splash />
      ) : (
        <div className="main-content">
          <Grid container spacing={1}>
            <Grid item xs={itemSize}>
              <CartList cartInfo={cartInfo} removeFromCart={removeFromCart} />
            </Grid>
            <Grid item xs={itemSize}>
              <CartCheckout total={cartInfo.total} />
            </Grid>
          </Grid>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  cartInfo: state.order.cartInfo,
  dimensions: state.coms.dimensions,
});

export default connect(mapStateToProps, { setCartInfo, removeFromCart })(Cart);
