import axios, {AxiosResponse} from "axios";
import { Product } from "../models/Product";
import { ProductRequest } from "../models/ProductRequest";

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/products");
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error("Failed to get products");
    }
}

export const getProductById = async (id: String): Promise<Product> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/products/" + id);
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error("Failed to get product details");
    }
}

export const createProduct = async (product: ProductRequest): Promise<Number> => {
    try {
        const response: AxiosResponse = await axios.post("http://localhost:8080/api/products", product)
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error(e.response.data);
    }
}
