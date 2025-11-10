'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import Avatar from '../ui/avatar';
import { useAddToggleModal } from '@/lib/useAddToggleModal';
import { Magnetic } from '../ui/magnetic';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleModal } = useAddToggleModal();

  return (
    <header className="w-full h-20 fixed top-0 left-0 p-2">
      <nav className="w-full h-full bg-card text-card-foreground rounded-xl border shadow-sm flex items-center justify-between px-10">
        <h1
          onClick={() => router.push('/')}
          className="text-2xl font-extrabold cursor-pointer"
        >
          KalgoTodos.
        </h1>
        {}
        {pathname === '/' && (
          <Magnetic intensity={0.4}>
            <Button onClick={() => router.push('/tasks')} size={'lg'}>
              Make a task
            </Button>
          </Magnetic>
        )}
        {pathname === '/tasks' && (
          <div className="flex items-center space-x-5">
            <Magnetic intensity={0.4}>
              <Button onClick={() => toggleModal()} size={'lg'}>
                Add Task
              </Button>
            </Magnetic>
            <Avatar />
          </div>
        )}
      </nav>
    </header>
  );
}
