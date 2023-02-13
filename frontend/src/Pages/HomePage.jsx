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
import { ProductsGetdata} from "../HOF/Productreducer/product.action";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { AddtocartProducts, Addtocart_products, CartlistGetdata } from "../HOF/Cartreducer/cart.action";
function HomePage() {
 const [page,setpage]=useState(1)
  const dispatch = useDispatch();
  const products = useSelector((store) => store.ProductsReducer);
  const ToknowWishlist = (Eyedata) => {
  //   if (cartdata.find((item) => Eyedata.id === item.id)) {
  //     return true;
  //   }
  //   return false;
  };
  useEffect(() => {
    dispatch(ProductsGetdata());
  }, []);
  return (
    <div>
      {/* Navbar started here*/}
      {/*here filter and sorting will come and some skeleton i will add*/}

      <Flex display={{md:"inherit",sm:"inherit"}} p="10px" mt="100px" w="100%">
        <Box w={"100%"}p="4">
          <ProductsLeftSection  page={page}/>
       </Box>
        {products.Loading ?
         <Box w={"100%"}p="4">
            <LoadingComponent />
            </Box>:
        <Grid
          w={{md:"100%",lg:"80%",xl:"80%","2xl":"80%",sm:"100%"}}
          m="auto"
          templateColumns={{
            lg: "repeat(3, 1fr)",
            xl: "repeat(3, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            "2xl":"repeat(3, 1fr)",
            base:"repeat(1, 1fr)"
          }}
          rowGap={5}
          gap={"4"} 
        >
           {products.Products.map((ele) => (
              <ProductItem
               item={ele}
              />
            ))}
          
        </Grid>}
      </Flex>
      <Box my="100px">
      <Button isDisabled={page==1} onClick={()=>setpage((pg)=>pg-1)}>Prev</Button>
      <Button>{page}</Button>
      <Button onClick={()=>setpage((pg)=>pg+1)}>Next</Button>
      </Box>      
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
const ProductsLeftSection = ({page}) => {
const [selectedBrand, setSelectedBrand] = useState([]);
const [selectedPrice, setSelectedPrice] = useState([]);
const [selectedType, setSelectedType] = useState([]);
const dispatch = useDispatch();
const products = useSelector((store) => store.ProductsReducer);
const cartdata=useSelector((store)=>store.CartReducer)
console.log(cartdata)
  // Price filter start from here==-----

useEffect(()=>{
  // dispatch(CartlistGetdata())
},[])
   // Type filter start from here==-----
  const handleFilterByType = (type) => {
    if (selectedType.includes(type)) {
      setSelectedType(selectedType.filter((b) => b !== type));
    } else {
      setSelectedType([...selectedType, type]);
    }
  };
   // Brand filter start from here==-----
  const handleFilterByBrand = (brand) => {
    if (selectedBrand.includes(brand)) {
      setSelectedBrand(selectedBrand.filter((b) => b !== brand));
    } else {
      setSelectedBrand([...selectedBrand, brand]);
    }
    // dispatch(ProductsGetdata(selectedBrand));
  };
const handleFilter=()=>{
  let alltype="";
  let allbrand="";
  selectedType.map((type)=>{
    alltype+=type+","
  })
  selectedBrand.map((brand)=>{
    allbrand+=brand+","
  })
  alltype=alltype.replace(/,\s*$/,"");
  allbrand=allbrand.replace(/,\s*$/,"");
let allquery={category:alltype,brand:allbrand}
console.log(allquery)
dispatch(ProductsGetdata("",allquery,page));
}
  const brands = ["RM", "levies", "safari", "peeter england", "HM"];
  const prices = ["450-900", "900-1500", "1500-2000", "2000 & Above"];
  const types = [ "jean", "shirt", "tshirt", "jacket", "shoe","hoodie"];
useEffect(()=>{
handleFilter()
},[selectedPrice,selectedBrand,selectedType,page])
  return (
    <Box
      display={{
        lg: "flex",
        xl: "flex",
        "2xl": "flex",
        md: "flex",
        sm: "flex",
      }}
      width={{
        lg: "30%",
        xl: "30%",
        "2xl": "30%",
        md: "40%",
        sm: "100%",
        base:"100%"
      }}
      style={{
        alignItems: "left",
        textAlign: "start",
        paddingLeft: "10px",
        fontSize: "15px",
        lineHeight: "25px",
        // margin:"auto",
        // alignSelf:"flex-start"
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
        <AccordionItem w="145px">
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
          <AccordionPanel position={"absolute"} bg="rgb(167, 173, 173)" className="Filter_Parents">
            {brands.map((brand) => (
              <div key={brand}>
                <input
                  type="checkbox"
                  value={brand}
                  onChange={() => handleFilterByBrand(brand)}
                  checked={selectedBrand.includes(brand)}
                />
                {brand}
              </div>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Accordion allowToggle w="30%">
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
                w="100%"
                className="Accordian_eyecare_left_dection"
                as="span"
                flex="1"
                textAlign="left"
              >
                Types
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel position={"absolute"} bg="rgb(167, 173, 173)" className="Filter_Parents">
            {types.map((type) => (
              <div key={type}>
                <input
                  type="checkbox"
                  value={type}
                  onChange={() => handleFilterByType(type)}
                  checked={selectedType.includes(type)}
                />
                {type}
              </div>
            ))}
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
     dispatch(AddtocartProducts(item))
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

        <Button onClick={handleAdd} mt="29px" color={"white"} background="green.500">Add To Cart</Button>
      </Box>
      </Box>
  );
};
export const LoadingComponent = () => {
  return (
    <Grid
      m="auto"
      w="80%"
      gap="2"
      templateColumns={{
        lg: "repeat(3, 1fr)",
        xl: "repeat(3, 1fr)",
        xl: "repeat(3, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(2, 1fr)",
        base:"repeat(1, 1fr)"
      }}
    >
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
        <SkeletonCircle size="20" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box  boxShadow="lg" bg="#CBD5E0">
      <SkeletonCircle size="20" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
      <SkeletonCircle size="20" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
      <SkeletonCircle size="20" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
      <SkeletonCircle size="20" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
      <SkeletonCircle size="20" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
      <SkeletonCircle size="20" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
      <SkeletonCircle size="20" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
      <SkeletonCircle size="20" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
      <SkeletonCircle size="20" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
      <SkeletonCircle size="20" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
      <SkeletonCircle size="20" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
    </Grid>
  );
};

// "title":"Relaxed Fit Hoodie",
// "description":"Hoodie in sweatshirt fabric made from a cotton blend with a print motif. Relaxed fit with a double-layered, drawstring hood, long sleeves, kangaroo pocket and ribbing at the cuffs and hem. Soft brushed inside.",
// "image":"https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F77%2F46%2F7746921f6b3af28793d9f47f65e6872ca7c9422c.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
// "review":[],
// "allimages":["https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F77%2F46%2F7746921f6b3af28793d9f47f65e6872ca7c9422c.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]","https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fa5%2F5e%2Fa55e3761ea878b852c35f01b1ad4391ed104368c.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D","https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F88%2F9d%2F889d74088c4bf7c4f52a2aec6f6aed6ae33174af.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D"],
// "price":499,"category":"hoodie","quantity":1,
// "total_quantity":58,
// "created_at":"09/01/2023",
// "ordered_at":"null",
// "cancelled_at":"null",
// "updated_at":"09/01/2023",
// "rating":4.9,
// "brand":"peeter england"