import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Dropdown } from "semantic-ui-react";
import { FaRegUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../util/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";
function Todo() {
  const user = useSelector((state) => state.user.user);
  const history = useNavigate();
  const trigger = (
    <span>
      <FaRegUserCircle
        color="white"
        className="user-icon-position"
        size={30}
        name="user"
      />{" "}
      <span>{user ? user.displayName : ""}</span>
    </span>
  );

  const options = [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{user ? user.displayName : ""}</strong>
        </span>
      ),
      disabled: true,
    },
    { key: "sign-out", text: "Sign Out" },
  ];

  return (
    <div>
      <div className="card-padding-position">
        <div className="card-flex-container-todo">
          <Dropdown
            onChange={(event, data) => {
              signOut(auth)
                .then(() => {
                  toast.success("Successful signed out");
                  history("/login");
                })
                .catch((error) => {
                  toast.success("Error");
                });
            }}
            trigger={trigger}
            options={options}
          />
        </div>
      </div>
      <div className="todo-card-padding-container">
        <Card />
      </div>
    </div>
  );
}

export default Todo;
