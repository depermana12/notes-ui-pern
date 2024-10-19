import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import CardAuth from "./CardAuth";
import authService from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type signInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const { login } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShow(!show);
  const onSubmit = async (data: signInFormData) => {
    try {
      const response = await authService.signIn.post({ data });

      if (response.data) {
        console.log(response);
        login(
          { username: response.data.username, email: response.data.email },
          response.data.token,
        );
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("signin is bad", error);
    }
  };

  const cardDetails = {
    title: "Signin",
    description: "Welcome back! Please fill the details",
  };

  return (
    <CardAuth title={cardDetails.title} description={cardDetails.description}>
      <FormControl>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            Signin
          </Button>
          <Link to="/autn">
            <Button mt="4" colorScheme="purple" variant="outline" width="100%">
              Signin With Google
            </Button>
          </Link>
        </form>
      </FormControl>
    </CardAuth>
  );
};
export default SignIn;
