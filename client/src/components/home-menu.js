import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SortIcon from "@material-ui/icons/Sort";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { setDishes } from "../store/actions/dishActions";
import SplashScreen from "./shared/splash";
import DishMenuItem from "./shared/menu-item";

const DishMenu = (props) => {
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAncherEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [sortBy, setSortBy] = useState(0);
  const [itemSize, setItemSize] = useState(4);
  const { tag, setDishes, dishes, dimensions } = props;

  useEffect(() => {
    const setSort = (value) => {
      let res = {};
      if (value === 0 || value === 2) res.sortBy = "name";
      else res.sortBy = "price";
      if (value === 1 || value === 3) res.ascending = -1;
      else res.ascending = 1;
      return res;
    };
    const sortParams = setSort(sortBy);
    const loadMenu = async (tag) => {
      setLoading(true);
      const params = {
        tag: tag.tagId,
        sort_by: sortParams.sortBy,
        ascending: sortParams.ascending,
      };
      await setDishes(params);
      setLoading(false);
    };
    loadMenu(tag);
  }, [tag, setDishes, sortBy]);

  useEffect(() => {
    if (dimensions.width > 1300) setItemSize(2);
    else if (dimensions.width > 860) setItemSize(3);
    else if (dimensions.width > 660) setItemSize(4);
    else if (dimensions.width > 430) setItemSize(6);
    else setItemSize(12);
  }, [dimensions]);

  const handleSortMenu = (mode, event) => {
    if (mode === 0) {
      setAncherEl(null);
    } else {
      setAncherEl(event.currentTarget);
    }
  };
  const handleSortBy = (mode) => {
    if (mode !== sortBy) {
      setSortBy(mode);
    }
    handleSortMenu(0);
  };
  const sortMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      id="sort-menu"
      open={isMenuOpen}
      onClose={() => handleSortMenu(0)}
    >
      <MenuItem onClick={() => handleSortBy(0)}>Name</MenuItem>
      <MenuItem onClick={() => handleSortBy(1)}>Price</MenuItem>
      <MenuItem onClick={() => handleSortBy(2)}>Name</MenuItem>
      <MenuItem onClick={() => handleSortBy(3)}>Price</MenuItem>
    </Menu>
  );

  if (loading) return <SplashScreen />;
  return (
    <div className="menu">
      <Toolbar>
        <div className="menu-title">
          {tag.tagId === "al" ? "All our dishes" : `What's ${tag.name}?`}
        </div>
        <div className="grow" />
        <IconButton
          color="secondary"
          onClick={(event) => handleSortMenu(1, event)}
        >
          <SortIcon />
        </IconButton>
      </Toolbar>
      <Grid container spacing={0}>
        {dishes.map((dish) => (
          <Grid item xs={itemSize} key={dish.id}>
            <DishMenuItem dish={dish} />
          </Grid>
        ))}
      </Grid>
      {sortMenu}
    </div>
  );
};

const mapStateToProps = (state) => ({
  dishes: state.dishes.dishes,
  dimensions: state.coms.dimensions,
});

export default connect(mapStateToProps, { setDishes })(DishMenu);
