"use server"
import { Service, Content } from "@/components/shared/forms/business-form";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const upsertServices = async ({ services, doctorId }: { services: Service[], doctorId: number }) => {
  try {
    if (services) {
      const servicesUpsertPromises = services.map((service) =>
        prisma.service.upsert({
          where: {
            doctorId_type: {
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


export const upsertContent = async ({ contents, doctorId }: { contents: Content[], doctorId: number }) => {
  try {
    if (contents) {
      const contentsUpsertPromises = contents.map((content) =>
        prisma.businessContent.upsert({
          where: {
            doctorId_type: {
              doctorId: doctorId,
              type: content.type,
            },
          },
          update: {
            content: content.content,
          },
          create: {
            type: content.type,
            content: content.content,
            doctorId: doctorId,
          },
        })
      );

      await Promise.all(contentsUpsertPromises);

      return { success: true };
    }
  } catch (err) {
    console.error("Error upserting contents:", err);
    throw new Error("Failed to upsert services");
  }
};