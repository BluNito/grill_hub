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
      name: item.name,
      quantity: item.quantity,
    };
  });
  return cleanedCart;
};

const extractOrdersDetails = (orders) => {
  orders = orders.map((order) => {
    return {
      id: order.oid,
      total: order.total,
      paid: order.paid,
      date: order.date,
      cart: order.cart.map((item) => {
        return {
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.totalPrice,
        };
      }),
      // cart: extractCartDetails(order.cart),
    };
  });
  return orders;
};

module.exports = {
  extractDishDetails,
  extractCartDetails,
  extractOrdersDetails,
};
