import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const { images } = await request.json();

  // Создаем экземпляр браузера
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();

  // Получаем базовый URL для формирования полного пути
  const origin = request.nextUrl.origin;
  const url = `${origin}/print?data=${encodeURIComponent(JSON.stringify(images))}`;

  // Переходим на страницу /print с данными
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Генерируем PDF
  const pdfBuffer = await page.pdf({
    format: 'A4',
    landscape: true,
    printBackground: true,
  });

  await browser.close();

  // Возвращаем PDF в ответе
  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=slides.pdf',
    },
  });
}
