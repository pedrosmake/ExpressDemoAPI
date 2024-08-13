import axios, {AxiosResponse} from "axios";
import { OrderResponse } from "../models/OrderResponse";
import { Order } from "../models/Order";
import { OrderRequest } from "../models/OrderRequest";

export const getOrders = async (): Promise<OrderResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/orders");
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error("Failed to get orders");
    }
}

export const getOrderById = async (id: String): Promise<Order> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/orders/" + id);
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error("Failed to get order details");
    }
}

export const createOrder = async (order: OrderRequest): Promise<Number> => {
    try {
        const response: AxiosResponse = await axios.post("http://localhost:8080/api/orders", order);
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error(e.response.data);
    }
}
