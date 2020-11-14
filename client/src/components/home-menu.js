import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { setDishes } from "../store/actions/dishActions";
import SplashScreen from "./shared/splash";
import MenuItem from "./shared/menu-item";
import TestDishes from "../utils/test_dishes.json";

const Menu = (props) => {
  const [loading, setLoading] = useState(false);
  const [ascending, setAscending] = useState(true);
  const [sortBy, setSoryBy] = useState(0);
  const [itemSize, setItemSize] = useState(4);
  const { tag, setDishes, dimensions } = props;
  useEffect(() => {
    const setSort = (value) => {
      if (value === 0) return "name";
      else return "price";
    };

    const loadMenu = async (tag) => {
      // setLoading(true);
      // const params = {
      //   tag: tag.tagId,
      //   sort_by: setSort(sortBy),
      //   ascending: ascending ? 1 : -1,
      // };
      // await setDishes(params);
      // setLoading(false);
    };
    loadMenu(tag);
  }, [tag, setDishes, sortBy, ascending]);

  useEffect(() => {
    if (dimensions.width > 1300) setItemSize(2);
    else if (dimensions.width > 860) setItemSize(3);
    else if (dimensions.width > 660) setItemSize(4);
    else if (dimensions.width > 430) setItemSize(6);
    else setItemSize(12);
  }, [dimensions]);

  if (loading) return <SplashScreen />;
  return (
    <div className="menu">
      <div className="menu-title">
        {tag.tagId === "al" ? "All our dishes" : `What's ${tag.name}?`}
      </div>
      <Grid container spacing={0}>
        {TestDishes.map((dish) => (
          <Grid item xs={itemSize}>
            <MenuItem dish={dish} key={dish.id} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dishes: state.dishes.dishes,
  dimensions: state.coms.dimensions,
});

export default connect(mapStateToProps, { setDishes })(Menu);
