import { Flex, Image, Text } from "@chakra-ui/react";

export function EmptyInfo() {

    return (
        <Flex alignItems='center' justifyContent='center' flexDir='column'>
            <Image src='images/empty.svg' alt='Sem tarefas - Ilustração representando uma praça vazia' w='100%' maxW='700px' />
            <Text fontSize='2xl' mt='10'>Você ainda não posui tarefas!</Text>
        </Flex>
    )
}