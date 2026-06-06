import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { skillGroups } from '~/data/skills';
import { useState } from 'react';
import styles from './about.module.css';

function SkillGroup({ title, skills, visible }) {
  return (
    <li className={styles.skillGroup}>
      <Text className={styles.skillTitle} data-visible={visible} weight="medium">
        {title}
      </Text>
      <ul className={styles.skills}>
        {skills.map(skill => (
          <li className={styles.skill} data-visible={visible} key={skill}>
            {skill}
          </li>
        ))}
      </ul>
    </li>
  );
}

export function About({ id, visible, sectionRef }) {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.about}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible }) => (
          <div className={styles.content}>
            <div className={styles.copy}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About
                </div>
              </div>
              <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
                <DecoderText text="About me" start={visible} delay={300} />
              </Heading>
              <Text className={styles.description} data-visible={visible} size="l" as="p">
                I build full-stack products across MERN, AI integrations, workflow
                automation, and cloud delivery. My work is strongest where product
                thinking meets practical engineering: clear data models, reliable APIs,
                fast interfaces, and automation that removes repeated manual effort.
              </Text>
              <Text className={styles.description} data-visible={visible} size="l" as="p">
                Recently I’ve focused on RAG-based document Q&A, N8n commerce
                automation, Shopify migration, AWS deployments, and production-ready
                React experiences.
              </Text>
            </div>
            <div className={styles.skillPanel} aria-label="Technical skills">
              <ul className={styles.skillGroups}>
                {skillGroups.map(group => (
                  <SkillGroup key={group.title} visible={visible} {...group} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}
