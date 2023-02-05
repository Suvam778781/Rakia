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
  Flex
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
function HomePage() {
 
  const dispatch = useDispatch();
  const products = useSelector((store) => store.ProductsReducer);
  
  useEffect(() => {
    dispatch(Products_Getdata());

    
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
          gap={"2"} 
          p="20px"
        >
          {products.Loading ? (
            <LoadingComponent />
          ) : (
            products.Products.map((ele) => (
              <ProductItem
                title={ele.title}
                _id={ele._id}
                category={ele.category}
                description={ele.description}
                image={ele.image}
                brand={ele.brand}
                rating={ele.rating}
                price={ele.price}
                quantity={ele.quantity}
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
                onClick={() => HandleFilterByBrand("Sephora Collection")}
              >
                Sophera Collection
              </Link>
              <Link
                onClick={() => HandleFilterByBrand("CLINIQUE")}
                className="Filter_Brand_links"
              >
                CLINIQUE
              </Link>
              <Link
                onClick={() => HandleFilterByBrand("Anastasia Beverly Hills")}
                className="Filter_Brand_links"
              >
                Anastasia Beverly Hills
              </Link>
              <Link
                onClick={() => HandleFilterByBrand("HUDA BEAUTY")}
                className="Filter_Brand_links"
              >
                HUDA BEAUTY
              </Link>
              <Link
                onClick={() => HandleFilterByBrand("Benefit Cosmetics")}
                className="Filter_Brand_links"
              >
                Benefit Cosmetics
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
                onClick={() => HandleFilterByType("Pencil")}
                className="Filter_TYpe_links"
              >
                Eye Brows
              </Link>
              <Link
                onClick={() => HandleFilterByType("Shadow")}
                className="Filter_Type_links"
              >
                Eye Shadows
              </Link>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};
const ProductItem = ({
  title,
  _id,
  category,
  description,
  image,
  brand,
  rating,
  price,
  quantity,
}) => {
  return (
    <Link href={`/products/${_id}`} maxW="sm" borderWidth="1px"  overflow="hidden">
      <Image h="70%" src={image} alt={image} />
      <Box p="6">
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
          {title}
        </Box>
        <Box textAlign={"left"}>
          $:{price}
          <Box as="span" color="gray.600" fontSize="sm">
          
          </Box>
        </Box>
        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => {
              const roundedRating = Math.round(rating * 2) / 2;
              if (roundedRating - i >= 1) {
                return (
                  <BsStarFill
                    key={i}
                    style={{ marginLeft: "1" }}
                    color={i < rating ? "teal" : "gray"}
                  />
                );
              }
              if (roundedRating - i === 0.5) {
                return <BsStarHalf   key={i} style={{ marginLeft: "1" }} />;
              }
              return <BsStar key={i} style={{ marginLeft: "1" }} />;
            })}
          {/* <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box> */}
        </Box>
      </Box>
    </Link>
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
