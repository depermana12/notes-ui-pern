import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CardForm = () => {
  return (
    <VStack spacing={5}>
      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        Log code to notes while code the notes
      </Text>
      <HStack>
        <Link to="/signin">
          <Button colorScheme="purple">Sign In</Button>
        </Link>
        <Text>or</Text>
        <Link to="/signup">
          <Button colorScheme="purple" variant="outline">
            Sign Up
          </Button>
        </Link>
      </HStack>
    </VStack>
  );
};
export default CardForm;

{
  /* <Card align="center">
  <CardHeader>
    <Heading size="md">Sign up</Heading>
  </CardHeader>
  <CardBody>
    <div>Form</div>
  </CardBody>
  <CardFooter>
    <HStack>
      <Text>Already have an account?</Text>
      <Button colorScheme="blue">Signin</Button>
    </HStack>
  </CardFooter>
</Card>; */
}
