import { updateProductStatus } from "@/apis/productApis";
import { getAllUsers, updateUserStatus } from "@/apis/userApis";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner";
import { Button } from "../ui/button";
import { formatDate } from "../helper/formateDate";

export function UsersTable() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { data: users, isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserStatus,
    onSuccess: () => {
      toast.success("User status updated successfully!");
      queryClient.invalidateQueries(["allUsers"]);
    },
    onError: (error) => toast.error(error.message),
  });

  function handleStatusChange(userId, userStatus, index) {
    setSelectedIndex(index);
    mutate({ userId, userStatus });
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div>
        {users.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell className="capitalize">{user.status}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {user.status === "active" && (
                      <div className="flex justify-center items-center gap-2">
                        {isPending && index === selectedIndex ? (
                          "Processing..."
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              onClick={() =>
                                handleStatusChange(user._id, "blocked", index)
                              }
                            >
                              Block
                            </Button>
                          </>
                        )}
                      </div>
                    )}

                    {user.status === "blocked" && (
                      <div className="flex justify-center items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleStatusChange(user._id, "active", index)
                          }
                        >
                          {isPending && index === selectedIndex
                            ? "Processing..."
                            : "UnBlock"}
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-lg font-bold text-center">No user found 🙂</p>
        )}
      </div>
    </>
  );
}
