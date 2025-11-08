'use client';

import Cookies from 'js-cookie';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { useCookies } from '@/hooks/useCookies';

export default function Avatar() {
  const router = useRouter();
  const { username } = useCookies();

  const handleLogOut = (): void => {
    Cookies.remove('uname');
    router.replace('/');
    window.location.reload();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="size-11 bg-accent grid place-items-center rounded-full">
            {username?.split('')[0]}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className="text-center text-sm p-2">{username}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.replace('/')}
          >
            Home
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
