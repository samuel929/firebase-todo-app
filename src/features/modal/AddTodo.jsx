import React, { useState } from "react";
import { Modal, Button, Form } from "semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";
import { db } from "../../util/firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
function AddTodo({ openAddNewTodo, setOpenAddNewTodo, fetchTask }) {
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object({
    taskName: Yup.string().required("Task name is required."),
    description: Yup.string().required("Task description is required"),
    date: Yup.date().required("Date is required"),
  });
  const onSubmit = async (values) => {
    setIsLoading(true);
    await addDoc(collection(db, "tasks"), {
      TaskName: values.taskName,
      description: values.description,
      date: values.date,
      complete:false
    })
      .then((data) => {
        setOpenAddNewTodo(false);
        fetchTask();
        toast.success("Todo successfully created.");
      })
      .catch(() => {
        toast.error("Failed to create todo");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const initialValues = {
    taskName: "",
    description: "",
    date: "",
  };
  return (
    <Modal
      className="add-task-modal"
      onClose={() => setOpenAddNewTodo(false)}
      onOpen={() => setOpenAddNewTodo(true)}
      open={openAddNewTodo}
    >
      <Modal.Header className="headers">Add Task</Modal.Header>
      <Modal.Content className="contents">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, setFieldValue, handleSubmit, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <input
                  name="taskName"
                  type="text"
                  className="add-task-input"
                  onChange={(e) => {
                    setFieldValue("taskName", e.target.value);
                  }}
                  placeholder="Task Name"
                />
                {errors.taskName && touched.taskName ? (
                  <div>
                    <p className="error-form">{errors.taskName}</p>
                  </div>
                ) : null}
              </Form.Field>
              <Form.Field>
                <input
                  name="description"
                  onChange={(e) => {
                    setFieldValue("description", e.target.value);
                  }}
                  className="add-task-input"
                  placeholder="Description"
                />
                {errors.description && touched.description ? (
                  <div>
                    <p className="error-form">{errors.description}</p>
                  </div>
                ) : null}
              </Form.Field>
              <Form.Field>
                <input
                  name="date"
                  type="date"
                  onChange={(e) => {
                    setFieldValue("date", e.target.value);
                  }}
                  className="add-task-input"
                  placeholder="Due Date"
                  style={{ width: "150px" }}
                />
                {errors.date && touched.date ? (
                  <div>
                    <p className="error-form">{errors.date}</p>
                  </div>
                ) : null}
              </Form.Field>
              <Modal.Actions className="action-content-holder">
                <Button
                  className="cancel-btn"
                  onClick={() => setOpenAddNewTodo(false)}
                >
                  Cancel
                </Button>
                <Button
                  loading={isLoading}
                  content="Add Task"
                  className="add-task-btn"
                  type="submit"
                />
              </Modal.Actions>
            </Form>
          )}
        </Formik>
      </Modal.Content>
    </Modal>
  );
}

export default AddTodo;
