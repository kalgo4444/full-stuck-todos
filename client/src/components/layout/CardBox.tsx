import React from 'react';

export default function CardBox({ children }: { children: React.ReactNode }) {
  return <div className="w-1/2 p-5">{children}</div>;
}
