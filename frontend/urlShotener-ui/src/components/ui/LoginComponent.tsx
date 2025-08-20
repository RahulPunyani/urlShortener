import { Button, VStack, Input, HStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { toaster } from "./toaster";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const navigate = useNavigate();
  const { VITE_API_URL } = import.meta.env;

  const login = () => {
    if (!email || !password) {
      window.alert("Missing email or password");
      return;
    }
    axios
      .post(`${VITE_API_URL}/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        Cookies.set("token", token, { expires: 8 });
        navigate("/url-shorten");
      })
      .catch((error) => {
        //show error
        console.log(error.data.message);
      });
  };

  const register = () => {
    if (!email || !password) {
      window.alert("Missing email or password");
      return;
    }
    axios
      .post(`${VITE_API_URL}/register`, {
        email: email,
        password: password,
      })
      .then(() => {
        toaster.create({
          description: "Success. You can login now.",
          type: "success",
        });
      })
      .catch((error) => {
        //show error
        console.log(error.data.message);
      });
  };

  return (
    <React.Fragment>
      <VStack>
        <Input
          placeholder="Enter your email"
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
          size={"lg"}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
        <HStack>
          <Button type="submit" color={"black"} onClick={login}>
            Login{" "}
          </Button>
          <Button type="submit" variant="plain" onClick={register}>
            Register
          </Button>
        </HStack>
      </VStack>
    </React.Fragment>
  );
};

export default Login;
