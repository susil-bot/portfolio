import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { json } from '@remix-run/cloudflare';
import { useEffect, useState } from 'react';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import config from '~/config.json';
import styles from './contact.module.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getEnv(context) {
  return context?.cloudflare?.env || context?.env || {};
}

function getString(formData, key) {
  return String(formData.get(key) || '').trim();
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function validateMessage({ name, email, phone, notes }) {
  const errors = {};

  if (!name) errors.name = 'Please enter your name';
  if (!email) {
    errors.email = 'Please enter your email';
  } else if (!emailPattern.test(email)) {
    errors.email = 'Please enter a valid email';
  }
  if (!phone) errors.phone = 'Please enter your phone number';
  if (!notes) errors.notes = 'Please add a short note';

  return errors;
}

async function sendContactEmail({ env, message }) {
  const apiKey = env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'sobhanasusil064@gmail.com',
      reply_to: `${message.name} <${message.email}>`,
      subject: `Portfolio contact from ${message.name}`,
      html: `
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(message.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(message.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(message.phone)}</p>
        <p><strong>Notes:</strong></p>
        <p>${escapeHtml(message.notes).replace(/\n/g, '<br />')}</p>
      `,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend email failed: ${details}`);
  }
}

export async function action({ request, context }) {
  const formData = await request.formData();
  const botField = getString(formData, 'company');

  if (botField) {
    return json({ success: true });
  }

  const message = {
    name: getString(formData, 'name'),
    email: getString(formData, 'email'),
    phone: getString(formData, 'phone'),
    notes: getString(formData, 'notes'),
  };
  const errors = validateMessage(message);

  if (Object.keys(errors).length) {
    return json({ success: false, errors, values: message }, { status: 400 });
  }

  try {
    await sendContactEmail({ env: getEnv(context), message });
    return json({ success: true });
  } catch (error) {
    console.error(error);
    return json(
      {
        success: false,
        errors: {
          form:
            'Message could not be sent right now. Please email me directly or try again later.',
        },
        values: message,
      },
      { status: 500 }
    );
  }
}

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description: `Contact ${config.name} for MERN stack, React, Node.js, Next.js, GraphQL, and AWS development work.`,
  });
};

export const Contact = () => {
  const initDelay = tokens.base.durationS;
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  useEffect(() => {
    if (actionData?.values) {
      setValues(actionData.values);
    }

    if (actionData?.success) {
      setValues({ name: '', email: '', phone: '', notes: '' });
    }
  }, [actionData]);

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    setValues(currentValues => ({ ...currentValues, [name]: value }));
  };

  return (
    <Section className={styles.contact}>
      <Transition in timeout={1600}>
        {({ status, nodeRef }) => (
          <div className={styles.form} ref={nodeRef}>
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text="Contact me" start={status !== 'exited'} delay={300} />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />
            <Form method="post" className={styles.fields}>
              <input
                className={styles.botkiller}
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
              <Input
                className={styles.input}
                data-status={status}
                style={getDelay(tokens.base.durationXS, initDelay)}
                label="Name"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
                error={actionData?.errors?.name}
                required
              />
              <Input
                className={styles.input}
                data-status={status}
                style={getDelay(tokens.base.durationS, initDelay)}
                label="Mail"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                error={actionData?.errors?.email}
                required
              />
              <Input
                className={styles.input}
                data-status={status}
                style={getDelay(tokens.base.durationS, initDelay, 1.2)}
                label="Number"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={handleChange}
                error={actionData?.errors?.phone}
                required
              />
              <Input
                multiline
                className={styles.input}
                data-status={status}
                style={getDelay(tokens.base.durationM, initDelay)}
                label="Notes"
                name="notes"
                value={values.notes}
                onChange={handleChange}
                error={actionData?.errors?.notes}
                required
                maxLength={1200}
              />
              {!!actionData?.errors?.form && (
                <Text className={styles.formError} role="alert" size="s" as="p">
                  {actionData.errors.form}
                </Text>
              )}
              {!!actionData?.success && (
                <Text className={styles.formSuccess} role="status" size="s" as="p">
                  Message sent. I’ll get back to you soon.
                </Text>
              )}
              <Button
                className={styles.button}
                data-status={status}
                data-sending={isSubmitting}
                style={getDelay(tokens.base.durationM, initDelay)}
                icon="send"
                loading={isSubmitting}
                loadingText="Sending"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Form>
            <Text
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationM, initDelay)}
              size="s"
              as="p"
            >
              {config.location} · {config.phone} · {config.email}
            </Text>
          </div>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
