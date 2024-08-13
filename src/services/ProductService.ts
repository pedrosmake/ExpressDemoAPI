import axios, {AxiosResponse} from "axios";
import { Product } from "../models/Product";
import { ProductRequest } from "../models/ProductRequest";
import { getHeader } from "./AuthUtil";

export const getProducts = async (token: String): Promise<Product[]> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/products", getHeader(token));
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error("Failed to get products");
    }
}

export const getProductById = async (id: String, token: String): Promise<Product> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/products/" + id, getHeader(token));
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error("Failed to get product details");
    }
}

export const createProduct = async (product: ProductRequest, token: String): Promise<Number> => {
    try {
        const response: AxiosResponse = await axios.post("http://localhost:8080/api/products", product, getHeader(token))
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error(e.response.data);
    }
}
