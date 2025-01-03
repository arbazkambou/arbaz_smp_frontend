"use client";

import {
  deleteNotification,
  getAllNotifications,
  readAllNotifications,
} from "@/apis/notificationApis";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { CustomModel } from "../shared/CustomModel";
import { BellIcon, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import toast from "react-hot-toast";

function Notifications() {
  const { isAuthenticated } = useAuth;
  const [openModel, setIsOpenModel] = useState(false);

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
    enabled: isAuthenticated,
  });

  const { mutate } = useMutation({
    mutationFn: readAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const { mutate: deleteNotificationApi, isPending } = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      toast.success("Notification clear");
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: () => toast.error("Could not delete"),
  });

  if (isLoading)
    return <Skeleton className={"h-8 w-8 bg-muted rounded-full"} />;
  return (
    <CustomModel
      title={"Notifications"}
      descrption={"Here your notifications"}
      modelTrigger={
        <div
          className="bg-muted h-10 w-10 flex items-center justify-center rounded-lg relative hover:bg-green-300 z-[20]"
          onClick={() => {
            setIsOpenModel(true);
            mutate();
          }}
        >
          <BellIcon size={20} className="mt-1.5" />

          <Badge className="absolute rounded-full h-4 w-4 flex items-center justify-center top-[-1px] right-0 text-xs">
            {data.unReadNotifications}
          </Badge>
        </div>
      }
      openModel={openModel}
      setIsOpenModel={setIsOpenModel}
      width={40}
    >
      {data?.notifications?.length === 0 ? (
        <div className="border-2 bg-muted/50 p-3 ">
          <p className="text-muted-foreground text-sm">
            You have zero notification
          </p>
        </div>
      ) : (
        data.notifications.map((notification, index) => (
          <div
            className="border-2 bg-muted/50 p-3 flex items-center justify-between gap-2"
            key={index}
          >
            <p className="text-muted-foreground text-sm">
              {notification.message}
            </p>
            {isPending ? (
              <span className="text-red-500 text-sm">Deleting...</span>
            ) : (
              <span onClick={() => deleteNotificationApi(notification._id)}>
                <Trash2 className="hover:text-red-500" />
              </span>
            )}
          </div>
        ))
      )}
    </CustomModel>
  );
}

export default Notifications;
