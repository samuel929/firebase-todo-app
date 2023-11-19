import React, { useEffect, useState } from "react";
import {
  Divider,
  Header,
  Card,
  Popup,
  Button,
  Grid,
  Label,
} from "semantic-ui-react";
import { CiCirclePlus } from "react-icons/ci";
import AddTodo from "../../features/modal/AddTodo";
import { db } from "../../util/firebase";
import { collection, getDocs, deleteDoc, doc,updateDoc } from "firebase/firestore";
import moment from "moment";
import { toast } from "react-toastify";
import UpdateTodo from "../../features/modal/UpdateTodo";
import Placeholder from "../../placeholder/placeholder";
import { emptyData } from "../../placeholder/emptyData";
function Cards() {
  const [openAddNewTodo, setOpenAddNewTodo] = useState(false);
  const [openUpdateTodo, setOpenUpdateTodo] = useState(false);
  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");

  const fetchTask = async () => {
    setIsLoading(true);
    await getDocs(collection(db, "tasks"))
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTask(documents);
      })
      .catch(() => {
        toast.error("Failed to retrieve todos!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const today = moment();
  const deleteToDoHandler = async (collectionId) => {
    await deleteDoc(doc(db, "tasks", collectionId))
      .then(() => {
        toast.success("Todo successfully deleted.");
        fetchTask();
      })
      .catch(() => {
        toast.error("Failed to delete todo.");
      });
  };

  const changeTodoStatus = async (id) => {
    const todo = doc(db, "tasks", id);
    await updateDoc(todo, {
      complete: true
    }).then(()=>{
      fetchTask();
    })
  };

  return (
    <>
      <AddTodo
        openAddNewTodo={openAddNewTodo}
        setOpenAddNewTodo={setOpenAddNewTodo}
        fetchTask={fetchTask}
      />
      <UpdateTodo
        fetchTask={fetchTask}
        setOpenUpdateTodo={setOpenUpdateTodo}
        openUpdateTodo={openUpdateTodo}
        id={id}
      />
      <div className="flex-center-container">
        <div className="todo-card">
          <div style={{ textAlign: "center" }}>
            <div className="flex-end-container">
              <Popup
                content="Add new todo"
                trigger={
                  <CiCirclePlus
                    size={30}
                    onClick={() => setOpenAddNewTodo(true)}
                    className="add-todo-circle"
                  />
                }
              />
            </div>
            <Header as="h1" className="todos-header-container-add">
              Todos
            </Header>
          </div>
          <Divider />
          <div className="card-scroll">
            <Grid centered style={{ paddingTop: "30px" }}>
              {isLoading ? (
                <>
                  <Placeholder />
                </>
              ) : task.length !== 0 ? (
                task.map((item, i) => (
                  <Grid.Row key={i}>
                    <Card>
                      <Popup
                        content={item.complete ? "No need to click, todo completed" : "Click to change Todo status from incomplete to complete"}
                        trigger={
                          <Label
                            style={{width:"100%"}}
                            onClick={() => {
                              changeTodoStatus(item.id);
                            }}
                            color={item.complete ? "green" : "red"}
                            as="a"
                          >
                            {item.complete ? "Todo Complete" : "Work on Todo"}
                          </Label>
                        }
                      />

                      <Card.Content>
                        <Card.Header>{item.TaskName}</Card.Header>
                        <Card.Meta>
                          Due in {moment(item.date).diff(today, "days")} days
                        </Card.Meta>
                        <Card.Description>{item.description}</Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className="ui two buttons">
                          <Button
                            onClick={() => {
                              setId(item.id);
                              setOpenUpdateTodo(true);
                            }}
                            basic
                            color="green"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => deleteToDoHandler(item.id)}
                            basic
                            color="red"
                          >
                            Delete
                          </Button>
                        </div>
                      </Card.Content>
                    </Card>
                  </Grid.Row>
                ))
              ) : (
                <div className="empty-data-positioning">
                  {emptyData("No Data")}
                </div>
              )}
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
