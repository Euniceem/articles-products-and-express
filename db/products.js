(function () {
  const productsObj = {
    "products": []
  };

  const getProducts = () => {
    return productsObj.products;
  };

  const getProduct = (id) => {
    let itemId = id

    let product = productsObj.products.find(product => { return product.id === itemId; });

    return product

  }

  const addProduct = (name, price, inventory) => {
    if (!typeof name === 'string' || !typeof price === 'string' || !typeof inventory === 'string') {
      return false;
    }
    let product = {};
    product.id = productsObj.products.length + 1;
    product.name = name;
    product.price = Number(price);
    product.inventory = parseInt(inventory);

    productsObj.products.push(product);
    return productsObj;
  };

  const editProduct = (id, name, price, inventory) => {
    let product = productsObj.products.find(function (product) {
      return id === product.id;
    });
    console.log(product.name, name)
    if (product) {
      product.name = name;
      product.price = Number(price);
      product.inventory = parseInt(inventory);
    }
  }

  const deleteProduct = (id) => {
    let filterArr = productsObj.products.filter(function (product) {
      if (product.id !== id) {
        return true;
      } else {
        return false;
      }
    })
    productsObj.products = filterArr;
  }


  module.exports = {
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    deleteProduct,
  };

})();