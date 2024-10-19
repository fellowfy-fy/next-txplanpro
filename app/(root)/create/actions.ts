"use server"

import { prisma } from "@/prisma/prisma-client";

interface CreatePatientProps {
  fullName: string,
  address: string,
  birthDate: string,
}

export async function createPatient(body: CreatePatientProps, userData: {email: string}) {
    try {

        const user = await prisma.user.findFirst({
            where: {
              email: userData.email,
            },
          });

          if (!user) {
      
            throw new Error('User was not found');
          }
          const birthDate = new Date(body.birthDate);
      const createdPatient = await prisma.patient.create({
        data: {
          fullName: body.fullName,
          birthDate,
          address: body.address,
          doctor: {
            connect: { id: user.id }
        }
        },
      });
      console.log(createdPatient)
     
    } catch (err) {
      console.log('Error [CREATE_USER]', err);
      throw err;
    }
  }