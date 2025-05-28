'use client';

import React from 'react';
import classNames from 'classnames';

interface UICardProps {
  children: React.ReactNode;
  className?: string;
}

export default function UICard({ children, className }: UICardProps) {
  return (
    <div
      className={classNames(
        'bg-white/10 backdrop-blur-md rounded-2xl shadow-md p-10 border border-white/20',
        className
      )}
    >
      {children}
    </div>
  );
}
