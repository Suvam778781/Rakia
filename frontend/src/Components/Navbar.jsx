import { Search2Icon } from '@chakra-ui/icons'
import { Box, HStack, Input, Link } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Products_Getdata } from '../HOF/Productreducer/product.action'

export default function Navbar() {
  const [search,setsearch]=useState("")
  const dispatch=useDispatch()
  const HandleSearch = () => {
    dispatch(Products_Getdata(search));
  };
  return (
    <div style={{height:'60px'}}mb="10px" >
      <HStack
      zIndex={20}
        w="100%"
        px="30px"
        bg="rgb(167, 173, 173)"
        boxShadow={"lg"}
        justifyContent={"space-between"}
        position="fixed"
        top="0"
        h="60px"
      >
        <Box
          fontSize={"25px"}
          fontWeight="semibold"
          textDecoration="line-through"
          color={"green.500"}
          style={{ fontFamily: "inherit" }}
        >
          RAKIA
        </Box>
        <Box>
          {/* <InputAddon> */}
          <Input
            w="400px"
            type={"text"}
            _focus={{ boxShadow: "none", borderBottom: "1px solid white" }}
            placeholder="Enter..."
            borderRadius={"0px"}
            border="none"
            onChange={(e)=>setsearch(e.target.value)}
            value={search}
            borderBottom="1px solid white"
            h="30px"
            color="gray"
            _placeholder={{ color: "grey" }}
          />
          {/* </InputAddon> */}
          <Search2Icon ml="10px" color={"white"} onClick={HandleSearch} />
        </Box>
        <HStack
          justifyContent={"space-between"}
          w="10%"
          fontWeight={"bold"}
          color={"white"}
        >
          <Box>
            <Link>Cart</Link>
          </Box>
          <Box>
            <Link href="/login">Login</Link>
          </Box>
        </HStack>
      </HStack>
    </div>
  )
}