import React from 'react';
import { Html, Head, Body } from '@react-email/components';

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
          We&apos;ve noticed that your payment has failed. Please update your
          payment information and try again.
        </p>
        <p>
          This email was sent from{' '}
          <strong>Andrew&apos;s Resend CSE Home Challenge</strong>.
        </p>
        <p>
          Included in this email is a link to the Resend CSE Home Challenge
          tutorial repo, my responses to customer tickets, and a Loom of a bug I
          found while going through this process.
        </p>
        <p>
          If you have any questions, please contact me at{' '}
          <a href='mailto:andrew@internetdrew.com'>andrew@internetdrew.com</a>.
        </p>
        <p>Here are some links to help you:</p>
        <ul>
          <li>
            <a href='https://github.com/internetdrew/resend-cse-home-challenge'>
              View the tutorial repo
            </a>
          </li>
          <li>
            <a href='https://andrewofnewyork.notion.site/Resend-CSE-Take-Home-Challenge-Customer-Tickets-187ffd770e1c80d8853cf05099f7cec1'>
              See my customer ticket responses
            </a>
          </li>
          <li>
            <a href='https://www.loom.com/share/f3880b36f9e44b64babee286b6eca789?sid=d2046e9c-9ce5-4409-bbec-933f865d8455'>
              See the Loom of a bug I found
            </a>
          </li>
        </ul>
      </Body>
    </Html>
  );
};

export default FailedBillingTemplate;
