import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import backgroundImage from "../assets/cover.jpg";
import LandingLogin from "./shared/landing_login";
import LandingRegister from "./shared/landing_register";
import Spacer from "./shared/spacer";
import Spinner from "./shared/spinner";
import { connect } from "react-redux";
import { register, login } from "../store/actions/authActions";
import { CenteredAlert } from "./shared/custom_alert";

const Landing = (props) => {
  const [triggerAnimation, setTrigger] = useState("");
  const [credentials, setCredentials] = useState({
    fname: "",
    lname: "",
    email: "",
    contact: "",
    address: "",
    password: "",
    password2: "",
  });

  const [mode, setMode] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleMode = () => {
    setCredentials({
      fname: "",
      lname: "",
      email: "",
      contact: "",
      address: "",
      password: "",
      confirm_password: "",
    });
    setErrors({});
    if (mode === 1) setMode(0);
    else setMode(1);
  };
  const handleChange = (event) => {
    const target = event.currentTarget.name;
    const value = event.currentTarget.value;
    setCredentials((prevState) => ({
      ...prevState,
      [target]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let res;
    setLoading(true);
    if (mode === 0) {
      res = await props.login(credentials);
    } else {
      res = await props.register(credentials);
    }
    if (res != null) {
      setErrors(res);
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => setTrigger("animate"), 100);
  }, [setTrigger]);

  const landingStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "contain",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <React.Fragment>
      <div
        className={`landing landing-${triggerAnimation}`}
        style={landingStyles}
      >
        <div className="counter-panel-container" />
        <div className="panel-container">
          <form onSubmit={handleSubmit}>
            {mode === 0 ? (
              <LandingLogin
                credentials={credentials}
                handleChange={handleChange}
                errors={errors}
              />
            ) : (
              <LandingRegister
                credentials={credentials}
                handleChange={handleChange}
                errors={errors}
              />
            )}
            <Spacer v={10} />
            {loading ? (
              <Spinner />
            ) : (
              <Button variant="contained" color="primary" type="submit">
                {mode === 0 ? "Login" : "Register"}
              </Button>
            )}
            {errors.login || errors.register ? (
              <CenteredAlert
                severity="error"
                content={errors.login ? errors.login : errors.register}
              />
            ) : (
              <div />
            )}
            <Spacer v={10} />
            <Button size="small" onClick={handleMode}>
              {mode === 0
                ? "No account? Register!"
                : "Have an account? Go back!"}
            </Button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(null, { register, login })(Landing);
