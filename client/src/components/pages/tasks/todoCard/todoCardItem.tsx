import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getHoursMinutes } from '@/hooks/useDate';
import todoService from '@/services/todos.service';
import { ITodo } from '@/types/todos.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { key_getC, key_getNC } from '@/const/queryKey';
import { toast } from 'sonner';
import CustomFade from '@/components/ui/custom-fade';
import { Magnetic } from '../../../../../components/motion-primitives/magnetic';

const TodoCardItem = ({ todo }: { todo: ITodo }) => {
  const queryClient = useQueryClient();

  const completedPatch = useMutation({
    mutationFn: (id: string) => todoService.pathTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key_getNC] });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: (id: string) => todoService.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key_getNC] });
    },
  });

  const handleCompletedTodo = (id: string) => {
    completedPatch.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [key_getC] });
        toast.success('Todo is completed');
      },
      onError: () => {
        toast.success('Todo is not completed, please try again');
      },
    });
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [key_getC] });
        toast.success('Todo is deleted');
      },
      onError: () => {
        toast.success('Todo is not deleted, please try again');
      },
    });
  };

  return (
    <>
      <CustomFade>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between">
                <b>{getHoursMinutes(todo.createdAt).yyyyy_mm}</b>
                <b>{getHoursMinutes(todo.createdAt).hh_mm}</b>
              </div>
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent>
            {todo.completed ? (
              <CardDescription>{todo.description}</CardDescription>
            ) : (
              <p>{todo.description}</p>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center justify-end gap-x-5">
              {!todo.completed && (
                <Magnetic intensity={0.4}>
                  <Button
                    onClick={() => handleCompletedTodo(todo._id)}
                    disabled={todo.completed}
                  >
                    make a done
                  </Button>
                </Magnetic>
              )}
              <Magnetic intensity={0.4}>
                <Button
                  onClick={() => handleDeleteTodo(todo._id)}
                  variant={'secondary'}
                >
                  Delete
                </Button>
              </Magnetic>
            </div>
          </CardFooter>
        </Card>
      </CustomFade>
    </>
  );
};

const TodoCardItemIsFetching = () => {
  const data = Array.from({ length: 8 }).fill('');
  return (
    <>
      {data.map((_, inx: number) => (
        <div
          key={inx}
          className="h-40 bg-neutral-300 dark:bg-neutral-700 animate-pulse rounded-md"
        />
      ))}
    </>
  );
};

export { TodoCardItem, TodoCardItemIsFetching };
