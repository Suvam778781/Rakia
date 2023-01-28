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
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

function SignUpPage() {
  
        const [showPassword, setShowPassword]=useState(false);
      
        return (
          <Flex 
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'} color= '#FFEF03'>
                  Sign up
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                
                </Text>
              </Stack>
              <Box bg='#FFEF03'
                rounded={'lg'}
                // bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <FormControl id="firstName" isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input type="text" />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastName" isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input type="text" />
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input type={showPassword ? 'text' : 'password'} />
                      <InputRightElement h={'full'}>
                        <Button
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }>
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg='white'
                      _hover={{
                        bg: '#FFEF03',
                        color:"black",
                      }}>
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={'center'}>
                      Already a user? <Link color="">Login</Link>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        );
}
export default SignUpPage
