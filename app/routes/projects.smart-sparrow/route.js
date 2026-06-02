import { redirect } from '@remix-run/cloudflare';

export const loader = () => redirect('/#project-1');

export default function ProjectRedirect() {
  return null;
}
