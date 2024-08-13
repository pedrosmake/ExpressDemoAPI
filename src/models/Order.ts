import { Customer } from "./Customer";

export type Order = {
    orderId: Number,
    orderDate: Date,
    customer: Customer
}
