import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { paymentService } from '@/services/payments-service';

export async function payTicket(req: AuthenticatedRequest, res: Response) {
    const { ticketId, cardData } = req.body;
    const resp = await paymentService.payTicket(ticketId, cardData, req.userId);
    res.status(httpStatus.OK).send(resp);
}

export async function payTicketInfo(req: AuthenticatedRequest, res: Response) {
    const { ticketId } = req.query;
    const resp = await paymentService.payTicketInfo(Number(ticketId), req.userId);
    res.status(httpStatus.OK).send(resp);
}