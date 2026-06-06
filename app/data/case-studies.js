import commonplaceholder from '~/assets/common-placeholder.jpg';
import ecomn8n from '~/assets/ecom-n8n.png';
import shopifymigration from '~/assets/shopify-migration.jpg';

export const caseStudies = {
  ecomAutomation: {
    title: 'E-Commerce Workflow Automation — n8n',
    description:
      'An automation case study covering order communication, refunds, payment follow-ups, reporting, and AI-assisted product recommendations.',
    linkLabel: 'Back to projects',
    url: '/#project-2',
    roles: ['Workflow Architecture', 'API Integration', 'AI Automation'],
    hero: {
      src: ecomn8n,
      srcSet: `${ecomn8n} 1280w, ${ecomn8n} 2560w`,
      width: 1280,
      height: 800,
      placeholder: commonplaceholder,
    },
    preview: {
      srcSet: `${ecomn8n} 375w, ${ecomn8n} 750w`,
      width: 375,
      height: 812,
      placeholder: commonplaceholder,
      alt: 'E-commerce automation workflow preview.',
    },
    metrics: [
      { value: '6+', label: 'commerce workflows automated' },
      { value: '24/7', label: 'event-driven customer follow-up' },
      { value: 'AI', label: 'recommendations and reporting support' },
    ],
    sections: [
      {
        eyebrow: 'Challenge',
        title: 'Manual order operations were slowing the business down',
        body: [
          'The commerce workflow had too many repetitive handoffs: confirmation emails, invoices, refunds, payment mandate reminders, product follow-ups, and internal reporting all depended on manual effort.',
          'The architectural goal was to make each business event trigger the right downstream action while keeping the workflow understandable for future changes.',
        ],
      },
      {
        eyebrow: 'Architecture',
        title: 'Composable workflows around clear business events',
        body: [
          'I modelled the system around events such as order placed, payment pending, refund requested, and report scheduled. Each automation owns one responsibility and communicates through explicit payloads.',
          'N8n became the orchestration layer, connecting Gmail, webhooks, AI-assisted recommendations, and reporting logic without hardcoding everything into one brittle script.',
        ],
      },
      {
        eyebrow: 'Execution',
        title: 'Automation that remains easy to inspect and extend',
        body: [
          'The workflows were built with visible checkpoints, retry-friendly actions, and clear notification paths so operational failures are easier to diagnose.',
          'AI steps are isolated from transactional steps, which keeps recommendations and report generation flexible without risking core order communication.',
        ],
      },
    ],
    outcomes: [
      'Reduced manual follow-up across order, refund, and payment workflows.',
      'Created a more scalable automation foundation for adding new commerce events.',
      'Separated AI-assisted tasks from critical transactional messaging to reduce operational risk.',
    ],
  },
  shopifyMigration: {
    title: 'E-Commerce Migration — Legacy Stack to Shopify',
    description:
      'A migration case study focused on lowering infrastructure cost, protecting search visibility, and moving a live commerce operation without downtime.',
    linkLabel: 'Back to projects',
    url: '/#project-3',
    roles: ['Technical Architecture', 'Platform Migration', 'SEO Preservation'],
    hero: {
      src: shopifymigration,
      srcSet: `${shopifymigration} 1280w, ${shopifymigration} 2560w`,
      width: 1280,
      height: 800,
      placeholder: commonplaceholder,
    },
    preview: {
      srcSet: `${shopifymigration} 800w, ${shopifymigration} 1920w`,
      width: 800,
      height: 500,
      placeholder: commonplaceholder,
      alt: 'E-commerce storefront migration preview.',
    },
    metrics: [
      { value: '60%', label: 'annual infrastructure saving' },
      { value: '$12k', label: 'yearly cost reduction' },
      { value: '0', label: 'downtime during cutover' },
    ],
    sections: [
      {
        eyebrow: 'Challenge',
        title: 'A costly platform with fragile operational workflows',
        body: [
          'The legacy commerce stack was expensive to host and hard to maintain. Infrastructure, deployment, and support overhead were pulling attention away from product improvement.',
          'The core architectural risk was migration complexity: product data, URLs, checkout behaviour, and SEO signals all had to survive the move without interrupting live customers.',
        ],
      },
      {
        eyebrow: 'Architecture',
        title: 'A migration plan built around stable contracts',
        body: [
          'I separated the migration into data, routing, storefront, and launch workstreams. Each workstream had clear validation checkpoints so the project was not coupled to one risky final release.',
          'Product, collection, customer-facing URL, and redirect mapping were treated as explicit contracts. That made the Shopify build easier to test and reduced ambiguity during stakeholder review.',
        ],
      },
      {
        eyebrow: 'Execution',
        title: 'Zero-downtime launch with SEO continuity',
        body: [
          'The cutover used a staged Shopify setup with pre-launch data validation, storefront QA, payment checks, DNS readiness, and post-launch monitoring.',
          'Legacy URLs were preserved through 301 redirects so returning customers and search engines landed on the right Shopify pages after launch.',
        ],
      },
    ],
    outcomes: [
      'Reduced annual infrastructure cost from $20,000 to $8,000.',
      'Moved the business onto a managed commerce platform with lower operational maintenance.',
      'Protected search visibility with mapped redirects and URL-preservation planning.',
    ],
  },
};
