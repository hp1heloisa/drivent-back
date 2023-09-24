import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function getTicketTypes() {
    return prisma.ticketType.findMany()
}

async function getUserTickets(userId: number){
    return prisma.$queryRaw(
        Prisma.sql`
            SELECT "Ticket".id, "Ticket".status, "Ticket"."ticketTypeId", "Ticket"."enrollmentId", 
            json_build_object('id',"TicketType".id, 'name', "TicketType"."name", 'price', "TicketType".price, 
            'isRemote', "TicketType"."isRemote", 'includesHotel', "TicketType"."includesHotel", 'createdAt', 
            "TicketType"."createdAt", 'updatedAt', "TicketType"."updatedAt") as "TicketType", "Ticket"."createdAt", 
            "Ticket"."updatedAt" FROM "Enrollment" JOIN "User" ON "Enrollment"."userId" = "User".id  JOIN "Ticket" ON 
            "Ticket"."enrollmentId"="Enrollment".id JOIN "TicketType" ON "Ticket"."ticketTypeId"="TicketType".id WHERE
            "User".id=${userId};
        `
    )
}

export const ticketRepository = {
    getTicketTypes,
    getUserTickets
}