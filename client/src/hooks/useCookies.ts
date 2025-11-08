'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';

export const useCookies = () => {
  const [username, setUsername] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    const u = Cookies.get('uname');
    if (u) setUsername(u);
  }, [pathname]);

  return { username };
};
