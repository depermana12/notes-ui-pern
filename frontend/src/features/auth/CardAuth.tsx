import { Text } from "@chakra-ui/react";
import { Card, CardHeader, Heading, CardBody } from "@chakra-ui/react";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const CardAuth = ({ children, title, description }: Props) => {
  return (
    <Card>
      <CardHeader>
        <Heading>{title}</Heading>
        <Text mt="4">{description}</Text>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};
export default CardAuth;
