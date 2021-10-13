import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import Link from "next/link";

import { animateOnRender, animateOpacity } from 'styles/animations';

export function Home() {

    const [session] = useSession();

    return (
        <Flex
            maxW='1120px'
            h='100vh'
            alignItems='center'
            justifyContent='center'
            flexDir={['column', 'column', 'column', 'row-reverse']}
            m='0 auto' pl={5}
            pr={5}
            animation={`${animateOpacity} 1s linear`}
        >
            <Image
                flex='1'
                w='80%'
                maxW='550px'
                mt={['100px', '100px', '100px', 0]}
                mb={[8, 8, 8, 0]}
                src='/images/home_img.svg'
                alt='Ilustração de um planejamento de tarefas'
            />

            <Flex flex='1' flexDir='column' animation={`${animateOnRender} 0.7s linear`}>
                <Box as='h2' mb='8' fontSize={['3xl', '4xl']}>
                    Uma forma
                    <Text as='span' color='blue.500' ml='6px'>simples</Text> <br />
                    e <Text as='span' color='blue.500' ml='6px'>rápida</Text> de organizar <br />
                    suas tarefas
                </Box>

                <Link href={session ? '/dashboard' : '/login'} passHref>
                    <Button
                        transition='ease-in-out .6s'
                        _hover={{ bgGradient: 'linear(to-r, blue.500, green.500)' }}
                        alignSelf='flex-start'
                        size='lg'
                        bg='blue.500'>
                        Começar
                    </Button>
                </Link>
            </Flex>
        </Flex>
    )
}