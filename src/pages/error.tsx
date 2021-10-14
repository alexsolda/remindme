import { Image, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

export function Error() {
  return (
    <Flex
      maxW="1120px"
      m="0 auto"
      pr="5"
      pl="5"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      flexDir="column"
    >
      <Text fontSize="3xl" mb="10">
        Verifique se sua conta possui um e-mail de acesso público.
      </Text>
      <Text fontSize="2xl" mb="10">
        Para tentar novamente{" "}
        <ChakraLink as={Link} href="/login" _hover={{ color: "blue.500" }}>
          clique aqui!
        </ChakraLink>{" "}
      </Text>
      <Image
        src="/images/login_not_found.svg"
        alt="Faça login para continuar - Ilustração de uma pessoa em frente a uma porta fechada"
        w="100%"
        maxW="500px"
      />
    </Flex>
  );
}
