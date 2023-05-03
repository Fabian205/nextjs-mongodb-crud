import { Button, Form, FormInput, Grid } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TaskFormPage() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const { query, push } = useRouter();

  const validate = () => {
    const errors = {};

    if (!newTask.title) errors.title = "Title is required";
    if (!newTask.description) errors.description = "Description is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);

    if (query.id) {
      await updateTask();
      //console.log(query.id);
    } else {
      await createTask();
    }
    await push("/");
  };

  const createTask = async () => {
    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    try {
      await fetch("http://localhost:3000/api/tasks/" + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) =>
    setNewTask({ ...newTask, [e.target.name]: e.target.value });

  const getTask = async () => {
    const res = await fetch("http://localhost:3000/api/tasks/" + query.id);
    const data = await res.json();
    //console.log(data)
    setNewTask({ title: data.title, description: data.description });
  };

  useEffect(() => {
    if (query.id) getTask();
  }, []);

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{query.id ? "Update Task" : "Create Task"}</h1>
          <Form onSubmit={handleSubmit}>
            <FormInput
              name="title"
              label="Title"
              placeholder="Title"
              onChange={handleChange}
              error={
                errors.title
                  ? { content: errors.title, pointing: "below" }
                  : null
              }
              value={newTask.title}
              autoFocus
            />
            <Form.TextArea
              name="description"
              label="Description"
              placeholder="Description"
              onChange={handleChange}
              error={
                errors.description
                  ? { content: errors.description, pointing: "below" }
                  : null
              }
              value={newTask.description}
            />
            <Button primary>{query.id ? "Update" : "Create"}</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
