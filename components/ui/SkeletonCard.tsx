import React from 'react';
import { Card } from './Card';
import { cn } from './Button';

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-white/5 rounded-md", className)} />
);

const SkeletonCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("p-6 space-y-4", className)} hover={false}>
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="h-32 w-full rounded-xl" />
    </Card>
  );
};

export { Skeleton, SkeletonCard };
