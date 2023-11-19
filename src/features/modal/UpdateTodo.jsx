import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";
import { db } from "../../util/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function UpdateTodo({ fetchTask, openUpdateTodo, setOpenUpdateTodo, id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState("");

  const validationSchema = Yup.object({
    taskName: Yup.string().required("Task name is required."),
    description: Yup.string().required("Task description is required"),
    date: Yup.date().required("Date is required"),
  });

  const fetchFormData = async () => {
    const docRef = doc(db, "tasks", id);
    await getDoc(docRef)
      .then((data) => {
        setValues(data.data());
      })
      .catch((err) => {
        toast.error("Failed to fetch field values");
      });
  };

  useEffect(() => {
    if (id != "") {
      fetchFormData();
    }
  }, [id]);

  const onSubmit = async (values) => {
    setIsLoading(true);

    const washingtonRef = doc(db, "tasks", id);
    await updateDoc(washingtonRef, {
      TaskName: values.taskName,
      description: values.description,
      date: values.date,
    })
      .then((data) => {
        toast.success("Updated todo");
        fetchTask();
        setOpenUpdateTodo(false);
      })
      .catch((err) => {
        toast.success("Failed to update todo");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const initialValues = {
    taskName: values.TaskName,
    description: values.description,
    date: values.date,
  };
  return (
    <Modal
      className="add-task-modal"
      onClose={() => setOpenUpdateTodo(false)}
      onOpen={() => setOpenUpdateTodo(true)}
      open={openUpdateTodo}
    >
      <Modal.Header className="headers">Update Task</Modal.Header>
      <Modal.Content className="contents">
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, setFieldValue, handleSubmit, touched, values }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <input
                  name="taskName"
                  type="text"
                  className="add-task-input"
                  onChange={(e) => {
                    setFieldValue("taskName", e.target.value);
                  }}
                  value={values.taskName}
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
                  value={values.description}
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
                  value={values.date}
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
                  onClick={() => setOpenUpdateTodo(false)}
                >
                  Cancel
                </Button>
                <Button
                  loading={isLoading}
                  content="Update Task"
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

export default UpdateTodo;
