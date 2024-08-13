import axios, { AxiosResponse } from "axios";
import { Customer } from "../models/Customer";
import { getHeader } from "./AuthUtil";

export const getCustomers = async (token: String): Promise<Customer> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/customers", getHeader(token));
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error("Failed to get customers");
    }
}
