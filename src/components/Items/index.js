import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Button,
  Grid, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField
} from '@mui/material';

// Replace these with actual API functions using Amplify
import { getTodos, createTodo, updateTodo, deleteTodo } from './api'; // you write this

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ id: '', title: '', description: '' });

  const fetchData = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (todo = { id: '', title: '', description: '' }) => {
    setForm(todo);
    setOpen(true);
  };

  const handleClose = () => {
    setForm({ id: '', title: '', description: '' });
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (form.id) {
      await updateTodo(form.id, form);
    } else {
      await createTodo(form);
    }
    fetchData();
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchData();
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom>Todo App</Typography>

      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Todo
      </Button>

      <Grid container spacing={2} mt={2}>
        {todos.map((todo) => (
          <Grid item xs={12} sm={6} md={4} key={todo.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{todo.title}</Typography>
                <Typography variant="body2" color="text.secondary">{todo.description}</Typography>
                <Typography variant="caption" display="block">
                  {new Date(todo.createdAt).toLocaleString()}
                </Typography>

                <Button size="small" onClick={() => handleOpen(todo)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(todo.id)}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{form.id ? 'Edit Todo' : 'Add Todo'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {form.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
