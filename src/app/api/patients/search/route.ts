import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query') || '';
  const doctorId = req.nextUrl.searchParams.get('doctorId');

  if (!doctorId) {
    return NextResponse.json({ error: `You aren't authorized` }, { status: 400 });
  }
  try {
    const patients = await prisma.patient.findMany({
      where: {
        doctorId: Number(doctorId),
        fullName: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    return NextResponse.json(patients);
  }
  catch (err) {
    console.log(err)
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}
