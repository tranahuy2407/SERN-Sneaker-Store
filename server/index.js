const express = require('express');
const cors = require('cors');

const authRouter = require('./routers/auth');
const productRouter = require('./routers/product');
const adminRouter = require('./routers/admin');
const brandRouter = require('./routers/brand');
const categoryRouter = require('./routers/category');
const orderRouter = require('./routers/order');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/api', productRouter);
app.use('/admin', adminRouter);
app.use('/admin', brandRouter);
app.use('/admin', categoryRouter);
app.use('/order', orderRouter);

const port = 5000;
app.listen(port, () => {
    console.log("Server đang chạy trên port " + port);
})