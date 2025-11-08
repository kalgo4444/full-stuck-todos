'use client';

import AlertMessage from '@/components/layout/AlertMessage';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Cookie from 'js-cookie';
import CustomFade from '@/components/ui/custom-fade';

const AuthPage = () => {
  const [username, setUsername] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!username.trim()) {
      setIsError(true);
      return;
    }

    Cookie.set('uname', username, { expires: 0.125, secure: true });
    router.replace(`/tasks`);
    setUsername('');
  };

  return (
    <section className="w-full h-screen grid place-items-center">
      <CustomFade>
        <form className="max-w-sm" onSubmit={handleSubmit}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-center">Enter your username</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="username">Username</Label>
              <Input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setIsError(false);
                }}
                id="username"
                name="username"
                placeholder="john123"
                className="my-2"
                required
              />
              {isError && (
                <AlertMessage
                  message="username is empty"
                  variant="destructive"
                />
              )}
            </CardContent>
            <CardFooter className="flex items-center gap-x-2">
              <Button
                type="button"
                onClick={() => router.replace('/')}
                size={'lg'}
                variant={'secondary'}
                className="w-1/2"
              >
                Home
              </Button>
              <Button type="submit" size="lg" className="w-1/2">
                Submit
              </Button>
            </CardFooter>
          </Card>
        </form>
      </CustomFade>
    </section>
  );
};

export default AuthPage;
