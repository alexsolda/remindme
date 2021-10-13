import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { Header } from "components/Header";
import Head from "next/head";

import { signIn, useSession } from "next-auth/client";

import { animateOnRender } from "styles/animations";
import { useRouter } from "next/dist/client/router";

import { FaGithub } from "react-icons/fa";
import { AiOutlineGoogle } from "react-icons/ai";
import { useEffect } from "react";

export default function Login() {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  const handleLogin = (provider: string) => {
    signIn(provider);
  };

  return (
    <>
      <Head>
        <title>Login | rem!nd me</title>
      </Head>

      <Header />
      <Flex
        as="main"
        h="100vh"
        pl={5}
        pr={5}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          borderRadius="5"
          animation={`${animateOnRender} 0.7s linear`}
          bg="gray.600"
          maxW="500px"
          w="100%"
          p={5}
        >
          <Text
            as="h2"
            mb="14"
            textAlign="center"
            fontWeight="700"
            fontSize="3xl"
            color="blue.500"
          >
            Login
          </Text>
          <Flex flexDir="column">
            <Button
              mb="10"
              size="lg"
              bg="gray.900"
              color="blue.500"
              fontWeight="400"
              _hover={{ color: "white.900", bg: "blue.500" }}
              onClick={() => handleLogin("github")}
            >
              <Icon as={FaGithub} mr="3" fontSize="25" />
              Acessar com Github
            </Button>
            <Button
              mb="10"
              size="lg"
              bg="gray.900"
              color="blue.500"
              fontWeight="400"
              _hover={{ color: "white.900", bg: "blue.500" }}
              onClick={() => handleLogin("google")}
            >
              <Icon as={AiOutlineGoogle} mr="3" fontSize="25" />
              Acesar com Google
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
