import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query') || '';
  const doctorId = req.nextUrl.searchParams.get('doctorId');

  if (!doctorId) {
    return NextResponse.json({ error: 'doctorId is required' }, { status: 400 });
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
    include: {
      teeth: true,      
      images: true,  
    },
  });

  return NextResponse.json(patients);
} 
  catch(err) {
    console.log(err)
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}
