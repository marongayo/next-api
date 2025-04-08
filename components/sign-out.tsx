'use client';

import { logout } from '@/lib/utils/actions';

export default function SignOut() {
  return (
    <form action={logout}>
      <button type="submit">Logout</button>
    </form>
  );
}
