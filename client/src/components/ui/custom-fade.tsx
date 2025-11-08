import React from 'react';
import { Fade, FadeProps } from 'react-awesome-reveal';

export default function CustomFade({
  children,
  fade,
  className,
}: {
  children: React.ReactNode;
  fade?: FadeProps;
  className?: string;
}) {
  return (
    <Fade duration={500} fraction={0} {...fade} className={className}>
      {children}
    </Fade>
  );
}
