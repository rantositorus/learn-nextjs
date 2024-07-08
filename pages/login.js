import {
  Flex,
  Stack,
  Heading,
  FormControl,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const { mutate } = useMutation();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const HandleSubmit = async () => {
    const response = await mutate({
      url: "https://service.pace-unv.cloud/api/login",
      payload,
    });
    if (!response?.success) {
      toast({
        title: "Login Gagal.",
        description: "Email dan Password Salah.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      Cookies.set("user_token", response?.data?.token, {
        expires: new Date(response?.data?.expires_at),
        path: "/",
      });
      router.push("/");
      toast({
        title: "Login Berhasil.",
        description: "Selamat Datang.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <Flex alignItems="center" justifyContent="center">
      <Stack direction="column">
        <Heading as="h4">Login</Heading>
        <FormControl>
          <Input
            value={payload?.email}
            onChange={(event) =>
              setPayload({ ...payload, email: event.target.value })
            }
            type="email"
            placeholder="Email"
          />
        </FormControl>
        <FormControl>
          <Input
            onChange={(event) =>
              setPayload({ ...payload, password: event.target.value })
            }
            value={payload.password}
            type="password"
            placeholder="Password"
          />
        </FormControl>
        <FormControl>
          <Button onClick={() => HandleSubmit()} type="submit">
            Login
          </Button>
        </FormControl>
      </Stack>
    </Flex>
  );
}
