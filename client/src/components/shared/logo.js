import React from "react";
import Link from "@material-ui/core/Link";
import ButtonBase from "@material-ui/core/ButtonBase";
import LogoIcon from "../../assets/logo.png";

const Logo = () => {
  return (
    <ButtonBase>
      <Link href="/home">
        <img className="logo-image" src={LogoIcon} alt="logo" />
      </Link>
    </ButtonBase>
  );
};

export default Logo;
