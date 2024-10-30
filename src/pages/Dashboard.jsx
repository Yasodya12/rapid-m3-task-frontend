import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {loginSuccess} from "../auth/authSlice";

export function Dashboard() {

    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const [selectedStatus, setSelectedStatus] = useState('');



    const fetchTasks = async () => {

// Fetch tasks from the server

        try {
            const response = await fetch('http://localhost:8081/tasks', {

                method:'GET',
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJleGFtcGxlQGV4YW1wbGUuY29tIiwidXNlck5hbWUiOiJqb2huX2RvZSIsInJvbGUiOlsiQURNSU4iXSwiZXhwIjoxNzMwMzYwNDk5fQ.JGl0sALsuKKqDTJ9UHhBovkXJXktXKlVqS4UdjMiEBw`, // Use 'Bearer' followed by a space and your token
                    'Content-Type': 'application/json' // Optional, set based on your API needs
                }
                // Since you are not sending any body, you can skip the 'body' field
            });

            if (!response.ok) throw new Error('Failed to fetch tasks: ' + response.statusText);

            const data = await response.json();

            setTasks(data); // Update tasks state with fetched data
        } catch (err) {
            console.error('Fetch error:', err); // Log the full error
            setError(err.message); // Update error state with error message
        }
    };

    const fetchSearchedTasks = async (status) => {
        try {
            const response = await fetch(`http://localhost:8081/tasks/${status}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJleGFtcGxlQGV4YW1wbGUuY29tIiwidXNlck5hbWUiOiJqb2huX2RvZSIsInJvbGUiOlsiQURNSU4iXSwiZXhwIjoxNzMwMzYwNDk5fQ.JGl0sALsuKKqDTJ9UHhBovkXJXktXKlVqS4UdjMiEBw`, // Use 'Bearer' followed by a space and your token
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Failed to fetch tasks: ' + response.statusText);

            const data = await response.json();
            setTasks(data); // Update tasks state with fetched data
        } catch (err) {
            console.error('Fetch error:', err); // Log the full error
            setError(err.message); // Update error state with error message
        }
    };

    useEffect(() => {
        fetchTasks(); // Fetch tasks when component mounts
    }, []);


    // Add or Update a Task
    const saveTask = async (task) => {

        try {
            const response = await fetch('http://localhost:8081/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error('Login . Please check your credentials.');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            // Redirect to the dashboard on successful login

            // Handle successful login, e.g., save token or redirect
        } catch (err) {
            setError(err.message); // Set error message if login fails
        }
    };

    // Delete a Task
    const deleteTask = async (id) => {
        console.log(id)
        try {
            const response = await fetch(`http://localhost:8081/tasks/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Fail to Delete.');
            }


            // Redirect to the dashboard on successful login

            // Handle successful login, e.g., save token or redirect
        } catch (err) {
            console.log("eroorrrr")
            setError(err.message); // Set error message if login fails
        }
    };
    // Function to handle search input change
    const handleStatusChange = (event) => {
        const status = event.target.value;
        setSelectedStatus(status);

        // Call fetchSearchedTasks when "Complete" or "Incomplete" is selected
        if (status === 'COMPLETE' || status === 'INCOMPLETE') {
            console.log("inside complete or not")
            fetchSearchedTasks(status);
        } else {
            fetchTasks(); // Call fetchTasks when "All" is selected
        }
    };
    const filteredTasks = tasks.filter(task => {
        if (selectedStatus === '') return true; // Show all tasks if no status is selected
        return task.status === selectedStatus; // Match status
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {/* Radio buttons for filtering tasks by status */}
            <div className="mb-4">
                <span className="font-medium">Filter by status:</span>
                <div className="flex items-center">
                    <label className="mr-4">
                        <input
                            type="radio"
                            value=""
                            checked={selectedStatus === ''}
                            onChange={handleStatusChange}
                        />
                        All
                    </label>
                    <label className="mr-4">
                        <input
                            type="radio"
                            value="COMPLETE"
                            checked={selectedStatus === 'COMPLETE'}
                            onChange={handleStatusChange}
                        />
                        Complete
                    </label>
                    <label className="mr-4">
                        <input
                            type="radio"
                            value="INCOMPLETE"
                            checked={selectedStatus === 'INCOMPLETE'}
                            onChange={handleStatusChange}
                        />
                        Incomplete
                    </label>
                </div>
            </div>
            <TaskForm onSave={saveTask} editingTask={editingTask} />
            <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={deleteTask} onToggleComplete={saveTask} />
        </div>
    )
}