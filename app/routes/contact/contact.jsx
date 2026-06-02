import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import config from '~/config.json';
import styles from './contact.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description: `Contact ${config.name} for MERN stack, React, Node.js, Next.js, GraphQL, and AWS development work.`,
  });
};

export const Contact = () => {
  const initDelay = tokens.base.durationS;

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
            <Text
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay)}
              size="l"
              as="p"
            >
              I’m available for MERN stack, React, Node.js, Next.js, GraphQL, AWS,
              Docker, and CI/CD development work.
            </Text>
            <div
              className={styles.contactLinks}
              data-status={status}
              style={getDelay(tokens.base.durationS, initDelay)}
            >
              <Button href={`mailto:${config.email}`} icon="send">
                Email me
              </Button>
              <Button
                secondary
                href={`https://www.linkedin.com/in/${config.linkedin}/`}
                icon="link"
              >
                LinkedIn
              </Button>
              <Button secondary href={`https://github.com/${config.github}`} icon="github">
                GitHub
              </Button>
              {/* <Button secondary href={config.resume} icon="link">
                Resume
              </Button> */}
            </div>
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
