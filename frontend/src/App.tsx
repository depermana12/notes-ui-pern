import { Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Grid
      templateAreas={{
        base: `
        "header"
        "main"
        "footer"`,
        lg: `
        "header header"
        "aside  main" 
        "footer footer"
         `,
      }}
      gridTemplateRows={{
        base: "50px 1fr 50px",
        lg: "50px 1fr 50px",
      }}
      gridTemplateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
      minH="100vh"
      gap="2"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem bg="orange.300" alignContent="center" area={"header"}>
        <Navbar />
      </GridItem>
      <Show above="lg">
        <GridItem maxWidth="250" bg="pink.300" area={"aside"}>
          aside
        </GridItem>
      </Show>
      <GridItem bg="green.300" area={"main"}>
        Main
      </GridItem>
      <GridItem bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
};
export default App;
