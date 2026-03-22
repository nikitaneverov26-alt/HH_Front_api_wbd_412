import { useDeleteUser } from "./api-methods/delete-user";
import { useGetUsers } from "./api-methods/get-user";
import type { UserModel } from "./types";
import { UserRow } from "./userrow";


interface UserListProps{
  OnEditClick: (u: UserModel) => void;
}

export const UserList = ({OnEditClick}: UserListProps) => {
  const {
    data: users,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
    isRefetching: isUsersRefetching,
  } = useGetUsers();

  const { mutate: deleteUser, isPending: isUserDeleting } = useDeleteUser();

  const handleDelete = (id: number) => {
    deleteUser(id, { onSuccess: onDeleteSuccess });
  };

  const onDeleteSuccess = () => {
    refetchUsers();
  };

  const isListLoading = isUsersLoading || isUsersRefetching;

  return (
    <div className="d-flex flex-column gap-2 p-2 w-50">

      
      
      {!isListLoading && users?.length === 0 && (
        <span className="align-self-center">Нет пользователей</span>
      )}

      {isListLoading && (
        <div className="align-self-center spinner-grow text-secondary"></div>
      )}

      {!isListLoading &&
        users?.map((u) => (
          <UserRow
            key={u.id}
            user={u}
            onButtonClick={handleDelete}
            onEdinClick={OnEditClick}
            isUserDeleting={isUserDeleting}
          />
        ))}
    </div>
  );
};
