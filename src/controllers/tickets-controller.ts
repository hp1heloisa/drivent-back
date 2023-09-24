import { ticketService } from '@/services/tickets-service';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTicketTypes(req: Request, res: Response){
    const types = await ticketService.getTicketTypes();
    res.status(httpStatus.OK).send(types);
}

export async function getUserTickets(req: AuthenticatedRequest, res: Response){
    const tickets = await ticketService.getUserTickets(req.userId);
    res.status(httpStatus.OK).send(tickets);
}