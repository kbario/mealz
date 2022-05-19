import { Flex, Image, Heading, Text, Box, Button, ButtonGroup, Tag } from "@chakra-ui/react";

function RepoCard() {

    const repo = {
        name: "getCultured",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, architecto?",
        topics: ["node", "express", "javascript", "tailwindcss", "graphql"]
    }

    return (
        <Flex w="75%" borderRadius="sm" direction={"column"} _hover={{cursor:"default"}}>
            <Image 
                w={"100%"}
                h="50%"
                objectFit='cover' 
                align="center"
                src="https://repository-images.githubusercontent.com/470821465/15ba0dde-ef5f-4509-b0b3-75a8dba0ab12" 
                alt="repo description image"
                borderTopRadius="sm"  />
            <Flex p={3} direction="column" gap="2" bg={"blue.100"} borderBottomRadius="sm">
                <Heading variant="repocard">{repo.name}</Heading>
                <Flex gap="2" wrap="wrap">
                    {repo.topics.map((topic)=> (
                        <Tag >{topic}</Tag>
                    ))}
                </Flex>
                <Text>{repo.description}</Text>
                <ButtonGroup>
                    <Button>Deployed App</Button>
                    <Button>Github Repo</Button>
                </ButtonGroup>
            </Flex>
        </Flex>
    )
}

export default RepoCard