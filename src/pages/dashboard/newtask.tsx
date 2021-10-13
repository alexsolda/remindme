import { Box, FormLabel, Input, Textarea, Stack, Radio, RadioGroup, Button, useToast } from "@chakra-ui/react";
import { Header } from "components/Header";
import { LoginNotFound } from "components/LoginNotFound";
import { useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { api } from "services/api";

import { statusValues } from "utils/statusValues";

export default function newTask() {

    const [session] = useSession();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<string>('pendente');
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    const onSuccess = () => toast({ title: 'Nova tarefa adicionada com sucesso!', status: 'success', isClosable: true, duration: 3000, position: 'top' })
    const onFailure = () => toast({ title: 'Erro inesperado!', description: 'Tente novamente', status: 'error', isClosable: true, duration: 3000, position: 'top' })
    const missingInfo = () => toast({ title: 'Título e descrição obrigatórios', description: 'Preencha os campos e tente novamente', status: 'warning', isClosable: true, duration: 4000, position: 'top' })


    const handleCreateTask = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true)

        if (title.trim() === '' || description.trim() === '') {
            missingInfo()
            setIsLoading(false)
            return
        }

        const data = {
            user: session.user.email,
            title: title.trim(),
            description: description.trim(),
            status,
            createdAt: new Date()
        }

        try {
            const result = await api.post('/createnewtask', data)
            if (result.status === 200) {
                onSuccess()
            }
        } catch (e) {
            onFailure()
            setIsLoading(false)
            return
        }

        setTitle('')
        setDescription('')
        setStatus('pendente')
        setIsLoading(false)

    }

    return (
        <>
            <Head>
                <title>New Task | remind me</title>
            </Head>
            <Header />
            {session ?
                (<Box as='form' maxW='1120px' m='0 auto' pr='5' pl='5' mt='150px'>
                    <FormLabel>Título: </FormLabel>
                    <Input
                        type='text'
                        required
                        w={['100%', '100%', '60%']}
                        mb='10'
                        bg='gray.600'
                        border='none'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <FormLabel>Descrição: </FormLabel>
                    <Textarea
                        required
                        resize='none'
                        h='100px'
                        w={['100%', '100%', '60%']}
                        mb='10'
                        bg='gray.600'
                        border='none'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <FormLabel>Status: </FormLabel>
                    <RadioGroup defaultValue="pendente" mb='20'>
                        <Stack spacing={4} direction="row">
                            {statusValues.map(stat => (
                                <Radio
                                    key={stat.id}
                                    value={stat.value}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    {stat.value}
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>

                    <Stack spacing={3} direction='row' >
                        <Button
                            type='submit'
                            onClick={(e) => handleCreateTask(e)}
                            bg='transparent'
                            border='2px solid'
                            borderColor='blue.500'
                            color='blue.500'
                            _hover={{ bg: 'blue.500', color: 'white.900' }}
                            isLoading={isLoading}
                            loadingText='Salvando'
                            colorScheme='blue.500'
                            variant='solid'
                        >
                            Salvar
                        </Button>
                        <Link href='/dashboard'>
                            <Button bg='transparent' border='2px solid' borderColor='blue.500' color='blue.500' _hover={{ bg: 'blue.500', color: 'white.900' }}>Voltar</Button>
                        </Link>
                    </Stack>
                </Box>) : (
                    <LoginNotFound />
                )}
        </>
    )
}