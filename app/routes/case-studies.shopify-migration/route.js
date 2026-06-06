import { caseStudies } from '~/data/case-studies';
import { CaseStudyPage } from '~/layouts/case-study';
import { baseMeta } from '~/utils/meta';
import { createElement } from 'react';

const caseStudy = caseStudies.shopifyMigration;

export const meta = () => {
  return baseMeta({
    title: caseStudy.title,
    description: caseStudy.description,
    prefix: 'Case Studies',
  });
};

export default function ShopifyMigrationCaseStudy() {
  return createElement(CaseStudyPage, { caseStudy });
}
