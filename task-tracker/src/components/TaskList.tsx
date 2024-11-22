import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { Task, TaskStatus } from '../types/Task';
import { format } from 'date-fns';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

const getStatusVariant = (status: TaskStatus) => {
    switch (status) {
        case 'Completed':
            return 'success';
        case 'In Progress':
            return 'warning';
        default:
            return 'secondary';
    }
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onStatusChange }) => {
    const handleDelete = (taskId: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            onDelete(taskId);
        }
    };

    return (
        <div className="table-responsive">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{format(new Date(task.dueDate), 'MMM dd, yyyy')}</td>
                            <td>
                                <Badge 
                                    bg={getStatusVariant(task.status)}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        const statusOrder: TaskStatus[] = ['Pending', 'In Progress', 'Completed'];
                                        const currentIndex = statusOrder.indexOf(task.status);
                                        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
                                        onStatusChange(task.id, nextStatus);
                                    }}
                                >
                                    {task.status}
                                </Badge>
                            </td>
                            <td>
                                <div className="d-flex gap-2">
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => onEdit(task)}
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TaskList;
