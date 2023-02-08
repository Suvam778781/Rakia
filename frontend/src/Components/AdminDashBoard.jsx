import { Avatar, Box, Button, Flex,Text, VStack } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";
import "../App.css";
const AdminDashBoard = () => {
  return (
    <div>
      <Box
        w="100%" 
        px="20px"
        lineHeight={""}
        zIndex="21"
        boxShadow={"lg"}
        backgroundColor="white"
        position="fixed"
        h="60px"
        display={"flex"}
        justifyContent="space-between"
        m="auto"
      >
           <Box
          fontSize={"25px"}
          fontWeight="semibold"
          textDecoration="line-through"
          color={"green.500"}
          margin="auto 0px auto 0px" 
          style={{ fontFamily: "inherit" }}
        >
          RAKIA
        </Box>
        <Box display={"flex"}>
        <Avatar size={"sm"} margin="auto 0px auto 0px"   />
        <VStack
          display={{ base: "none", md: "flex" }}
          alignItems="flex-start"
          spacing="1px"
          margin="auto 0px auto 0px"  
          ml="2"
        >
          <Text fontSize="sm">Suvam Panda</Text>
          <Text fontSize="xs" color="gray.600">
            Admin
          </Text>
        </VStack>
        </Box>
      </Box>
      <Flex>
        <VStack
          transition="all 0.7s"
          m="auto"
          backgroundColor="white"
          w="14%"
          h="250px"
          mt="60px"
          zIndex={20}
        >
          <Button
            transition="all 0.3s"
            _hover={{ bg: "green.500", color: "white" }}
            justifyContent={"flex-start"}
            rounded="sm"
            background={"white"}
            className="admin_left_button"
          >
            History
          </Button>
          <Button
            transition="all 0.3s"
            _hover={{ bg: "green.500", color: "white" }}
            justifyContent={"flex-start"}
            rounded="sm"
            background={"white"}
            className="admin_left_button"
          >
            Cancelled orders
          </Button>
          <Button
            transition="all 0.3s"
            _hover={{ bg: "green.500", color: "white" }}
            justifyContent={"flex-start"}
            rounded="sm"
            background={"white"}
            className="admin_left_button"
          >
            Add New Product
          </Button>
          <Button
            transition="all 0.3s"
            _hover={{ bg: "green.500", color: "white" }}
            justifyContent={"flex-start"}
            rounded="sm"
            background={"white"}
            className="admin_left_button"
          >
            Delete Product
          </Button>
          <Button
            transition="all 0.3s"
            _hover={{ bg: "green.500", color: "white" }}
            justifyContent={"flex-start"}
            rounded="sm"
            background={"white"}
            className="admin_left_button"
          >
            Update Product
          </Button>
        </VStack>
        <Box
          h="600px"
          justifyContent={"flex-end"}
          w="86%"
          border={"1px solid"}
        ></Box>
      </Flex>
    </div>
  );
};
export default AdminDashBoard;
