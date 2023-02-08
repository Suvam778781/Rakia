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
  SkeletonCircle,
  SkeletonText,
  Skeleton,
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
  const [product, setproduct] = useState(null);
  const [Loading,setLoading]=useState(true)
  const cartreducer = useSelector((state) => state.CartReducer);
  const userandadmin=useSelector((state)=>state.useradminReducer)
  const toast = useToast();
  const dispatch=useDispatch()
  const productsbyId = async () => {
    try{
      setLoading(true)
    let data = await axios.get(
      `https://comfortable-bass-poncho.cyclic.app/products/${params._id}`
    );
    setLoading(false)
    setproduct(data.data);
    }catch(err){

      setLoading(false)
    }
  };
  const handleAdd = () => {

   if (userandadmin.userloginSuc){
    dispatch(Addtocart_products(product))}
    else {
      toast({
        title: 'Add to Cart',
        description: "Please Login First.",
        status: 'error',
        duration: 4000,
        isClosable: true,
      })

    }
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
      {/* <Navbar /> */}

     {!Loading?<Container maxW={"100%"}  mt={{md:"200px",sm:"200px",base:"100px",lg:"100px",xl:'100px'}}>
        <Box display={{lg:"flex",xl:"flex",base:"inherit","2xl":"flex"}} 
        >
            <HStack mt="-160px" display={"flex"} w={{lg:"50%",xl:"50%",md:"100%"}} p="3">
          <Image
              border={"4px solid #38A169"}
              rounded={"20px"}
              alt={"product image"}
              src={product.allimages[0]}
              fit={"cover"}
              align={"center"}
              w={"50%"}
              h={{ base: "50%", sm: "50%", lg: "50%" }}
            />
            <Image
              border={"4px solid #38A169"}
              rounded={"20px"}
              alt={"product image"}
              src={product.allimages[1]}
              fit={"cover"}
            
              w={"50%"}
              h={{ base: "50%", sm:"50%", lg: "50%" }}
            />
            </HStack>
      
          <Stack  p="3" spacing={{ base: 6, md: 10 }}  w={{lg:"50%",xl:"50%",md:"100%"}}>
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
              bg="green.500"
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
        </Box>
      </Container>:
      <Box mt="100px" padding='6'  boxShadow='xl' justifyContent={"space-between"} bg='white' display={{xl:"flex",lg:"flex","2xl":"flex",base:"inherit"}}>
  <Skeleton height='450px' w={{xl:"47%",lg:"47%","2xl":"47%",base:"94%"}} ></Skeleton>
  <SkeletonText mt='4' w={{xl:"47%",lg:"47%","2xl":"47%",base:"94%"}}  h="600px"noOfLines={6} spacing='4' skeletonHeight='10' />
</Box>}
    </div>
  );
};
export default SingleProductPage;