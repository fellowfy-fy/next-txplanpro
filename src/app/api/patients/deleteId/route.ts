import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  const patientId = req.nextUrl.searchParams.get('patientId');
  const doctorId = req.nextUrl.searchParams.get('doctorId');

  // Проверка наличия необходимых параметров
  if (!patientId || !doctorId) {
    return NextResponse.json(
      { error: 'patientId and doctorId are required' },
      { status: 400 }
    );
  }

  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: Number(patientId),
      },
    });

    if (!patient) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    if (patient.doctorId !== Number(doctorId)) {
      return NextResponse.json(
        { error: 'Unauthorized: You can only delete your own patients' },
        { status: 403 }
      );
    }

    await prisma.patient.delete({
      where: {
        id: Number(patientId),
      },
    });

    return NextResponse.json(
      { message: 'Patient deleted successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to delete patient' },
      { status: 500 }
    );
  }
}