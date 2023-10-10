import React from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task }) => {
  const [, ref] = useDrag({
    type: 'TASK',
    item: { id: task.id, title: task.title },
  });

  return (
    <div ref={ref} className="external-drop-task">
      {task.title}
    </div>
  );
};

export default Task;
