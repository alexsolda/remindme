import { Avatar, Box, Button, Flex, Image } from "@chakra-ui/react";
import { signOut, useSession } from 'next-auth/client';
import { useRouter } from "next/dist/client/router";

export function Header() {

    const [session] = useSession();
    const router = useRouter();

    const handleLogOut = () => {
        signOut();

    }

    return (
        <Box as='header' bg='gray.900' position='fixed' top='0' left='0' right='0' zIndex='99' h='100px' borderBottom='1px' borderColor='blue.500'>
            <Flex maxW='1120px' m='0 auto' h='100%' alignItems='center' justifyContent='space-between' pl={5} pr={5}>
                <Image src='/images/logo.svg' alt='remind me - logo' />

                {session &&
                    <Flex alignItems='center'>
                        <Avatar src={session.user.image} alt='Foto do perfilt' name={session.user.name} />
                        <Button onClick={() => handleLogOut()} ml='5' color='gray.50' bg='transparent' _hover={{ bg: 'transparent', color: 'blue.500' }}>sair</Button>
                    </Flex>
                }
            </Flex>
        </Box>
    )
}