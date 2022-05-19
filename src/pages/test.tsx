import React from "react";
import { Group, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { NotificationsProvider } from "@mantine/notifications";

export const Test = () => {
  return (
    <div>
      <Group position="center">
        <Button
          variant="outline"
          onClick={() =>
            showNotification({
              title: "Default notification",
              message: "Hey there, your code is awesome! 🤥",
            })
          }
        >
          Show customized notification
        </Button>
      </Group>
    </div>
  );
};

export default Test;