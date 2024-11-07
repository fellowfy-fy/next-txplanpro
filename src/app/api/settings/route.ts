import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const doctorId = req.nextUrl.searchParams.get('doctorId');

  if (!doctorId) {
    return NextResponse.json({ error: 'doctorId is required' }, { status: 400 });
  }

  try {
    const settings = await prisma.user.findFirst({
      where: {
        id: Number(doctorId)
      },
      include: {
        prices: true,
        images: true,
      }
    });

    return NextResponse.json(settings);
  }
  catch (err) {
    console.log(err)
    return NextResponse.json({ error: 'Failed to fetch settings data' }, { status: 500 });
  }
}
