import express from "express";
import { getCustomers } from "../services/CustomerService";

export const getAllCustomers = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render("customerList.html", { customers: await getCustomers() });
}
