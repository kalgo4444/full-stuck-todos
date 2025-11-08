'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useAddToggleModal } from '@/lib/useAddToggleModal';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useState } from 'react';
import AlertMessage from './AlertMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import todoService, { IPostBody } from '@/services/todos.service';
import { key_getNC } from '@/const/queryKey';
import { useCookies } from '@/hooks/useCookies';
import { toast } from 'sonner';
import { AutosizeTextarea } from '../ui/autosize-textarea';

export default function AddTaskModal() {
  const [description, setDescription] = useState<string>('');
  const [isDescError, setIsDescError] = useState<boolean>(false);
  const { isOpen, toggleModal } = useAddToggleModal();
  const queryClient = useQueryClient();
  const { username } = useCookies();

  const postMutation = useMutation({
    mutationFn: (body: IPostBody) => todoService.postTodo(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key_getNC] });
    },
  });

  const handleAddTask = (): void => {
    if (!description.trim()) {
      setIsDescError(true);
      return;
    }
    postMutation.mutate(
      { description, username },
      {
        onSuccess: () => {
          setDescription('');
          toggleModal();
          toast.success('Todo success created');
        },
        onError: () => {
          toast.error('Todo is not created, please try again');
        },
      },
    );
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your task</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <Label htmlFor="description">Description</Label>
          <AutosizeTextarea
            placeholder="Today, I need read books"
            id="description"
            className="my-2"
            minHeight={200}
            maxHeight={500}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setIsDescError(false);
            }}
          />
          {isDescError && (
            <AlertMessage
              message="description is empty"
              variant="destructive"
            />
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() => toggleModal()}
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleAddTask} type="submit">
            Add task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
