import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Text } from '~/components/text';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { Fragment } from 'react';
import { media } from '~/utils/style';
import styles from './case-study.module.css';

function CaseStudyMetric({ value, label }) {
  return (
    <li className={styles.metric}>
      <Heading className={styles.metricValue} level={2} as="span">
        {value}
      </Heading>
      <Text className={styles.metricLabel} secondary>
        {label}
      </Text>
    </li>
  );
}

function CaseStudyNarrativeSection({ eyebrow, title, body, index }) {
  const alternate = index % 2 === 1;

  return (
    <ProjectSection light={alternate}>
      <ProjectSectionContent width="l">
        <ProjectTextRow width="l" stretch className={styles.narrativeRow}>
          <Text className={styles.eyebrow} size="s" weight="medium">
            {eyebrow}
          </Text>
          <ProjectSectionHeading>{title}</ProjectSectionHeading>
          {body.map(paragraph => (
            <ProjectSectionText key={paragraph}>{paragraph}</ProjectSectionText>
          ))}
        </ProjectTextRow>
      </ProjectSectionContent>
    </ProjectSection>
  );
}

export function CaseStudyPage({ caseStudy }) {
  return (
    <Fragment>
      <ProjectContainer className={styles.caseStudy}>
        <ProjectBackground opacity={0.82} {...caseStudy.hero} />
        <ProjectHeader
          title={caseStudy.title}
          description={caseStudy.description}
          linkLabel={caseStudy.linkLabel}
          url={caseStudy.url}
          roles={caseStudy.roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionColumns centered className={styles.overview}>
            <ProjectImage
              {...caseStudy.preview}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 55vw`}
            />
            <ul className={styles.metrics} aria-label="Case study results">
              {caseStudy.metrics.map(metric => (
                <CaseStudyMetric key={metric.label} {...metric} />
              ))}
            </ul>
          </ProjectSectionColumns>
        </ProjectSection>
        {caseStudy.sections.map((section, index) => (
          <CaseStudyNarrativeSection
            key={section.title}
            index={index}
            {...section}
          />
        ))}
        <ProjectSection>
          <ProjectSectionContent width="m">
            <ProjectTextRow stretch>
              <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
              <ul className={styles.outcomes}>
                {caseStudy.outcomes.map(outcome => (
                  <li className={styles.outcome} key={outcome}>
                    <ProjectSectionText>{outcome}</ProjectSectionText>
                  </li>
                ))}
              </ul>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light padding="top">
          <ProjectSectionContent>
            <Image
              {...caseStudy.preview}
              reveal
              sizes={`(max-width: ${media.mobile}px) 560px, (max-width: ${media.tablet}px) 760px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}
