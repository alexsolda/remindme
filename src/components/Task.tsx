import { Flex, Tag, TagLabel, TagRightIcon, Text, Button, Icon } from "@chakra-ui/react";
import Link from "next/link";

import { animateOnRender } from 'styles/animations';

import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { dateFormatter } from "utils/dateFormatter";

interface Task {
    data: {
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
}

export function Task({ data }: Task) {

    const statusColor = data.data.task.status === 'concluído' ? 'green.500' : data.data.task.status === 'pendente' ? 'yellow.500' : 'red.500'
    const statusIcon = data.data.task.status === 'concluído' ? AiOutlineCheckCircle : data.data.task.status === 'pendente' ? AiOutlineInfoCircle : AiOutlineCloseCircle
    const dateFormatted = dateFormatter(data.data.task.createdAt);


    return (
        <Flex
            bg='gray.600'
            flex='1'
            p='5'
            borderRadius='5'
            borderLeft='8px solid'
            borderColor={statusColor}
            mb='10'
            animation={`${animateOnRender} 0.7s linear`}
        >
            <Flex flexDir='column' flex='1'>
                <Text textTransform='uppercase' fontSize='2xl' color={statusColor}>{data.data.task.title}</Text>
                <Text fontWeight='400' color='gray.50'>{data.data.task.description}</Text>
                <Text mb='5' fontWeight='200' fontSize='sm' color='gray.50'>{dateFormatted}</Text>
                <Tag w='110px' bg={statusColor} size='sm'>
                    <TagLabel>{data.data.task.status}</TagLabel>
                    <TagRightIcon as={statusIcon} fontSize='15' />
                </Tag>
            </Flex>
            <Link href={`/dashboard/task/${data.ref["@ref"].id}`}>
                <Button
                    size='sm'
                    color='blue.500'
                    bg='transparent'
                    border='1px solid'
                    borderColor='blue.500'
                    _hover={{ bg: 'blue.500', color: 'white.900' }}
                >
                    <Icon as={BiEditAlt} fontSize='20' />
                </Button>
            </Link>
        </Flex>
    )
}