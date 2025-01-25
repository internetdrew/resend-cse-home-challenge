import React from 'react';
import { Html, Button, Head, Body } from '@react-email/components';

type FailedBillingTemplateProps = {
  readonly firstName: string;
};

const FailedBillingTemplate = ({
  firstName = 'Customer',
}: FailedBillingTemplateProps) => {
  return (
    <Html lang='en'>
      <Head>
        <title>Failed Billing</title>
      </Head>
      <Body>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          {firstName}, it looks like your payment failed
        </h1>
        <p>
          We've noticed that your payment has failed. Please update your payment
          information and try again.
        </p>
        <p>
          This email was sent from{' '}
          <strong>Andrew's Resend CSE Home Challenge</strong>.
        </p>
        <p>Check out the repo here:</p>
        <Button
          href='https://github.com/internetdrew/resend-cse-home-challenge'
          style={{
            color: '#fff',
            padding: '10px 20px',
            backgroundColor: '#000',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          View the repo
        </Button>
      </Body>
    </Html>
  );
};

export default FailedBillingTemplate;
