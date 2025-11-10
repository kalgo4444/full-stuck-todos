'use client';

import BoxHeader from '@/components/layout/BoxHeader';
import CardBox from '@/components/layout/CardBox';
import { Separator } from '@/components/ui/separator';
import { todos_key1, todos_key2 } from '@/const/queryKey';
import todoService from '@/services/todos.service';
import { useQuery } from '@tanstack/react-query';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import TodoCard from './todoCard/todoCard';

const TasksPage = () => {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const uName = Cookie.get('uname');
    if (uName) setUsername(uName);
  }, []);

  const getNCtodos = useQuery({
    queryKey: [todos_key1],
    queryFn: () => todoService.getNC(username),
  });

  const getCtodos = useQuery({
    queryKey: [todos_key2],
    queryFn: () => todoService.getC(username),
  });

  return (
    <section className="w-full h-screen flex pt-20">
      <CardBox>
        <BoxHeader title="New Todos" date />
        <TodoCard data={getNCtodos.data} />
      </CardBox>
      <Separator orientation="vertical" className="h-full" />
      <CardBox>
        <BoxHeader title="Done" doneCount={getCtodos.data?.length} />
        <TodoCard data={getCtodos.data} />
      </CardBox>
    </section>
  );
};

export default TasksPage;
