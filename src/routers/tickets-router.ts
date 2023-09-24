import { getTicketTypes, getUserTickets, postTicket } from "@/controllers/tickets-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { postTicketSchema } from "@/schemas/tickets-schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types', getTicketTypes )
    .get('/', getUserTickets)
    .post('/', validateBody(postTicketSchema), postTicket);

    
export {ticketsRouter};