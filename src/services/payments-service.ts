import { notFoundError, unauthorizedError } from "@/errors";
import { badRequestFound } from "@/errors/badRequest";
import { enrollmentRepository } from "@/repositories";
import { paymentRepository } from "@/repositories/payments-repository";
import { ticketRepository } from "@/repositories/tickets-repository"
import { Payment } from "@prisma/client";

type CardData = {
    issuer: 'VISA' | 'MASTERCARD',
    number: string,
    name: string,
    expirationDate: Date,
    cvv: string
}

export type PaymentDone = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>

async function payTicket(ticketId: number, cardData: CardData, userId: number) {
    const ticketIdOk = await ticketRepository.getTicketById(ticketId);
    if (ticketIdOk == null) {
        throw notFoundError();
    }
    const userIdOk = await enrollmentRepository.findEnrollmentById(ticketIdOk.enrollmentId);
    if (userId != userIdOk.userId){
        throw unauthorizedError();
    }
    await ticketRepository.updateTicket(ticketId);
    const payData = {
        ticketId,
        value: ticketIdOk.TicketType.price,
        cardIssuer: cardData.issuer,
        cardLastDigits: cardData.number.slice(-3)
    }
    const resp = await paymentRepository.payTicket(payData)
    return resp;
}

async function payTicketInfo(ticketId: number, userId: number) {
    if (ticketId == undefined || isNaN(ticketId)) {
        throw badRequestFound();
    } 
    const ticketIdOk = await ticketRepository.getTicketById(ticketId);
    if (ticketIdOk == null) {
        throw notFoundError();
    }
    const userIdOk = await enrollmentRepository.findEnrollmentById(ticketIdOk.enrollmentId);
    if (userId != userIdOk.userId){
        throw unauthorizedError();
    }
    const payInfo = await paymentRepository.payTicketInfo(ticketId);
    return payInfo;
}

export const paymentService = {
    payTicket,
    payTicketInfo
}