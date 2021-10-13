import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from "@chakra-ui/react";
  import { useRouter } from "next/dist/client/router";
  import { useState } from "react";
  import { api } from "services/api";
  
  interface ModalDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    task: string;
  }
  
  export function ModalDelete({ isOpen, onClose, task }: ModalDeleteProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
  
    const deleteTask = async () => {
      setIsDeleting(true);
  
      try {
        const result = await api.post("/deletetask", {
          ref: task,
        });
  
        if (result.status === 200) {
          router.push("/dashboard");
        }
      } catch (e) {
        alert("Tente novamente!");
      }
  
      setIsDeleting(false);
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.900">
          <ModalHeader bg="blue.500" color="gray.900">
            Excluir task
          </ModalHeader>
          <ModalCloseButton color="gray.500" />
          <ModalBody color="gray.50">
            <p>Tem certeza de que deseja excluir? </p>
          </ModalBody>
  
          <ModalFooter>
            <Button
              bg="transparent"
              border="2px solid"
              borderColor="red.500"
              mr="5"
              color="red.500"
              _hover={{ bg: "red.500", color: "white.900" }}
              colorScheme="red.500"
              variant="solid"
              onClick={() => deleteTask()}
              isLoading={isDeleting}
              loadingText="Excluindo"
            >
              Excluir
            </Button>
            <Button
              bg="transparent"
              border="2px solid"
              borderColor="blue.500"
              color="blue.500"
              _hover={{ bg: "blue.500", color: "white.900" }}
              onClick={() => onClose()}
              isLoading={isDeleting}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }