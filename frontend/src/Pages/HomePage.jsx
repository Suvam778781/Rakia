import { Search2Icon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Input,
  InputAddon,
  Link,
  Image,
  Badge,
  VStack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Grid,
  SkeletonCircle,
  SkeletonText,
  
  Text,
  Flex,
  Button,
  useToast
} from "@chakra-ui/react";
import {
  Container,
  SimpleGrid,
  Stack,
  VisuallyHidden,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';

import React from "react";
import { useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BsHeartFill, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Products_Getdata } from "../HOF/Productreducer/product.action";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Addtocart_products } from "../HOF/Cartreducer/cart.action";
function HomePage() {
 
  const dispatch = useDispatch();
  const products = useSelector((store) => store.ProductsReducer);
  
  useEffect(() => {
    dispatch(Products_Getdata());
//     "title":"Relaxed Fit Rugby shirt",
// "description":"Relaxed-fit rugby shirt in soft cotton jersey with a collar, concealed button placket, long sleeves with ribbed cuffs, and slits in the sides of the hem.",
// "image":"https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fa8%2F35%2Fa83515af7b9fe1ea8e105401277566838e168478.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
// "review":[],
// "allimages":["https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fa8%2F35%2Fa83515af7b9fe1ea8e105401277566838e168478.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D","https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fdb%2F86%2Fdb86c17f6717df65ef3625de324102b8714e92eb.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]","https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fdf%2F9a%2Fdf9ae6d6c695624c2701e8f2bba633a26058c036.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D"],
// "price":577,"category":"hoodie","quantity":1,
// "total_quantity":50,
// "created_at":"8/01/2023",
// "ordered_at":"null",
// "cancelled_at":"null",
// "updated_at":"8/01/2023",
// "rating":4.5,
// "brand":"BEAT LONDON"
  }, []);
  const HandleFilterByType = () => {};
  const HandleFilterByBrand = () => {};
  const HandleFilterByPrice = () => {};

  return (
    <div>
      {/* Navbar started here*/}
      {/*her filter and sorting will come and some skeleton i will add*/}

      <Flex  p="10px" mt="100px" w="100%">
        <Box w="20%">
          <ProductsLeftSection />
        </Box>
        <Grid
          w="100%"
          m="auto"
          templateColumns={{
            lg: "repeat(3, 1fr)",
            xl: "repeat(3, 1fr)",
            xl: "repeat(3, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          rowGap={1}
          gap={"4"} 
          
        >
          {products.Loading ? (
            <LoadingComponent />
          ) : (
            products.Products.map((ele) => (
              <ProductItem
               item={ele}
              />
            ))
          )}
        </Grid>
      </Flex>
    </div>
  );
}
export default HomePage;
// Lets take an example of e-commerce applications
// **User side features**
// - Landing Page
// - Search functionality
// - Search by category
// - Sort, Filter by rating, price
// - See individual product page
// - Add to cart
// - See cart details and total price in it
// - Make a purchase, and track status
// - See historical order
// - Payment ,Checkout pages
// - Login, Register Pages


const ProductsLeftSection = ({
  HandleFilterByType,
  HandleFilterByBrand,
  HandleFilterByPrice,
}) => {
  return (
    <Box
      display={{
        lg: "inherit",
        xl: "inherit",
        "2xl": "inherit",
        md: "flex",
        sm: "flex",
      }}
      style={{
        alignItems: "left",
        textAlign: "start",
        paddingLeft: "10px",
        fontSize: "15px",
        lineHeight: "25px",
      }}
    >
      {/* <Box></Box> */}
      {/* accordian start fron here */}

      <Box
        lineHeight={2}
        w="100%"
        display={{
          lg: "inherit",
          xl: "inherit",
          "2xl": "inherit",
          md: "flex",
          sm: "flex",
        }}
        mt="10px"
      >
        <Accordion allowToggle w="100%">
          <AccordionItem w="100%">
            <h2>
              <AccordionButton
                backgroundColor="white"
                _expanded={{
                  bg: "rgb(167, 173, 173)",
                  color: "white",
                  borderBottom: "1px solid",
                }}
              >
                <Box
                  w="180px"
                  className="Accordian_eyecare_left_dection"
                  as="span"
                  flex="1"
                  textAlign="left"
                >
                  Brand
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel bg="rgb(167, 173, 173)" className="Filter_Parents">
              <Link
                className="Filter_Brand_links"
                onClick={() => HandleFilterByBrand("All")}
              >
                All
              </Link>
              <Link
                display={"block"}
                className="Filter_Brand_links"
                onClick={() => HandleFilterByBrand("RM")}
              >
                RM
              </Link>
              <Link
                onClick={() => HandleFilterByBrand("levies")}
                className="Filter_Brand_links"
              >
              Levies
              </Link>
              <Link
                onClick={() => HandleFilterByBrand("Safari")}
                className="Filter_Brand_links"
              >
                Safari
              </Link>
              <Link
                onClick={() => HandleFilterByBrand("peeter england")}
                className="Filter_Brand_links"
              >
               Peeter England
              </Link>
              <Link
                onClick={() => HandleFilterByBrand("HM")}
                className="Filter_Brand_links"
              >
                HM
              </Link>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        {/* Price Accordian here */}
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton
                backgroundColor="white" 
                _expanded={{
                  bg: "rgb(167, 173, 173)",
                  color: "white",
                  borderBottom: "1px solid",
                }}
              >
                <Box
                  className="Accordian_eyecare_left_dection"
                  as="span"
                  flex="1"
                  textAlign="left"
                >
                  Price
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel className="Filter_Parents">
              <Link
                className="Filter_Price_links"
                onClick={() => HandleFilterByPrice("price")}
              >
                All Price
              </Link>
              <Link
                className="Filter_Price_links"
                onClick={() => HandleFilterByPrice("price1")}
              >
                450-900
              </Link>
              <Link
                className="Filter_Price_links"
                onClick={() => HandleFilterByPrice("price2")}
              >
                900-1500
              </Link>
              <Link
                className="Filter_Price_links"
                onClick={() => HandleFilterByPrice("price3")}
              >
                1500-2000
              </Link>
              <Link
                className="Filter_Price_links"
                onClick={() => HandleFilterByPrice("price4")}
              >
                2000 & Above
              </Link>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        {/* Type Accordian here */}

        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton
                backgroundColor="white"
                _expanded={{
                  bg: "rgb(167, 173, 173)",
                  color: "white",
                  borderBottom: "1px solid",
                }}
              >
                <Box
                  className="Accordian_eyecare_left_dection"
                  m="auto"
                  as="span"
                  flex="1"
                  textAlign="left"
                >
                  Type
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel className="Filter_Parents">
              <Link
                className="Filter_Type_links"
                onClick={() => HandleFilterByType("All")}
              >
                All Types
              </Link>
              <Link
                onClick={() => HandleFilterByType("Jeans")}
                className="Filter_TYpe_links"
              >
                Jeans
              </Link>
              <Link
                onClick={() => HandleFilterByType("Hoodies")}
                className="Filter_Type_links"
              >
                Hoodies
              </Link>
              <Link
                onClick={() => HandleFilterByType("Shirt")}
                className="Filter_Type_links"
              >
              Shirt
              </Link>
              <Link
                onClick={() => HandleFilterByType("Tshirt")}
                className="Filter_Type_links"
              >
                Tshirt
              </Link>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};
const ProductItem = ({item}) => {
  const cartreducer = useSelector((state) => state.CartReducer);
  const userandadmin=useSelector((state)=>state.useradminReducer)
const dispatch=useDispatch()
const toast=useToast()
  const handleAdd = () => {
    if (userandadmin.userloginSuc){
     dispatch(Addtocart_products(item))
     toast({
      title: 'Add to Cart',
      description: "Product Added Succesfully.",
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
    }
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
  return (
    <Box  boxShadow={"md"} >
    <Link href={`/products/${item._id}`} w="100%"  overflow="hidden">
      <Image w="100%" src={item.image} alt={item.image} />
      </Link>
      <Box p="7">
        <Box display="flex" alignItems="baseline">
          {/* <Badge borderRadius="full" px="2" colorScheme="red">
            New
          </Badge> */}
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          textAlign={"left"}
          noOfLines={1}
        >
          {item.title}
        </Box>
        <Box textAlign={"left"}>
        ₹ {item.price}
          <Box as="span" color="gray.600" fontSize="sm">
           
          </Box>
        </Box>
        <Box display="flex" mt="2" justifyContent={"space-between"} alignItems="center">
          <Box w="30%" display="flex">
          {Array(5)
            .fill("")
            .map((_, i) => {
              const roundedRating = Math.round(item.rating * 2) / 2;
              if (roundedRating - i >= 1) {
                return (
                  <BsStarFill
                    key={i}
                    style={{ marginLeft: "1" }}
                    color={i < item.rating ? "#38A169" : "gray"}
                  />
                );
              }
              if (roundedRating - i === 0.5) {
                return <BsStarHalf   key={i} style={{ marginLeft: "1" }} />;
              }
              return <BsStar key={i} style={{ marginLeft: "1" }} />;
            })}
            </Box>
            <Box>{item.rating}</Box>
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
           ( {item.review.length} reviews)
          </Box>
        </Box>

        <Button onClick={handleAdd} my="8px" color={"white"} background="green.500">Add To Cart</Button>
      </Box>
      </Box>
  );
};
export const LoadingComponent = () => {
  return (
    <Grid
      ml="20px"
      w="1000px"
      gap="2"
      templateColumns={{
        lg: "repeat(3, 1fr)",
        xl: "repeat(3, 1fr)",
        xl: "repeat(3, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(2, 1fr)",
      }}
    >
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
        <SkeletonCircle size="20" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
        <SkeletonCircle size="10" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
        <SkeletonCircle size="10" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
        <SkeletonCircle size="10" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
        <SkeletonCircle size="10" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
        <SkeletonCircle size="10" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
        <SkeletonCircle size="10" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
        <SkeletonCircle size="10" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
        <SkeletonCircle size="10" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
        <SkeletonCircle size="10" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
        <SkeletonCircle size="10" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
        <SkeletonCircle size="10" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
    </Grid>
  );
};
