import { ITodo } from '@/types/todos.interface';
import { TodoCardItem, TodoCardItemIsFetching } from './todoCardItem';
import { InfoIcon } from 'lucide-react';

interface IProps {
  data: ITodo[] | undefined;
}

const TodoCard = (props: IProps) => {
  const { data } = props;
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {!data ? (
          <TodoCardItemIsFetching />
        ) : (
          data.map((todo) => <TodoCardItem key={todo._id} todo={todo} />)
        )}
      </div>
      {data && !data?.length && (
        <div className="w-full h-[60vh] grid place-items-center">
          <div className="flex flex-col items-center gap-y-5">
            <InfoIcon size={64} />
            <div>You do not have any todos</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
