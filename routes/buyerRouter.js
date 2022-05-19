const router = require("express").Router();
const { User, Catalog, Product, Order } = require("../models");

router.get("/list-of-sellers", async (req, res) => {
  try {
    const sellers = await User.findAll({
      where: {
        type: "seller",
      },
    });

    return res.status(200).json({
      message: "success retrieve sellers",
      result: sellers,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/seller-catalog/:seller_id", async (req, res) => {
  try {
    const id = req.params.seller_id;
    const { type } = req.userData;

    if (type !== "buyer") {
      return res.status(403).json({
        message: "Sorry you are not buyer",
      });
    }

    const catalog = await Catalog.findOne({
      where: { userId: id },
    });

    const products = await Product.findAll({
      where: { catalogId: catalog.id },
    });

    return res.status(200).json({
      message: "success retrieve data",
      result: products,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/create-order/:seller_id", async (req, res) => {
  try {
    const sellerId = req.params.seller_id;
    const { products } = req.body;
    const { type, id } = req.userData;

    if (type !== "buyer") {
      return res.status(403).json({
        message: "Sorry you are not buyer, you cannot buy anything",
      });
    }

    const order = await Order.create({
      products: JSON.parse(products).toString(),
      buyerId: id,
      sellerId,
    });

    return res.status(201).json({
      message: "Success create order",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
