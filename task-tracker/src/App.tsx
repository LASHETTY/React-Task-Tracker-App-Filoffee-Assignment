import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task, TaskStatus } from './types/Task';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (taskData: Omit<Task, 'id'>) => {
    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id ? { ...taskData, id: task.id } : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Task Tracker</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Card>
            <Card.Body>
              <Card.Title>{editingTask ? 'Edit Task' : 'Add New Task'}</Card.Title>
              <TaskForm
                onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                initialTask={editingTask}
                onCancel={editingTask ? () => setEditingTask(null) : undefined}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Tasks</Card.Title>
              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
