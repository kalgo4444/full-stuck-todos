'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {} from '@hookform/resolvers';

import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { useAddToggleModal } from '@/lib/useAddToggleModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import todoService, { IPostBody } from '@/services/todos.service';
import { todos_key1, todos_key2 } from '@/const/queryKey';
import { useCookies } from '@/hooks/useCookies';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { Button } from '../ui/button';

const formSchema = z.object({
  description: z.string('Must be string').min(1, 'Description is required'),
});

type Description = z.infer<typeof formSchema>;

export default function AddTaskModal() {
  const { isOpen, toggleModal } = useAddToggleModal();
  const queryClient = useQueryClient();
  const { username } = useCookies();

  const form = useForm<Description>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  });

  const postMutation = useMutation({
    mutationFn: (body: IPostBody) => todoService.postTodo(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [todos_key1] });
    },
  });

  function AddTaskSubmit({ description }: Description) {
    postMutation.mutate(
      { description, username },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [todos_key2] });
          form.reset();
          toggleModal();
        },
      },
    );
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <div>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(AddTaskSubmit)}
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="desc">Description</FormLabel>
                    <FormControl>
                      <AutosizeTextarea
                        minHeight={200}
                        maxHeight={500}
                        id="desc"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" onClick={toggleModal} variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
