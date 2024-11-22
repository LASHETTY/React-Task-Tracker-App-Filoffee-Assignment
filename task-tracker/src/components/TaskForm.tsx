import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Task, TaskStatus } from '../types/Task';

interface TaskFormProps {
    onSubmit: (task: Omit<Task, 'id'>) => void;
    initialTask?: Task | null;
    onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialTask, onCancel }) => {
    const [title, setTitle] = useState(initialTask?.title || '');
    const [description, setDescription] = useState(initialTask?.description || '');
    const [dueDate, setDueDate] = useState(initialTask?.dueDate || '');
    const [status, setStatus] = useState<TaskStatus>(initialTask?.status || 'Pending');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title,
            description,
            dueDate,
            status,
        });
        if (!initialTask) {
            setTitle('');
            setDescription('');
            setDueDate('');
            setStatus('Pending');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="task-form">
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter task title"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Enter task description"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                    required
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </Form.Select>
            </Form.Group>

            <div className="d-flex gap-2">
                <Button variant="primary" type="submit">
                    {initialTask ? 'Update Task' : 'Add Task'}
                </Button>
                {onCancel && (
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
            </div>
        </Form>
    );
};

export default TaskForm;
