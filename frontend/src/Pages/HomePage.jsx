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
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BsHeartFill, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Products_Getdata } from "../HOF/Productreducer/product.action";
function HomePage() {
  const [alldata, setalldata] = useState([]);
  const dispatch = useDispatch();
  const products = useSelector((store) => store.ProductsReducer);
  console.log(products);

  useEffect(() => {
    dispatch(Products_Getdata());
  }, []);

  const HandleFilterByType = () => {};
  const HandleFilterByBrand = () => {};
  const HandleFilterByPrice = () => {};

  const HandleSearch = () => {};
  return (
    <div>
      {/* Navbar started here*/}
      <HStack
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
          color={"white"}
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
      {/*her filter and sorting will come and some skeleton i will add*/}

      <HStack m="auto" p="10px" mt="100px" w="100%">
        <VStack w="20%">
          <ProductsLeftSection />
        </VStack>

        <Grid templateColumns='repeat(3, 1fr)' w="80%" gap={"2"} border={"1px solid"} m="auto" p="20px">


        {!products.Loading&&products.Products.map((ele)=>
        <ProductItem
          title={ele.title}
          category={ele.category}
          description={ele.description}
          image={ele.image}
          brand={ele.brand}
          rating={ele.rating}
          price={ele.price}
          quantity={ele.quantity}
        />
        )}

        </Grid>
      </HStack>
    

      <Footer />
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
      <Box></Box>
      {/* accordian start fron here */}

      <Box
        lineHeight={2}
        w="100%"
        display={{
          lg: "block",
          xl: "block",
          "2xl": "block",
          md: "flex",
          sm: "flex",
        }}
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
const Footer = () => {
  return <Box h="200px" bg="rgb(167, 173, 173)"></Box>;
};

const ProductItem = () => {
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4.5,
  };
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={property.imageUrl} alt={property.imageAlt} />
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {property.title}
        </Box>
        <Box>
          {property.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box>
        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => {
              const roundedRating = Math.round(property.rating * 2) / 2;
              if (roundedRating - i >= 1) {
                return (
                  <BsStarFill
                    key={i}
                    style={{ marginLeft: "1" }}
                    color={i < property.rating ? "teal.500" : "gray.300"}
                  />
                );
              }
              if (roundedRating - i === 0.5) {
                return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
              }
              return <BsStar key={i} style={{ marginLeft: "1" }} />;
            })}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
