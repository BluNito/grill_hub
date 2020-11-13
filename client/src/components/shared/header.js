import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Logo from "./logo";
import { logout } from "../../store/actions/authActions";

const Header = (props) => {
  const [anchorEl, setAncherEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const history = useHistory();

  const handleAccountMenu = (mode, event) => {
    if (mode === 0) {
      setAncherEl(null);
    } else {
      setAncherEl(event.currentTarget);
    }
  };

  const menuId = "account-menu";
  const accountMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      id={menuId}
      open={isMenuOpen}
      onClose={() => handleAccountMenu(0)}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem onClick={props.logout}>Logout</MenuItem>
    </Menu>
  );
  return (
    <AppBar position="static" variant="outlined" color="white">
      <Toolbar dense={true}>
        <Logo />
        <div className="grow" />
        <Button
          variant="outlined"
          onClick={(event) => handleAccountMenu(1, event)}
        >
          {`${props.user.fname} ${props.user.lname}`}
        </Button>
      </Toolbar>
      {accountMenu}
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Header);
