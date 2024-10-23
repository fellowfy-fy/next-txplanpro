"use server"
import { Service } from "@/components/shared/forms/business-form";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const upsertServices = async ({ services, doctorId }: { services: Service[], doctorId: number }) => {
  try {
    if (services) {
      const servicesUpsertPromises = services.map((service) =>
         prisma.service.upsert({
          where: {doctorId_type: {
            doctorId: doctorId,
            type: service.type,
          },
          },
          update: {
            price: service.price,
          },
          create: {
            type: service.type,
            price: service.price,
            doctorId: doctorId,
          },
        })
      );

      await Promise.all(servicesUpsertPromises);

      return { success: true };
    }
  } catch (err) {
    console.error("Error upserting services:", err);
    throw new Error("Failed to upsert services");
  }
};