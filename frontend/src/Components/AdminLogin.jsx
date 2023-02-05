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
    useToast,
  } from '@chakra-ui/react';
  import { useDispatch, useSelector } from "react-redux";
  import {Navigate} from "react-router-dom"
  import { admin_login,} from '../HOF/User&AdminReducer/UA.action';
import Navbar from './Navbar';
function AdminLogin() {
const [formdata,setformdata]=useState({email:"",pass:""})
const dispatch=useDispatch()
const userandadmin=useSelector((state)=>state.useradminReducer)
const toast=useToast()
const HandleonChange=(e)=>{
const {name,value}=e.target
  setformdata({...formdata,[name]:value})
}
const HandleSubmit=()=>{

    if(formdata.email&&formdata.pass){

    toast({
        title: 'Login Succesfully.',
        description: "Redirected To Home Page.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

    }
    else{

        toast({
            title: 'Login Faild.',
            description: "Fill All The Fields.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
    }

  // console.log(formdata)
// dispatch(admin_login(formdata))
}
// if(userandadmin.userloginSuc){

//   return <Navigate to="/"/>
// }
// if(userandadmin.adminloginSuc){
//   return <Navigate to="/admin/dashboard"/>
// }
    return (
        <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg="rgb(167, 173, 173)">
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Text fontSize={"30px"} fontWeight="bold" color="white">Admin Login</Text>
          <Box
            bg="RGBA(0, 0, 0, 0.64)"
            boxShadow={'sm'}
            color="white"
            p={8}>
            <Stack spacing={5} >
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input  onChange={(e)=>HandleonChange(e)} isRequired="true" value={formdata.email} name="email"  type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input onChange={(e)=>HandleonChange(e)} value={formdata.pass} name="pass" type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'green.500'}>Forgot password?</Link>
                </Stack>
                <Button
                   onClick={HandleSubmit}
                     loadingText="Submitting"
                     size="lg"
                     bg='white'
                     color={"black"}
                     _hover={{
                       bg:'green.500',
                       color:"black",
                     }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>

    </>  
    );
}
export default AdminLogin
