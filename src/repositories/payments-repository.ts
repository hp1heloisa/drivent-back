import { prisma } from "@/config";
import { PaymentDone } from "@/services/payments-service";

async function payTicket(payData: PaymentDone) {
    return await prisma.payment.create({
        data: payData,
    });
}

async function payTicketInfo(ticketId: number) {
    return await prisma.payment.findFirst({
        where: { ticketId },
    });
}


export const paymentRepository = { 
    payTicket,
    payTicketInfo,
};