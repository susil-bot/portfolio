import { redirect } from '@remix-run/cloudflare';

export function loader() {
  return redirect('/');
}

export default function Articles() {
  return null;
}
