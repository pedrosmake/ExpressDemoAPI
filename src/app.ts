import express from "express";
import nunjucks from "nunjucks";
import { getAllOrders, getOrderForm, getSingleOrder, postOrderForm } from "./controllers/OrderController";
import { dateFilter } from "./filters/DateFilter";
import { getAllProducts, getProductForm, getSingleProduct, postProductForm } from "./controllers/ProductController";
import bodyParser from "body-parser";
import { getAllCustomers } from "./controllers/CustomerController";

const app = express();

const env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});
env.addFilter("date", dateFilter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.get("/", async (req: express.Request, res: express.Response) => {
    const names: string[] = ["John", "Paul", "George", "Ringo", "Pedro"]
    res.render('index.html', {names});
});

app.get("/customers", getAllCustomers);
app.get("/orders", getAllOrders);
app.get("/orders/:id", getSingleOrder);
app.get("/products", getAllProducts);
app.get("/products/:id", getSingleProduct);

app.get("/productForm", getProductForm);
app.post("/productForm", postProductForm);

// client 1-2, date 2024-08-12T13:02:41.723Z
app.get("/orderForm", getOrderForm);
app.post("/orderForm", postOrderForm);
