// src/components/TaskItem.js
import React from 'react';

function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
    return (
        <div className={`flex justify-between items-center p-4 bg-gray-200 rounded ${task.status === 'complete' ? 'bg-green-100' : ''}`}>
            <div>
                <p className="text-sm text-gray-600">ID: {task.id}</p> {/* Displaying the task ID here */}
                <h3 className="font-semibold">{task.title}</h3>
                <p>{task.description}</p>
            </div>
            <div className="flex space-x-2">
                <button onClick={onToggleComplete} className="px-2 py-1 text-sm text-white bg-blue-500 rounded">
                    {task.status === 'complete' ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button onClick={() => onEdit(task)} className="px-2 py-1 text-sm text-white bg-yellow-500 rounded">
                    Edit
                </button>
                <button onClick={() => onDelete(task.id)} className="px-2 py-1 text-sm text-white bg-red-500 rounded">
                    Delete
                </button>
            </div>
        </div>

    );
}

export default TaskItem;
