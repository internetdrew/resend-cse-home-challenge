import FailedBillingTemplate from '@/emails/FailedBillingEmail';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { firstName } = await request.json();

    if (!firstName) {
      return Response.json(
        { error: 'First name is required' },
        { status: 400 }
      );
    }

    const filepath = path.join(
      process.cwd(),
      'public',
      'attachments',
      'hello.txt'
    );
    const attachment = fs.readFileSync(filepath).toString('base64');

    const { data, error } = await resend.emails.send({
      from: 'info@updates.internetdrew.com',
      to: ['andrew@internetdrew.com'],
      subject: `${firstName} - Your Payment Failed`,
      react: FailedBillingTemplate({ firstName }),
      attachments: [
        {
          filename: 'hello.txt',
          content: attachment,
        },
      ],
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
