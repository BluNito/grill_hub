const extractDishDetails = (dish) => {
  return {
    id: dish._id,
    name: dish.name,
    price: dish.price,
    desc: dish.desc,
    cover: dish.cover,
    type: dish.type,
  };
};

const extractCartDetails = (cart) => {
  const cleanedCart = {};
  cleanedCart.inCart = cart.inCart;
  cleanedCart.cart = cart.cart.map((item) => {
    return {
      id: item.fid,
      quantity: item.quantity,
    };
  });
  return cleanedCart;
};

module.exports = {
  extractDishDetails,
  extractCartDetails,
};
