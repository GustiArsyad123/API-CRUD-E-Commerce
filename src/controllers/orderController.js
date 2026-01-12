const { Order, OrderItem, Product, User } = require('../models');

exports.create = async (req, res) => {
  /* Expected payload:
    {
      userId: 1,
      items: [{ productId: 1, quantity: 2 }, ...]
    }
  */
  try {
    const { userId, items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must include items' });
    }

    // calculate total and create order
    let total = 0;
    const itemsWithPrice = [];
    for (const it of items) {
      const product = await Product.findByPk(it.productId);
      if (!product) return res.status(400).json({ error: `Product ${it.productId} not found` });
      const price = parseFloat(product.price);
      const quantity = parseInt(it.quantity, 10) || 1;
      total += price * quantity;
      itemsWithPrice.push({ productId: product.id, quantity, price });
    }

    const order = await Order.create({ userId, total, status: 'pending' });

    for (const it of itemsWithPrice) {
      await OrderItem.create({ orderId: order.id, productId: it.productId, quantity: it.quantity, price: it.price });
    }

    const created = await Order.findByPk(order.id, { include: [{ model: OrderItem, as: 'items', include: [{ model: Product, as: 'product' }] }, { model: User, as: 'user', attributes: { exclude: ['password'] } }] });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [{ model: OrderItem, as: 'items' }] });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: [{ model: OrderItem, as: 'items', include: [{ model: Product, as: 'product' }] }, { model: User, as: 'user', attributes: { exclude: ['password'] } }] });
    if (!order) return res.status(404).json({ error: 'Not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Not found' });
    const { status } = req.body;
    order.status = status || order.status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
