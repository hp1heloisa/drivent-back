import { notFoundError } from "@/errors";
import { enrollmentRepository } from "@/repositories";
import { ticketRepository } from "@/repositories/tickets-repository"
import dayjs from "dayjs";

async function getTicketTypes(){
    const types = await ticketRepository.getTicketTypes();
    return types;
}

async function getUserTickets(userId: number){
    const tickets = await ticketRepository.getUserTickets(userId); 
    if (tickets.length < 1){
        throw notFoundError();
    }
    return tickets[0];
}

async function postTicket(userId: number, ticketTypeId: number){
    const enrollmentOk = await enrollmentRepository.findEnrollmentByUserId(userId);
    if (enrollmentOk == null){
        throw notFoundError();
    }
    const post = await ticketRepository.postTicket(ticketTypeId, enrollmentOk.id);
    const TicketType = await ticketRepository.getTicketTypeById(ticketTypeId);
    return {
        id: post.id,
        status: post.status,
        ticketTypeId: post.ticketTypeId,
        enrollmentId: post.enrollmentId,
        TicketType,
        createdAt: dayjs(post.createdAt).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        updatedAt: dayjs(post.updatedAt).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    };
    
}

export const ticketService = {
    getTicketTypes,
    getUserTickets,
    postTicket
}