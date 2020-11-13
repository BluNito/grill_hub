import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Header from "./shared/header";
import SplashScreen from "./shared/splash";
import { setTags } from "../store/actions/dishActions";
import Menu from "./home-menu";

const Home = (props) => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  const handleChange = (_, index) => {
    setValue(index);
  };

  const localSetTags = props.setTags;
  useEffect(() => {
    const loadTags = async () => {
      await localSetTags();
      setLoading(false);
    };
    loadTags();
  }, [localSetTags]);

  return (
    <React.Fragment>
      <Header />
      {loading ? (
        <SplashScreen />
      ) : (
        <div>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="Dish types"
            >
              {props.tags.map((tag) => (
                <Tab label={tag.name} key={tag.tagId} />
              ))}
            </Tabs>
          </AppBar>
          <Menu tag={props.tags[value]} />
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  tags: state.dishes.tags,
});

export default connect(mapStateToProps, { setTags })(Home);
