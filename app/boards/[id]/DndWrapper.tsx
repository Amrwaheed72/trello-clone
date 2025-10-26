'use client';

import { DndContext, rectIntersection } from '@dnd-kit/core';

export default function DndWrapper({ children, ...props }: any) {
  return (
    <DndContext
      sensors={props.sensors}
      collisionDetection={rectIntersection}
      {...props}
    >
      {children}
    </DndContext>
  );
}
