import { useMutation } from "@tanstack/react-query";
import { del } from "../api";

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (userId: number) => del<boolean>(`/auth/delete/${userId}`),
  });
};
