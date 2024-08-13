import express from "express";
import { createProduct, getProductById, getProducts } from "../services/ProductService";

export const getAllProducts = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render("productList.html", {products: await getProducts(req.session.token) });
}

export const getSingleProduct = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render("productDetail.html", { product: await getProductById(req.params.id, req.session.token) });
}

export const getProductForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render("productForm.html");
}

export const postProductForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const id = await createProduct(req.body, req.session.token);
        res.redirect("/products/" + id);
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render("productForm.html", req.body);
    }
}
