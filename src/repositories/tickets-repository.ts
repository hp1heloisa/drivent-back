import { Prisma } from '@prisma/client';
import { prisma } from '@/config';
import { TicketUser } from '@/protocols';

async function getTicketTypes() {
    return prisma.ticketType.findMany()
}
async function getUserTickets(userId: number){
    return prisma.$queryRaw<TicketUser[]>(
        Prisma.sql`
            SELECT "Ticket".id, "Ticket".status, "Ticket"."ticketTypeId", "Ticket"."enrollmentId", 
            json_build_object('id',"TicketType".id, 'name', "TicketType"."name", 'price', "TicketType".price, 
            'isRemote', "TicketType"."isRemote", 'includesHotel', "TicketType"."includesHotel", 'createdAt', 
            to_char("TicketType"."createdAt", 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'), 'updatedAt', 
            to_char("TicketType"."updatedAt", 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')) as "TicketType", 
            to_char("Ticket"."createdAt", 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') as "createdAt", 
            to_char("Ticket"."updatedAt", 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') as "updatedAt" FROM "Enrollment" JOIN "User" 
            ON "Enrollment"."userId" = "User".id  JOIN "Ticket" ON 
            "Ticket"."enrollmentId"="Enrollment".id JOIN "TicketType" ON "Ticket"."ticketTypeId"="TicketType".id WHERE
            "User".id=${userId};
        `
    )
}

async function postTicket(ticketTypeId: number, enrollmentId: number){
    return prisma.ticket.create({
        data:{
            ticketTypeId,
            enrollmentId,
            status: 'RESERVED'
        }
    })
}

async function getTicketTypeById(id: number){ 
    return prisma.ticketType.findFirst({
        where:{id}
    })
}

async function getTicketById(id: number){
    return prisma.ticket.findFirst({
        where: {id},
        include: {
            TicketType: {
                select: {
                    price: true
                }
            }
        }
    })
}

async function updateTicket(id: number){
    return prisma.ticket.update({
        where: {id},
        data: {status: 'PAID'}
    })
}

export const ticketRepository = {
    getTicketTypes,
    getUserTickets,
    postTicket,
    getTicketTypeById,
    getTicketById,
    updateTicket
}