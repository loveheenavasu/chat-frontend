import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Input } from '@chakra-ui/react'
import React from 'react'

const WebsiteCard = () => {
  return (
    <Box >
      <Card
        w={'100%'}
        padding={'20px'}
        textAlign={'start'}
        border={' 1px solid #e2e8f0'}
      >
        <Flex flexDirection={'column'} alignItems={'center'} >
          <CardHeader>
            <Heading size="md" textAlign={"start"} pt={"0px!important"}>
              {" "}
              Website
            </Heading>
          </CardHeader>
          <CardBody pt={"0px !important"} width={"100%"}>
            <Input placeholder='https://example.com/' />
          </CardBody>
          <CardFooter>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              gap={"10px"}
            >
              <Button
                sx={{ color: "white", backgroundColor: "#5188b9" }}
                colorScheme="blue"
              >
                {"Fetch links"}
              </Button>
            </Box>
          </CardFooter>
        </Flex>
      </Card>
    </Box>
  )
}

export default WebsiteCard