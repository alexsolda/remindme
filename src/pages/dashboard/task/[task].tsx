import {
  Box,
  Heading,
  Text,
  RadioGroup,
  Stack,
  Radio,
  Flex,
  FormLabel,
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { Header } from "components/Header";
import { LoginNotFound } from "components/LoginNotFound";
import { ModalDelete } from "components/ModalDelete";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";

import { fauna } from "utils/faunadb";
import { Collection, query as q } from "faunadb";

import { statusValues } from "utils/statusValues";
import { dateFormatter } from "utils/dateFormatter";
import { useState } from "react";
import { api } from "services/api";

interface TaskData {
  ref: {
    "@ref": {
      id: string;
    };
  };
  data: {
    task: {
      title: string;
      description: string;
      createdAt: string;
      status: string;
    };
  };
}

export default function EditTask({ task }) {
  const taskData: TaskData = JSON.parse(task);

  const [newStatus, setNewStatus] = useState<string>(taskData.data.task.status);
  const [isEditing, setIsEditing] = useState(false);
  const [session] = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dateFormatted = dateFormatter(taskData.data.task.createdAt);

  const toast = useToast();

  const onSuccess = () =>
    toast({
      title: "Edição realizada com sucesso!",
      status: "success",
      isClosable: true,
      duration: 3000,
      position: "top",
    });
  const onFailure = () =>
    toast({
      title: "Erro inesperado!",
      description: "Tente novamente",
      status: "error",
      isClosable: true,
      duration: 3000,
      position: "top",
    });

  const handleEditTask = async () => {
    setIsEditing(true);

    try {
      const result = await api.post("/edittask", {
        ref: taskData.ref["@ref"].id,
        status: newStatus,
      });

      if (result.status === 200) {
        onSuccess();
      }
    } catch (e) {
      onFailure();
    }

    setIsEditing(false);
  };

  const openDeleteModal = () => {
    onOpen();
  };

  return (
    <>
      <Head>
        <title>Editar task | remind me</title>
      </Head>
      <Header />
      {session ? (
        <Box maxW="1120px" m="0 auto" pr="5" pl="5">
          <Flex flexDir="column" mt="150px">
            <Heading
              textTransform="uppercase"
              color="blue.500"
              fontWeight="600"
              fontSize="5xl"
            >
              {taskData.data.task.title}
            </Heading>
            <Text color="gray.50" fontSize="2xl">
              {taskData.data.task.description}
            </Text>
            <Text color="gray.50" fontSize="md" mb="10">
              {dateFormatted}
            </Text>

            <FormLabel>Editar status:</FormLabel>
            <RadioGroup defaultValue={taskData.data.task.status} mb="20">
              <Stack spacing={4} direction="row">
                {statusValues.map((stat) => (
                  <Radio
                    key={stat.id}
                    value={stat.value}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    {stat.value}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>

            <Stack spacing={3} direction="row">
              <Button
                bg="transparent"
                border="2px solid"
                borderColor="blue.500"
                color="blue.500"
                _hover={{ bg: "blue.500", color: "white.900" }}
                onClick={() => handleEditTask()}
                isLoading={isEditing}
                loadingText="Editando"
                colorScheme="blue.500"
                variant="solid"
              >
                Editar
              </Button>

              <Link href="/dashboard">
                <Button
                  bg="transparent"
                  border="2px solid"
                  borderColor="blue.500"
                  color="blue.500"
                  _hover={{ bg: "blue.500", color: "white.900" }}
                >
                  Cancelar
                </Button>
              </Link>
              <Button
                bg="transparent"
                border="2px solid"
                borderColor="red.500"
                color="red.500"
                _hover={{ bg: "red.500", color: "white.900" }}
                onClick={() => openDeleteModal()}
                colorScheme="red.500"
                variant="solid"
                isLoading={isEditing}
              >
                Excluir
              </Button>
              <ModalDelete
                isOpen={isOpen}
                onClose={onClose}
                task={taskData.ref["@ref"].id}
              />
            </Stack>
          </Flex>
        </Box>
      ) : (
        <LoginNotFound />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params.task;

  const task = await fauna.query(
    q.Get(q.Ref(Collection("todo_list"), String(id)))
  );

  return {
    props: {
      task: JSON.stringify(task),
    },
  };
};
