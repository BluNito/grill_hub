import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "./divider";
import Button from "@material-ui/core/Button";
import CartAddDialog from "./cart_add_dialog";

const MenuItem = (props) => {
  const { dish } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="menu-item">
      <Paper>
        <img src={dish.cover} alt="sample" />
        <div className="menu-content">
          <div className="menu-item-name">{dish.name}</div>
          <div className="menu-item-desc">{dish.desc}</div>
          <Divider />
          <div className="menu-item-button">
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              size="small"
              onClick={handleOpen}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Paper>
      <CartAddDialog open={open} dish={dish} handleClose={handleClose} />
    </div>
  );
};

export default MenuItem;
