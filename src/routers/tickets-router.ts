import { getTicketTypes, getUserTickets } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types', getTicketTypes )
    .get('/', getUserTickets)
    .post('/');

    
export {ticketsRouter};