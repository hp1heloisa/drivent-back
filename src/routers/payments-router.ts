import { payTicket, payTicketInfo } from "@/controllers/payments-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { payTicketSchema } from "@/schemas/payments-schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
    .all('/*', authenticateToken)
    .get('/', payTicketInfo)
    .post('/process', validateBody(payTicketSchema), payTicket);

export {paymentsRouter};