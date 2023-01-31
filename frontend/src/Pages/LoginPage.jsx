import React, { useState } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
const LoginPage = () => {
const [formdata,setformdata]=useState({email:"",password:""})
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
        bg="rgb(167, 173, 173)">
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg="RGBA(0, 0, 0, 0.64)"
            boxShadow={'lg'}
            color="white"
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input  onChange={(e)=>HandleonChange(e)} value={formdata.email} name="email"  type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input onChange={(e)=>HandleonChange(e)} value={formdata.password} name="password" type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'#63B3ED'}>Forgot password?</Link>
                </Stack>
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
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>

      
    );
  
}

export default LoginPage
