# Using Resend with Next.js

This guide will take you from 0 to email sent using Resend in your Next.js App Router-based application. In this example, we'll be sending a billing failure email to our users with information they can use to rectify the issue.

## Prerequisites

To make the most of this guide, you'll need to:

- Use Next.js' App Router
  - If you're starting from scratch, head on over to the [Next.js App Router installation instructions](https://nextjs.org/docs/app/getting-started/installation)
- [Create a Resend API key](https://resend.com/api-keys)
  - To avoid abuse, be sure to store follow best practices for secret safety.
  - [Learn about using environment variables with the App Router](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Verify your domain](https://resend.com/domains)

## Install Resend

You can install Resend using your preferred package manager:

```bash npm
npm install resend
```

```bash yarn
yarn add resend
```

```bash pnpm
pnpm add resend
```
