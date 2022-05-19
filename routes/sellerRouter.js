const router = require("express").Router();
const { Catalog, Product, Order } = require("../models");

router.post("/create-catalog", async (req, res) => {
  try {
    const { id } = req.userData;
    const { name, products } = req.body;

    let parsedProducts = JSON.parse(products);

    const catalog = await Catalog.create({
      name,
      userId: id,
    });

    const productsArr = [];

    for (let i = 0; i < parsedProducts.length; i++) {
      productsArr.push({
        name: parsedProducts[i].name,
        price: parsedProducts[i].price,
        catalogId: catalog.id,
      });
    }

    const result = await Product.bulkCreate(productsArr);
    const productIdList = result.map((ele, idx) => {
      return ele.id;
    });

    await Catalog.update(
      {
        products: productIdList.toString(),
      },
      { where: { id: catalog.id } }
    );

    return res.status(201).json({
      message: "create catalogs success",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/orders", async (req, res) => {
  try {
    const { id, type } = req.userData;

    if (type !== "seller") {
      return res.status(400).json({
        message: "You are not seller, please login as seller",
      });
    }

    const orders = await Order.findAll({
      where: {
        sellerId: id,
      },
    });

    let detailProduct;
    for (let i = 0; i < orders.length; i++) {
      detailProduct = await Product.findAll({
        where: { id: orders[i].products.split(",") },
      });
      orders[i].products = detailProduct;
    }

    return res.status(200).json({
      message: "success retrieved orders",
      result: orders,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/getCatalog", async (req, res) => {
  try {
    const catalog = await Catalog.findAll();

    const products = await Product.findAll({
      where: { id: catalog[0].products.split(",") },
    });

    catalog[0].products = products;

    return res.status(200).json({
      message: "success",
      result: catalog,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
