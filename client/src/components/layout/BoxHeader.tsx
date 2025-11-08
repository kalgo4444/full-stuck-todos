'use client';

import { useEffect, useState } from 'react';
import { Separator } from '../ui/separator';
import { getMonthYear } from '@/hooks/useDate';

interface IProps {
  title: string;
  date?: boolean;
  doneCount?: number | string;
}

export default function BoxHeader({ title, date, doneCount }: IProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-extrabold">{title}</h2>
        {date && (
          <div className="text-xl font-bold">{getMonthYear(currentDate)}</div>
        )}
        {!doneCount ||
          (doneCount !== 0 && (
            <div className="text-xl font-bold">
              Completed Todos: {doneCount}
            </div>
          ))}
      </div>
      <Separator className="w-full" />
    </div>
  );
}
