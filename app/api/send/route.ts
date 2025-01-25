import FailedBillingTemplate from '@/emails/FailedBillingEmail';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { firstName } = await request.json();
    
    if (!firstName) {
      return Response.json({ error: 'First name is required' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['andrew@internetdrew.com'],
      subject: 'Looks like your payment failed',
      react: FailedBillingTemplate({ firstName }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
