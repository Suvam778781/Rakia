import {
  Avatar,
  Box,
  Button,
  Text,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
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
          <Avatar size={"sm"} margin="auto 0px auto 0px" />
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

      <Flex pt="70px">
        <VStack
          transition="all 0.5s"
          m="auto"
          backgroundColor="white"
          w="14%"
          h="250px"
          mt="60px"
          zIndex={20}
          shadow="sm"
        >
          <Button
            transition="all 0.5s"
            _hover={{ bg: "green.500", color: "white" }}
            justifyContent={"flex-start"}
            rounded="md"
            background={"white"}
            className="admin_left_button"
          >
            Order History
          </Button>
          <Button
            transition="all 0.5s"
            _hover={{ bg: "green.500", color: "white" }}
            justifyContent={"flex-start"}
            rounded="md"
            background={"white"}
            className="admin_left_button"
          >
            Cancelled orders
          </Button>
          <Button
            transition="all 0.5s"
            _hover={{ bg: "green.500", color: "white" }}
            justifyContent={"flex-start"}
            rounded="md"
            background={"white"}
            className="admin_left_button"
          >
            Add New Product
          </Button>
          <Button
            transition="all 0.5s"
            _hover={{ bg: "green.500", color: "white" }}
            justifyContent={"flex-start"}
            rounded="md"
            background={"white"}
            className="admin_left_button"
          >
            Delete Product
          </Button>
          <Button
            transition="all 0.5s"
            _hover={{ bg: "green.500", color: "white" }}
            justifyContent={"flex-start"}
            rounded="md"
            background={"white"}
            className="admin_left_button"
          >
            Update Product
          </Button>
        </VStack>
        <Box
        
          justifyContent={"flex-end"}
          w="86%"
        
        >

<OrderData/>
        </Box>
      </Flex>
      <Flex>
      

</Flex>
    </div>
  );
};
export default AdminDashBoard;

export function Card({stat,icon,title}) {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"md"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export function OrderData() {
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
     
      </h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <Card
          title={"Users"}
          stat={"5,000"}
          icon={<BsPerson size={"3em"} />}
        />
          <Card
            title={"Admins"}
            stat={"7"}
            icon={<BsPerson size={"3em"} />}
          />
        <Card
          title={"Products"}
          stat={"1,000"}
          icon={<FiServer size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}
