import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  const planId = req.nextUrl.searchParams.get('planId');

  // Проверка наличия необходимых параметров
  if (!planId) {
    return NextResponse.json(
      { error: 'planId is required' },
      { status: 400 }
    );
  }

  try {
    const plan = await prisma.plan.findUnique({
      where: {
        id: Number(planId),
      },
    });

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      );
    }

    await prisma.plan.delete({
      where: {
        id: Number(plan.id),
      },
    });

    return NextResponse.json(
      { message: 'Plan deleted successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to delete plan' },
      { status: 500 }
    );
  }
}