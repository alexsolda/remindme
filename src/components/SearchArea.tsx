import { Box, Flex, Icon, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import { BsSearch } from 'react-icons/bs';

interface Tasks {
    ref: {
        '@ref': {
            id: string
        }
    },
    data: {
        task: {
            title: string;
            description: string;
            createdAt: string;
            status: string;
        }
    }
}

interface SearchAreaProps {
    tasksSetter: any;
    tasks: { data: Tasks[] }
}


export function SearchArea({ tasks, tasksSetter }: SearchAreaProps) {

    const [title, setTtitle] = useState('');

    const handleFilterByTitle = () => {

        const filteredByTitle = tasks.data.filter(task => {
            if (task.data.task.title.includes(title.toLowerCase())) {
                return { ...task }
            }
        })

        tasksSetter(filteredByTitle)
    }

    const handleFilterStatus = (e: string) => {

        if (e === 'todos') {
            const ordenatedTasks = tasks.data.slice(0).reverse()
            tasksSetter(ordenatedTasks)
            return
        }

        const filtered = tasks.data.filter(task => {
            if (task.data.task.status === e) {
                return { ...task }
            }
        })

        tasksSetter(filtered.slice(0).reverse())
    }


    return (
        <Flex flexDir={['column', 'row', 'row']} mb='10'>
            <Flex alignItems='center' bg='gray.600' borderRadius='5' mb={[5, 0, 0]} flex='3' mr={[0, 10]} >
                <Input
                    type='search'
                    placeholder='Pesquisar...'
                    outline='transparent'
                    focusBorderColor='blue.500'
                    border='none'
                    flex='1'
                    value={title}
                    onChange={e => setTtitle(e.target.value)}
                />
                <Icon
                    as={BsSearch}
                    cursor='pointer'
                    h='100%'
                    ml='5'
                    mr='5'
                    w='20px'
                    _hover={{ color: 'blue.500' }}
                    onClick={() => handleFilterByTitle()}
                />
            </Flex>
            <Select flex='1' bg='gray.600' focusBorderColor='blue.500' variant='filled' _hover={{ bg: 'gray.600' }} onChange={e => handleFilterStatus(e.target.value)} >
                <option value='todos' >Todos</option>
                <option value='concluído' >Concluído(s)</option>
                <option value='cancelado' >Cancelado(s)</option>
                <option value='pendente' >Pendente(s)</option>
            </Select>
        </Flex>
    )
}