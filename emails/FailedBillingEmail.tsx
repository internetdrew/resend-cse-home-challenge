import React from 'react';
import { Html, Head, Body, Text, Link } from '@react-email/components';

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
        <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>
          {firstName}, it looks like your payment failed
        </Text>
        <Text>
          We&apos;ve noticed that your payment has failed. Please update your
          payment information and try again.
        </Text>
        <Text>
          This email was sent from{' '}
          <strong>Andrew&apos;s Resend CSE Home Challenge</strong>.
        </Text>
        <Text>
          Included in this email is a link to the Resend CSE Home Challenge
          tutorial repo, my responses to customer tickets, and a Loom of a bug I
          found while going through this process.
        </Text>
        <Text>
          If you have any questions, please contact me at{' '}
          <Link href='mailto:andrew@internetdrew.com'>
            andrew@internetdrew.com
          </Link>
          .
        </Text>
        <Text>Here are some links to help you:</Text>
        <ul>
          <li>
            <Link
              href='https://github.com/internetdrew/resend-cse-home-challenge'
              target='_blank'
              rel='noreferrer noopener'
            >
              View the tutorial repo
            </Link>
          </li>
          <li>
            <Link
              href='https://andrewofnewyork.notion.site/Resend-CSE-Take-Home-Challenge-Customer-Tickets-187ffd770e1c80d8853cf05099f7cec1'
              target='_blank'
              rel='noreferrer noopener'
            >
              See my customer ticket responses
            </Link>
          </li>
          <li>
            <Link
              href='https://www.loom.com/share/f3880b36f9e44b64babee286b6eca789?sid=d2046e9c-9ce5-4409-bbec-933f865d8455'
              target='_blank'
              rel='noreferrer noopener'
            >
              See the Loom of a Resend bug I found
            </Link>
          </li>
        </ul>
      </Body>
    </Html>
  );
};

export default FailedBillingTemplate;
