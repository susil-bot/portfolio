import commonPlaceholder from '~/assets/common-placeholder.jpg';
import braingenie from '~/assets/braingenie.jpg';
import chatpage from '~/assets/chat-page.jpg';
import cloudspace from '~/assets/cloud-space.jpg';
import ecomn8n from '~/assets/ecom-n8n.png';
import shopifymigration from '~/assets/shopify-migration.jpg';

export const projectSummaries = [
  {
    id: 'project-1',
    title: 'DocMind — AI-Powered Document Q&A',
    description:
      'RAG-based application that lets users upload documents and query them using natural language. Built with MongoDB Atlas Vector Search, LangChain, and OpenAI — semantic retrieval feeds grounded context to the LLM for accurate responses.',
    buttonText: 'View project',
    buttonLink: 'https://github.com/sobhanasusil',
    model: {
      type: 'phone',
      alt: 'DocMind AI document Q&A interface',
      textures: [
        {
          srcSet: `${cloudspace} 375w, ${cloudspace} 750w`,
          placeholder: commonPlaceholder,
        },
        {
          srcSet: `${chatpage} 1280w, ${chatpage} 2560w`,
          placeholder: commonPlaceholder,
        },
      ],
    },
  },
  {
    id: 'project-2',
    alternate: true,
    title: 'E-Commerce Workflow Automation — N8n',
    description:
      'End-to-end order automation covering checkout confirmation, invoice generation, refund handling, payment mandate follow-ups, AI-powered product recommendations, and custom business reports — built on N8n with Gmail, Codex, and webhooks.',
    buttonText: 'Read case study',
    buttonLink: '/case-study/ecom-automation',
    model: {
      type: 'laptop',
      alt: 'N8n e-commerce automation workflow screens',
      textures: [
        {
          srcSet: `${ecomn8n} 375w, ${ecomn8n} 750w`,
          placeholder: commonPlaceholder,
        }
      ],
    },
  },
  {
    id: 'project-3',
    title: 'E-Commerce Migration — Legacy Stack to Shopify',
    description:
      "Led end-to-end migration of a client's legacy e-commerce platform to Shopify. Reduced annual infrastructure costs from $20,000 to $8,000 — a 60% saving — with zero downtime cutover and full SEO URL preservation via 301 redirects.",
    buttonText: 'Read case study',
    buttonLink: '/case-studies/shopify-migration',
    model: {
      type: 'laptop',
      alt: 'Shopify e-commerce migration case study',
      textures: [
        {
          srcSet: `${shopifymigration} 800w, ${shopifymigration} 1920w`,
          placeholder: commonPlaceholder,
        },
      ],
    },
  },
  {
    id: 'project-4',
    alternate: true,
    title: 'Client Website — Brain Genie',
    description:
      "[Describe what the website does, who it's for, and what you built. E.g: Designed and developed a full business website for a Chennai-based logistics company — including service pages, enquiry form, and CMS integration. Live since 2024.]",
    buttonText: 'View live site',
    buttonLink: 'https://braingeniehub.com/',
    model: {
      type: 'laptop',
      alt: 'Client website built by Sobhana Susil',
      textures: [
        {
          srcSet: `${braingenie} 1280w, ${braingenie} 2560w`,
          placeholder: commonPlaceholder,
        },
      ],
    },
  },
];
