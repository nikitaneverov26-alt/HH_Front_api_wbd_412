import type { UserModel } from "./types";

interface UserRowProps {
  user: UserModel;
  onButtonClick: (id: number) => void;
  onEdinClick: (user: UserModel) => void;
  isUserDeleting: boolean;
}

export const UserRow = ({
  user,
  onButtonClick,
  isUserDeleting,
  onEdinClick,
}: UserRowProps) => {
  return (
    <div className="d-flex flex-row gap-3 bg-light p-2 rounded-3 ps-4 justify-content-between">

      <div className="d-flex flex-row gap-2 w-100">
        
        <span style={{ width: "30px" }}>{user.id}</span>

        <span className="fw-bold" style={{ width: "250px" }}>
          {user.firstName + " " + user.lastName}
        </span>

        <span style={{ width: "50px" }}>{user.age}</span>

        <span style={{ width: "150px" }}>{user.phone}</span>

        {user.isCitizen ? (
          <span className="text-success text-nowrap">Гражданин РФ</span>
        ) : (
          <span className="text-primary">Иностранец</span>
        )}
      </div>

      <div onClick = {() => onEdinClick(user)} style={{cursor: "pointer"}} >
        ✍️ 
      </div>
      {!isUserDeleting && (
        <button
          onClick={() => onButtonClick(user.id)}
          className="btn btn-close"
        ></button>
      )}
    </div>
  );
};
