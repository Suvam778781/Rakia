import { Badge, Box, Grid, Image, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function Orders() {
const [orderloading,setOrderloading]=useState(true)
const [userdata,setuserdata]=useState({})
  const SingleUser=async()=>{
    setOrderloading(true)
    let token=localStorage.getItem("token")||"";
    let user=await axios
    (`${process.env.REACT_APP_BASE_URL}/users/singleuser`,{
    headers:{
      Authorization:token
    }
    })
    setOrderloading(false)
    setuserdata(user.data);
      }
useEffect(()=>{
SingleUser() 
},[])

console.log(userdata)
  return (
    <Box m="auto" w="100%" my="60px">
      <Box>
      <Badge fontSize={"30px"}>My Orders</Badge>
      </Box>
 <Grid gridAutoColumns={"repeat(1,1fr)"} gap="2" m="auto" mt="100px">
 {orderloading?<Box w="70%" m="auto"> <Spinner size={"xl"}/></Box>:userdata.allorders.map((ele)=>
<Box overflow={"hidden"} h="200px"  m="auto" w="90%"border ="1px solid" borderRadius={"5px"} shadow={"md"} >
<Image  w="10%" h="100%" src={ele.image}/>
</Box> 
)}
</Grid>
    </Box>
  )
}

export default Orders
