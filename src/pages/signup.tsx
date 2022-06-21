import { NextPage } from "next";
import { config } from "../lib/supabase/supabase";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";

type IForm = {
  email: string;
  password: string;
};

const Signin: NextPage = () => {
  const handleSignin = async (value: { email: string; password: string }) => {
    console.log(value);
    const { user, session, error } = await config.supabase.auth.signUp({
      email: value.email,
      password: value.password,
    });

    if (user) {
      console.log(user);
    }
    if (session) {
      console.log(session);
    }
    if (error) {
      console.log(error);
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSignin(values))}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
          className="my-4"
        />

        <PasswordInput
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
          className="my-4"
        />

        <Group position="center" mt="xl">
          <Button type="submit" color="cyan">
            SignUp
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Signin;
