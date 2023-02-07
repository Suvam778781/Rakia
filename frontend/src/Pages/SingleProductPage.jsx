import React from "react";
import Navbar from "../Components/Navbar";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Divider,
  Alert,
  useToast,
  Progress,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css"
import axios from "axios";
import { StarIcon } from "@chakra-ui/icons";
import { Addtocart_products } from "../HOF/Cartreducer/cart.action";
const SingleProductPage = () => {
  const params = useParams();
  const [product, setproduct] = useState({});
  const cartreducer = useSelector((state) => state.CartReducer);
  console.log(cartreducer)
  const toast = useToast();
  const dispatch=useDispatch()
  const productsbyId = async () => {
    let data = await axios.get(
      `https://comfortable-bass-poncho.cyclic.app/products/${params._id}`
    );
    setproduct(data.data);
  };
  const handleAdd = () => {

    dispatch(Addtocart_products(product))
  }
  useEffect(() => {
    productsbyId();
  }, []);

  if(cartreducer.CartSucces){
    toast({
      title: 'Add to cart.',
      description: "Product added succesfully to your cart.",
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
  }
  if(cartreducer.Error){
    toast({
      title: 'Add to cart.',
      description: "Somethiong went wrong while add product to the cart try again.",
      status: 'error',
      duration: 4000,
      isClosable: true,
    })
  }
  return (
    <div>
      <Navbar />
      <Container maxW={"8xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Stack>
            <Image
              mb="100px"
              border={"4px solid #38A169"}
              rounded={"20px"}
              alt={"product image"}
              src={product.image}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          </Stack>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={400}
                fontSize={{ base: "2xl", sm: "2xl", lg: "4xl" }}
              >
                {product.title}
              </Heading>
            </Box>
            <Divider borderColor={"green"} />
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={<Divider borderColor={"green"} />}
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={"lg"}>{product.description}</Text>
              </VStack>
              <Box mb="200px">
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={"green.500"}
                  fontWeight={"500"}
                  mb={"4"}
                >
                  DETAILS
                </Text>
                <Box display={"flex"} w="100%" justifyContent={"space-between"} columns={{ base: 1, md: 2 }} spacing={10}>
                  <List textAlign={"left"} spacing={2}>
                    <ListItem>Price:{product.price}</ListItem>
                    <ListItem>Category:{product.category}</ListItem>{" "}
                    <ListItem>Stock:{product.total_quantity}</ListItem>
                  </List>
                  <Box fontSize={"10px"}  w="50%"justifyContent="space-between"  display="flex" spacing={2}>
                  <HStack w="30%">
                      <HStack>
                        <Text color="green.500" fontSize={"40px"} fontWeight="bold">{product.rating}</Text>
                        <StarIcon w={8} h={8} color="green.500" m='10px'/>
                      </HStack>
                      </HStack>
                   <Box w="60%">
                    <HStack >
                      <Text className="review_heading">Excellent</Text>
                      <Box className="review_progress_bar"  >
                    
                      <Progress
                        width="100px"
                        my="10px"
                        value={70}
                        borderRadius={"7px"}
                        size="xs"
                        colorScheme="green"
                      />
                      </Box>
                    </HStack>
                    <HStack>
                      <Text className="review_heading">Very Good</Text>
                      <Box className="review_progress_bar"  >
                      <Progress
                        width="100px"
                        my="10px"
                        value={20}
                        borderRadius={"7px"}
                        size="xs"
                        colorScheme="green"

                      />
                      </Box>
                    </HStack>

                    <HStack>
                      <Text className="review_heading">Good</Text>{" "}
                      <Box className="review_progress_bar"  >
                     <Progress
                        width="100px"
                        my="10px"
                        value={16}
                        borderRadius={"7px"}
                        size="xs"
                        colorScheme="yellow"
                      />
                      </Box>
                    </HStack>
                    <HStack>
                      <Text className="review_heading">Average</Text>{" "}
                      <Box className="review_progress_bar"  >
                     <Progress
                        width="100px"
                        my="10px"
                        value={15}
                        borderRadius={"7px"}
                        size="xs"
                        colorScheme="pink"
                      /></Box>
                    </HStack>
                    <HStack>
                      <Text className="review_heading">Poor</Text>{" "}
                      <Box className="review_progress_bar">
                      <Progress
                        width="100px"
                        my="10px"
                        value={10}
                        borderRadius={"7px"}
                        size="xs"
                        colorScheme="red"
                      />
                      </Box>
                    </HStack>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Stack>
            <Button
              w={"300px"}
              size={"md"}
              py={"7"}
              onClick={handleAdd}
              bg={useColorModeValue("green.500", "gray.50")}
              _hover={{
                transform: "translateY(4px)",
                boxShadow: "md",
              }}
              color="white"
            >
             {cartreducer.CartLoading ?<Spinner/>:"ADD TO CART"}
            </Button>
            <Divider borderColor={"green"} />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
            >
              <MdLocalShipping />
              <Text>6-7 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </div>
  );
};
export default SingleProductPage;
