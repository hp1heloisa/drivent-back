import { ticketRepository } from "@/repositories/tickets-repository"

async function getTicketTypes(){
    const types = await ticketRepository.getTicketTypes();
    return types;
}

async function getUserTickets(userId: number){
    const tickets = await ticketRepository.getUserTickets(userId);
    return tickets;
}

export const ticketService = {
    getTicketTypes,
    getUserTickets
}