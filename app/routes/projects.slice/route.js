import { redirect } from '@remix-run/cloudflare';

export const loader = () => redirect('/#project-3');

export default function ProjectRedirect() {
  return null;
}
