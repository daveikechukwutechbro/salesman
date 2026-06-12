import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();
    const BOT_TOKEN = process.env.BOT_TOKEN;

    if (update.pre_checkout_query) {
      const { id } = update.pre_checkout_query;
      try {
        await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/answerPreCheckoutQuery`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pre_checkout_query_id: id, ok: true }),
          }
        );
      } catch (e) {
        console.error('Error answering pre_checkout_query:', e);
        await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/answerPreCheckoutQuery`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              pre_checkout_query_id: id,
              ok: false,
              error_message: 'Something went wrong. Please try again.',
            }),
          }
        );
      }
      return NextResponse.json({ ok: true });
    }

    if (update.successful_payment) {
      const { invoice_payload, telegram_payment_charge_id } = update.successful_payment;

      let payload: { userId: string; orderNumber?: string };
      try {
        payload = JSON.parse(invoice_payload);
      } catch {
        payload = { userId: '', orderNumber: '' };
      }

      if (payload.orderNumber) {
        const order = await prisma.order.findUnique({
          where: { orderNumber: payload.orderNumber },
        });

        if (order) {
          await prisma.order.update({
            where: { id: order.id },
            data: {
              telegramChargeId: telegram_payment_charge_id,
              transactionId: `webhook_${telegram_payment_charge_id}`,
            },
          });
          console.log(`Order ${payload.orderNumber} updated with charge ID`);
        }
      }

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
