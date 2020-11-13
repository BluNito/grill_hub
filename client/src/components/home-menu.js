import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setDishes } from "../store/actions/dishActions";
import SplashScreen from "./shared/splash";
import MenuItem from "./shared/menu-item";

const Menu = (props) => {
  const [loading, setLoading] = useState(true);
  const [ascending, setAscending] = useState(true);
  const [sortBy, setSoryBy] = useState(0);
  const { tag, setDishes } = props;
  useEffect(() => {
    const setSort = (value) => {
      if (value === 0) return "name";
      else return "price";
    };

    const loadMenu = async (tag) => {
      setLoading(true);
      const params = {
        tag: tag.tagId,
        sort_by: setSort(sortBy),
        ascending: ascending ? 1 : -1,
      };
      await setDishes(params);
      setLoading(false);
    };
    loadMenu(tag);
  }, [tag, setDishes, sortBy, ascending]);

  if (loading) return <SplashScreen />;
  return (
    <div className="menu">
      <div className="menu-title">
        {tag.tagId === "al" ? "All our dishes" : `What's ${tag.name}?`}
      </div>
      <div className="menu-list">
        {props.dishes.map((dish) => (
          <MenuItem dish={dish} key={dish.id} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dishes: state.dishes.dishes,
});

export default connect(mapStateToProps, { setDishes })(Menu);
