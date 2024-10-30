// src/components/TaskForm.js
import React, { useEffect, useState } from 'react';

function TaskForm({ onSave, editingTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('INCOMPLETE');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setStatus(editingTask.status);
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ id: editingTask?.id, title, description, status });
        setTitle('');
        setDescription('');
        setStatus('INCOMPLETE');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 border rounded"
            />
            <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-2 border rounded"
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border rounded">
                <option value="INCOMPLETE">Incomplete</option>
                <option value="COMPLETE">Complete</option>
            </select>
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded">
                {editingTask ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
}

export default TaskForm;
