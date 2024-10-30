// src/components/TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
    return (
        <div className="space-y-2">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleComplete={() => onToggleComplete({ ...task, status: task.status === 'complete' ? 'incomplete' : 'complete' })}
                />
            ))}
        </div>
    );
}

export default TaskList;
