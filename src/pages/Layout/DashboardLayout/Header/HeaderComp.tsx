import { ColorTheme } from "./ColorTheme";
import { Lang } from "./Lang";
import { Avatar, Loader, Menu, Text } from "@mantine/core";
import React, { FC, memo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "src/lib/supabase/supabase";
import {
  IconSettings,
  IconSearch,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons";
import { Logout } from "tabler-icons-react";

export const HeaderComp: React.FC = memo(() => {
  return (
    <div className="relative flex justify-center ">
      <div className=" absolute left-0 flex">
        <div className="mt-[6px]">
          <ColorTheme />
        </div>
        <div>
          <Lang />
        </div>
      </div>
      <div className="ml-[200px] pr-2 pb-2  text-4xl font-bold italic hover:not-italic">
        memory with music
      </div>
      <Loader color="cyan" size="sm" variant="bars" />
      <div className=" absolute right-0 flex">
        <div className="mt-[6px]">
          <UserMenu />
        </div>
      </div>
    </div>
  );
});

HeaderComp.displayName = "HeaderComp";

const UserMenu: FC = memo(() => {
  const { push } = useRouter();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          radius="xl"
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>
          <Link href="account" className="text-inherit">
            <a>Settings</a>
          </Link>
        </Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>
          <div className="line-through">Messages</div>
        </Menu.Item>
        <Menu.Item
          onClick={async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
              console.error(error);
            } else {
              window.alert("ログアウトしました");
              push("/sign-in");
            }
          }}
          icon={<Logout size={14} strokeWidth={2} color={"black"} />}
        >
          <div>logout</div>
        </Menu.Item>
        <Menu.Item
          icon={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          <div className="line-through">Search</div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
          Transfer my data
        </Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14} />}>
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});

UserMenu.displayName = "UserMenu";