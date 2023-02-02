import React, { useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';

function SignUpPage() {
const [formdata,setformdata]=useState({firstname:"",lastname:"",email:"",password:""})
const HandleonChange=(e)=>{
const {name,value}=e.target
  setformdata({...formdata,[name]:value})
}
const HandleSubmit=()=>{
console.log(formdata)
}     
        return (
          <Flex 
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg="rgb(167, 173, 173)"
            >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} >
              <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'} >
                  Sign up
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                </Text>
              </Stack>
              <Box bg='RGBA(0, 0, 0, 0.64)' color={"white"}
                
                // bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={5}>
                  <HStack>
                    <Box>
                      <FormControl id="firstName" isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input  onChange={(e)=>HandleonChange(e)} value={formdata.firstname} name="firstname"  type="text" />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastName">
                        <FormLabel>Last Name</FormLabel>
                        <Input  onChange={(e)=>HandleonChange(e)} value={formdata.lastname} name="lastname"  type="text" />
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl id="email" >
                    <FormLabel>Email address</FormLabel>
                    <Input  onChange={(e)=>HandleonChange(e)} value={formdata.email} name="email"  type="email" />
                  </FormControl>
                  <FormControl id="password" >
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input  onChange={(e)=>HandleonChange(e)} value={formdata.password} name="password"   type={"password"}/>
                    </InputGroup>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button 
                      onClick={HandleSubmit}
                      loadingText="Submitting"
                      size="lg"
                      bg='white'
                      color={"black"}
                      _hover={{
                        bg:'#63B3ED',
                        color:"black",
                      }}>
                      Sign up
                    </Button>
                  </Stack>
                  
                  <Stack pt={6}>
                    <Text align={'center'}>
                      Already a user? <Link color="#63B3ED" fontWeight={"bold"}>Login</Link>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        );
}
export default SignUpPage
