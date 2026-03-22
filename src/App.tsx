import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreateUserForm } from "./creat-user-form";
import { UserList } from "./user-list";
import { useState } from "react";
import type { UserModel } from "./types";

const App = () => {

  //большое дз сделано




  
  const [editedUser, setEditedUser] = useState<UserModel | null>(null)

  return (
    <div className="d-flex flex-column gap-3 align-items-center p-3">
      <CreateUserForm editedUser={editedUser} OnClick={() => setEditedUser(null)}/>
      <UserList OnEditClick={setEditedUser} />
    </div>
  );
};

export default App;
