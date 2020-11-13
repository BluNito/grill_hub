import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Spacer from "./spacer";
import { addToCart } from "../../store/actions/orderActions";

const CartAddDialog = (props) => {
  const [quantity, setQuantity] = useState(1);
  const changeQuantity = (value) => {
    setQuantity((prevState) => {
      if (prevState === 1 && value === -1) return prevState;
      else return prevState + value;
    });
  };
  const { open, dish, handleClose } = props;
  const handleAddToCart = () => {
    props.addToCart(dish.id, quantity);
    setQuantity(1);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <img src={dish.cover} alt="sample" />
      <DialogContent>
        <div className="cart-dialog-title">{dish.name}</div>
        <DialogContentText>{dish.desc}</DialogContentText>
        <section className="cart-button-section">
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <div className="cart-quantity-section">
            <ButtonGroup>
              <Button onClick={() => changeQuantity(-1)}>
                <RemoveIcon style={{ fontSize: 15 }} />
              </Button>
              <Button>{quantity}</Button>
              <Button onClick={() => changeQuantity(1)}>
                <AddIcon style={{ fontSize: 15 }} />
              </Button>
            </ButtonGroup>
            <Spacer h={10} />
            <Button
              color="secondary"
              variant="contained"
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default connect(null, { addToCart })(CartAddDialog);
