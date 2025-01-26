# Andrew Rowley's CSE Take Home Challenge

## Tutorial

### Overview

This tutorial demonstrates how to send transactional emails using Resend and React Email in Next.js. You'll learn how to:

1. Set up your project structure
2. Create email templates
3. Implement API endpoints
4. Send emails using Resend

### Prerequisites

To make the most of this guide, you'll need to:

- [Create a Resend API key](https://resend.com/api-keys)
  - To avoid abuse, be sure to store follow best practices for secret safety.
  - Learn about using environment variables with the [App Router](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) and [Pages Router](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
- [Verify your domain](https://resend.com/domains)
  - If you have trouble getting your domain verified, be sure to visit documentation for your provider, as they may have specific instructions for adding DKIM and SPF records.

### Step 1: Choose Your Project Structure

#### Standard Structure

Best for single applications and quick prototypes:

```bash
my-nextjs-app/
├── app/
│   ├── api/send/   # API endpoints 
├── emails/         # Email templates
├── package.json
└── ... other Next.js files
```

#### Monorepo Structure

Best for sharing templates across multiple projects:

```bash
my-nextjs-app/
├── app/
│   └── api/send/     # API endpoints
├── packages/
│   └── transactional/
│       ├── emails/   # Shared email templates
│       └── package.json
├── package.json
└── ... other Next.js files
```

Consider a standard setup when:

- Building a single application
- Need quick development
- Want simpler maintenance
- Have a small team

Consider a monorepo when:

- Sharing templates across multiple applications
- Need independent versioning for templates
- Want to publish templates as a package
- Have separate teams for email and app development

> **Important:** When you run your email studio, it will look for an `emails` directory at the same level as your `package.json` file.

### Step 2: Project Setup

#### Standard Setup

```bash
# Create a new Next.js project (skip if existing)
npx create-next-app@latest my-email-project

# Install dependencies
npm install react-email -D -E
npm install @react-email/components react react-dom -E
```

#### Monorepo Setup

```bash
# Create a new Next.js project (skip if existing)
npx create-next-app@latest my-email-project

#Install resend at the root of the app
npm install resend

# Create email package
mkdir -p packages/transactional
cd packages/transactional
npm init -y

# Install React Email
npm install react-email -D -E
npm install @react-email/components react react-dom -E
```
And add this script to run the studio in the relevant `package.json` file:
```json
{
 "scripts": {
    "studio": "email dev"
  },
}
```

### Step 3: Create Email Template
```typescript
/*
app/emails/BillingEmail.tsx (standard) 
or packages/transactional/emails/BillingEmail.tsx (monorepo)
*/
import { Html, Button, Head, Body } from '@react-email/components';

type BillingEmailProps = {
 readonly firstName: string;
};

export default function BillingEmail({ firstName }: BillingEmailProps) {
  return (
    <Html>
      <Head />
      <Body>
        <h1>Hello, {firstName}!</h1>
        <p>Your billing information needs attention.</p>
        <Button href="https://dashboard.example.com/billing">
          Update Billing
        </Button>
      </Body>
    </Html>
  );
}
```

### Step 4: Implement API Endpoint

#### Using App Router
```typescript
// app/api/send/route.ts
import { Resend } from 'resend';
import BillingEmail from '@/emails/BillingEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'billing@yourdomain.com',
      to: ['user@example.com'],
      subject: 'Billing Update Required',
      react: BillingEmail({ firstName: 'Jonnie' }),
    });

    if (error) return Response.json({ error }, { status: 500 });
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
```

#### Using Pages Router
```typescript
// pages/api/send.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import BillingEmail from '@/emails/BillingEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'billing@yourdomain.com',
      to: ['user@example.com'],
      subject: 'Billing Update Required',
      react: BillingEmail({ firstName: 'John' }),
    });

    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
```

### Step 5: Environment Setup

1. Create a `.env` file:
```bash
RESEND_API_KEY=re_123...  # Your Resend API key
```

2. For production, add the environment variable to your hosting platform (Vercel, etc.)

### Testing
1. Start your development server:
```bash
npm run dev
```

2. Start your email studio:
```bash
npm run studio
```

3. Send a test email:
```bash
curl -X POST http://localhost:3000/api/send
```

### See Live Email Template Changes (Monorepo)
```bash
# Navigate to transactional
cd packages/transactional

# Run the live studio
npm run studio
```

This should point you to either `http://localhost:3000` or `http://localhost:3001` if your frontend is already running on 3000.

## Customer Tickets

| Ticket | Message | Label | Priority | Response | Internal Notes |
| ------ | ------- | ----- | -------- | -------- | -------------- |
| RES-7921 | My emails suddenly stopped sending last night for 4 hours and thousands of magic links didn’t send. What happened? This is unacceptable. | N/A | 1 | N/A | N/A |
| RES-2196 | My emails are going to the spam folder at Gmail. What can I do to stop this? | N/A | 2 | N/A | N/A |
| RES-3485 | When I send a request to trigger a notification, I get an error message in the system. The user does not receive the email, and the system displays an error message: ”Too many requests. You can only make 2 requests per second. See rate limit response headers for more information. Or contact support to increase rate limit.” | N/A | 3 | N/A | N/A |
| RES-5842 | I need to be able to receive emails from Resend. How do I do that? | N/A | 4 | N/A | N/A |
| RES-1927 | I’m not sure how to add the TXT record at Vercel. Can you tell me how? | N/A | 5 | N/A | N/A |
| RES-2984 | How do i create an email? | N/A | 6 | N/A | N/A |
| RES-1348 | How do I migrate from Sendgrid?| N/A | 7 | N/A | N/A |