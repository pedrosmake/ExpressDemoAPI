import express from "express";
import nunjucks from "nunjucks";
import { getAllOrders, getOrderForm, getSingleOrder, postOrderForm } from "./controllers/OrderController";
import { dateFilter } from "./filters/DateFilter";
import { getAllProducts, getProductForm, getSingleProduct, postProductForm } from "./controllers/ProductController";
import bodyParser from "body-parser";
import { getAllCustomers } from "./controllers/CustomerController";
import session from "express-session";
import { getLoginForm, getRegisterForm, postLoginForm, postRegisterForm } from "./controllers/AuthController";
import { allowRoles } from "./middleware/AuthMiddleware";
import { UserRole } from "./models/JwtToken";

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

app.use(session({secret: 'SUPER_SECRET', cookie: { maxAge: 28800000}}));
declare module "express-session" {
    interface SessionData {
        token: string;
    }
}

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.get("/", async (req: express.Request, res: express.Response) => {
    const names: string[] = ["John", "Paul", "George", "Ringo", "Pedro"]
    res.render('index.html', {names});
});

app.get("/customers", allowRoles([UserRole.Admin, UserRole.User]), getAllCustomers);
app.get("/orders", allowRoles([UserRole.Admin, UserRole.User]), getAllOrders);
app.get("/orders/:id", allowRoles([UserRole.Admin, UserRole.User]), getSingleOrder);
app.get("/products", allowRoles([UserRole.Admin, UserRole.User]), getAllProducts);
app.get("/products/:id", allowRoles([UserRole.Admin, UserRole.User]), getSingleProduct);

app.get("/productForm", allowRoles([UserRole.Admin]), getProductForm);
app.post("/productForm", allowRoles([UserRole.Admin]), postProductForm);

// client 1-2, date 2024-08-12 13:02:41
app.get("/orderForm", allowRoles([UserRole.Admin, UserRole.User]), getOrderForm);
app.post("/orderForm", allowRoles([UserRole.Admin, UserRole.User]), postOrderForm);

app.get("/loginForm", getLoginForm);
app.post("/loginForm", postLoginForm);

app.get("/registerForm", getRegisterForm);
app.post("/registerForm", postRegisterForm);
