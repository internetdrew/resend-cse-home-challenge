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
│   ├── api/send/     # API endpoints
│   └── emails/       # Email templates
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

Consider a monorepo when:

- Sharing templates across multiple applications
- Need independent versioning for templates
- Want to publish templates as a package
- Have separate teams for email and app development

Consider a standard setup when:

- Building a single application
- Need quick development
- Want simpler maintenance
- Have a small team

### Step 2: Project Setup

#### Standard Setup

```bash
# Create a new Next.js project (skip if existing)
npx create-next-app@latest my-email-project

# Install dependencies
npm install resend @react-email/components
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

# Install React Email in `packages/transactional`
npm install @react-email/components
```
And add this script to run the studio:
```json
{
 "scripts": {
    "dev": "email dev"  // Enables the email preview environment
  },
}
```

### Step 3: Create Email Template
```typescript
// emails/BillingEmail.tsx (standard) or packages/transactional/emails/BillingEmail.tsx (monorepo)
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

#### Using App Router (Modern)
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

2. Send a test email:
```bash
curl -X POST http://localhost:3000/api/send
```

### See Live Email Template Changes (Monorepo)
```bash
# Navigate to transactional
cd packages/transactional

# Run the live studio
npm run dev
```
