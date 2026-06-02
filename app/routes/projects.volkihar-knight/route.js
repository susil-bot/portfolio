import { redirect } from '@remix-run/cloudflare';

export const loader = () => redirect('/#details');

export default function ProjectRedirect() {
  return null;
}
