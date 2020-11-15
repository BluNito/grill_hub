import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { setOrders } from "../store/actions/orderActions";
import { withCurreny } from "../utils/with_currency";

const ProfileOrders = (props) => {
  const { setOrders, orders } = props;
  const [expandList, setExpandList] = useState([]);

  const handleExpansion = (index) => {
    if (expandList.includes(index))
      setExpandList((prevState) => prevState.filter((item) => item !== index));
    else setExpandList((prevState) => [...prevState, index]);
  };

  const isOpen = (index) => {
    return expandList.includes(index);
  };

  useEffect(() => {
    setOrders();
  }, [setOrders]);
  return (
    <React.Fragment>
      <Paper variant="outlined">
        <Toolbar>
          <div className="cart-title">Your Orders</div>
        </Toolbar>
        <List component="nav">
          {orders.map((order, index) => (
            <div key={index}>
              <ListItem button onClick={() => handleExpansion(index)}>
                <ListItemText
                  primary={order.id}
                  secondary={moment(order.date).fromNow()}
                />
                <div className="price-container">
                  {withCurreny(order.total)}
                </div>
                {isOpen(index) ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={isOpen(index)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {order.cart.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={item.name}
                        secondary={`Quantity: ${item.quantity}`}
                      />
                      <div className="price-mini-container">
                        {withCurreny(item.totalPrice)}
                      </div>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
              <Divider />
            </div>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  orders: state.order.orders,
});

export default connect(mapStateToProps, { setOrders })(ProfileOrders);
