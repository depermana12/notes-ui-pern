import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Grid
      templateAreas={`"main"`}
      gridTemplateRows="1fr"
      gridTemplateColumns="1fr"
      minH="100vh"
      justifyItems="center"
      alignItems="center"
    >
      <GridItem area={"main"} p={8}>
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default AuthLayout;
