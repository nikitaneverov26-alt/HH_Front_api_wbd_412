import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { UserModel } from "../types";

const UsersQueryKey = ["UsersQueryKey"];

export const useGetUsers = () => {
  return useQuery({
    queryKey: [UsersQueryKey],
    queryFn: () => api<Array<UserModel>>("/auth/users"),
  });
};