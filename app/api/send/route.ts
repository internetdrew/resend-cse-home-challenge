import FailedBillingTemplate from '@emails/FailedBillingEmail';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['andrew@internetdrew.com'],
      subject: 'Looks like your payment failed',
      react: FailedBillingTemplate({ firstName: 'Jonnie' }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
