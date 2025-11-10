'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import CustomFade from '@/components/ui/custom-fade';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  username: z
    .string('Must be string')
    .min(1, 'username is required')
    .lowercase('username is to be lowercase'),
});

type User = z.infer<typeof formSchema>;

const AuthPage = () => {
  const router = useRouter();

  const form = useForm<User>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(user: User) {
    Cookie.set('uname', user.username);
    router.replace('/tasks');
    form.reset();
  }

  return (
    <section className="w-full h-screen grid place-items-center">
      <CustomFade>
        <Card className="max-w-sm">
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg" htmlFor="username">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john_123"
                          {...field}
                          id="username"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </CustomFade>
    </section>
  );
};

export default AuthPage;
