import { notFoundError } from "@/errors";
import { enrollmentRepository } from "@/repositories";
import { ticketRepository } from "@/repositories/tickets-repository"

async function getTicketTypes(){
    const types = await ticketRepository.getTicketTypes();
    return types;
}

async function getUserTickets(userId: number){
    const tickets = await ticketRepository.getUserTickets(userId); 
    if (tickets.length < 1){
        throw notFoundError();
    }
    return tickets;
}

async function postTicket(userId: number, ticketTypeId: number){
    const enrollmentOk = await enrollmentRepository.findEnrollmentByUserId(userId);
    if (!enrollmentOk.id){
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
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
    };
    
}

export const ticketService = {
    getTicketTypes,
    getUserTickets,
    postTicket
}