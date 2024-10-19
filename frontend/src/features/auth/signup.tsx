import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardAuth from "./CardAuth";
import authService from "../../services/auth";

import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const signUpSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

type signUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const [show, setShow] = useState(false);
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShow(!show);

  const onSubmit = async (data: signUpFormData) => {
    try {
      const response = await authService.signUp.post({ data });

      if (response.data) {
        registerUser(
          { username: response.data.username, email: response.data.email },
          response.data.token,
        );
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("signup is bad", error);
    }
  };

  const cardDetails = {
    title: "Signup",
    description: "Welcome! Please fill the details",
  };

  return (
    <CardAuth title={cardDetails.title} description={cardDetails.description}>
      <FormControl>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            placeholder="depe"
            type="text"
            id="username"
            {...register("username")}
          />
          {errors.username && (
            <FormHelperText>{errors.username.message}</FormHelperText>
          )}
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            placeholder="depe@email.com"
            type="email"
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <FormHelperText>{errors.email.message}</FormHelperText>
          )}
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              id="password"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              {...register("password")}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClickShowPassword}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <FormHelperText>{errors.password.message}</FormHelperText>
          )}
          <Button mt="5" colorScheme="purple" type="submit" width="100%">
            Submit
          </Button>
        </form>
      </FormControl>
    </CardAuth>
  );
};

export default SignUp;
