# Using Resend with Next.js

This guide will take you from 0 to email sent using Resend in your Next.js App Router-based application. In this example, we'll be sending a billing failure email to our users with information they can use to rectify the issue.

## Prerequisites

To make the most of this guide, you'll need to:

- Use Next.js' App Router
  - If you're starting from scratch, head on over to the [Next.js App Router installation instructions](https://nextjs.org/docs/app/getting-started/installation)
- [Create a Resend API key](https://resend.com/api-keys)
  - To avoid abuse, be sure to store follow best practices for secret safety.
  - Learn about using environment variables with the [App Router](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) and [Pages Router](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
- [Verify your domain](https://resend.com/domains)
  - If you have trouble getting your domain verified, be sure to visit documentation for your provider, as they may have specific instructions for adding DKIM and SPF records.

## Install Resend and React Email

You can install Resend and React Email using your preferred package manager:

```bash npm
npm install resend @react-email/components
```

```bash yarn
yarn add resend @react-email/components
```

```bash pnpm
pnpm add resend @react-email/components
```

## Create a Workspace for Your Emails

Create your email template in `app/components` if using the App Router or `src/components` using the Pages Router.

Create an API file under `pages/api/send.ts` if you’re using the Pages Router or create a route file under `app/api/send/route.ts` if you’re using the App Router.
