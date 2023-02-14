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
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import {
  Container,
  SimpleGrid,
  Stack,
  VisuallyHidden,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";

import React from "react";
import { useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  BsArrowBarLeft,
  BsArrowBarRight,
  BsHeartFill,
  BsStar,
  BsStarFill,
  BsStarHalf,
} from "react-icons/bs";
import { ProductsGetdata } from "../HOF/Productreducer/product.action";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import {
  AddtocartProducts,
  Addtocart_products,
  CartlistGetdata,
} from "../HOF/Cartreducer/cart.action";
function HomePage() {
  const [page, setpage] = useState(1);
  const dispatch = useDispatch();
  const products = useSelector((store) => store.ProductsReducer);
  const cartdata = useSelector((state) => state.CartReducer);
  const ToknowWishlist = (data) => {
    console.log(data)
      if (cartdata.Cart.find((item) => data._id === item._id)) {
        return true;
      }
      return false;
  };
  useEffect(() => {
    dispatch(CartlistGetdata());
  }, []);
  useEffect(() => {
    dispatch(ProductsGetdata());
  }, []);
  return (
    <div>
      {/* <Carousel/> */}
      {/*here filter and sorting will come and some skeleton i will add*/}

      <Flex
        display={{ md: "inherit", sm: "inherit" }}
        p="10px"
        mt="100px"
        w="100%"
      >
        <Box w={"100%"} p="4">
          <ProductsLeftSection page={page} />
        </Box>
        {products.Loading ? (
          <Box w={"100%"} p="4">
            <LoadingComponent />
          </Box>
        ) : (
          <Grid
            w={{ md: "80%", lg: "80%", xl: "80%", "2xl": "80%", sm: "90%" }}
            m="auto"
            templateColumns={{
              lg: "repeat(3, 1fr)",
              xl: "repeat(3, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              "2xl": "repeat(3, 1fr)",
              base: "repeat(1, 1fr)",
            }}
            rowGap={5}
            gap={"4"}
          >
            {products.Products.map((ele) => (
              <ProductItem ToknowWishlist={ToknowWishlist} item={ele} />
            ))}
          </Grid>
        )}
      </Flex>
      <Box my="100px">
        <Button isDisabled={page == 1} onClick={() => setpage((pg) => pg - 1)}>
          Prev
        </Button>
        <Button>{page}</Button>
        <Button onClick={() => setpage((pg) => pg + 1)}>Next</Button>
      </Box>
      <Box w="80%" mx="auto" overflow={"hidden"}>
        <Carousel />
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
const ProductsLeftSection = ({ page }) => {
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const dispatch = useDispatch();
  const products = useSelector((store) => store.ProductsReducer);
  const cartdata = useSelector((store) => store.CartReducer);
  let allfilter = [...selectedBrand, ...selectedType];

  console.log(allfilter);
  const converttoUpper = (str) => {
    str = str
      .split(" ")
      .map((ele) => {
        return ele.charAt(0).toUpperCase() + ele.slice(1);
      })
      .join(" ");
    return str;
  };
  // Price filter start from here==-----

  useEffect(() => {
    // dispatch(CartlistGetdata())
  }, []);
  // Type filter start from here==-----
  const handleFilterByType = (type) => {
    if (selectedType.includes(type)) {
      setSelectedType(selectedType.filter((b) => b !== type));
    } else {
      setSelectedType([...selectedType, type]);
    }
  };
  // generate random color
  const generateRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
  const handleFilter = () => {
    let alltype = "";
    let allbrand = "";
    selectedType.map((type) => {
      alltype += type + ",";
    });
    selectedBrand.map((brand) => {
      allbrand += brand + ",";
    });
    alltype = alltype.replace(/,\s*$/, "");
    allbrand = allbrand.replace(/,\s*$/, "");
    let allquery = { category: alltype, brand: allbrand };
    dispatch(ProductsGetdata("", allquery, page));
  };
  const brands = ["RM", "levies", "safari", "peeter england", "HM"];
  const prices = ["450-900", "900-1500", "1500-2000", "2000 & Above"];
  const types = ["jean", "shirt", "tshirt", "jacket", "shoe", "hoodie"];
  useEffect(() => {
    handleFilter();
  }, [selectedPrice, selectedBrand, selectedType, page]);
  return (
    <>
      <Box h="100px" display={"flex"} w="100%"  fontSize="17px">
        {allfilter.map((ele) => (
         
         <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',marginLeft:"10px" }}>
         <input style={{margin:"auto",height:"17px",width:"14px"}} type="checkbox"  value="checkbox2" checked="true" />
         <label htmlFor="checkbox2">{converttoUpper(ele)}</label>
       </div>
          
        ))}
      </Box>

      <Box
        display={{
          lg: "flex",
          xl: "flex",
          "2xl": "flex",
          md: "flex",
          sm: "flex",
        }}
        width={{
          lg: "40%",
          xl: "40%",
          "2xl": "40%",
          md: "40%",
          sm: "40%",
          base: "40%",
        }}
        style={{
          alignItems: "left",
          textAlign: "start",
    
          fontSize: "15px",
          lineHeight: "25px",
        }}
      >
        {/* <Box></Box> */}
        {/* accordian start fron here */}

        <Text alignItems={"center"} fontSize="20px"  color ="green.500"w="100px" display={"flex"} m="auto" my="20px" mr="12px">FILTER :</Text>
        <Box
          lineHeight={2}
          w="100%"
          display={{
            lg: "flex",
            xl: "flex",
            "2xl": "flex",
            md: "flex",
            sm: "flex",
          }}
          mt="10px"
        >
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
              <AccordionPanel
                position={"absolute"}
                bg="rgb(167, 173, 173)"
                className="Filter_Parents"
              >
                {brands.map((brand) => (
                  <div className="checkbox-container" key={brand}>
                    <input
                      id="checkbox"
                      className="checkbox-input"
                      type="checkbox"
                      value={brand}
                      onChange={() => handleFilterByBrand(brand)}
                      checked={selectedBrand.includes(brand)}
                    />
                    <Box className="checkbox-label">
                      {" "}
                      {converttoUpper(brand)}
                    </Box>
                  </div>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Accordion allowToggle w="30%">
            <AccordionItem  w="100%">
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
                    Types
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel
                position={"absolute"}
                bg="rgb(167, 173, 173)"
                className="Filter_Parents"
              >
                {types.map((type) => (
                  <div key={type}>
                    <input style={{marginLeft:"20px",marginRight:"10px",color:"gray"}}
                      type="checkbox"
                      color="gray"
                      value={type}
                      onChange={() => handleFilterByType(type)}
                      checked={selectedType.includes(type)}
                    />
                    {converttoUpper(type)}
                  </div>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </>
  );
};
const ProductItem = ({ item,ToknowWishlist }) => {
  const cartreducer = useSelector((state) => state.CartReducer);
  const userandadmin = useSelector((state) => state.useradminReducer);
  const dispatch = useDispatch();
  const toast = useToast();
  const handleAdd = () => {
    if (userandadmin.userloginSuc) {
      dispatch(AddtocartProducts(item));
      toast({
        title: "Add to Cart",
        description: "Product Added Succesfully.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Add to Cart",
        description: "Please Login First.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  return (
    <Box boxShadow={"md"}>
      <Link href={`/products/${item._id}`} w="100%" overflow="hidden">
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
          <Box as="span" color="gray.600" fontSize="sm"></Box>
        </Box>
        <Box
          display="flex"
          mt="2"
          justifyContent={"space-between"}
          alignItems="center"
        >
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
                  return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
                }
                return <BsStar key={i} style={{ marginLeft: "1" }} />;
              })}
          </Box>
          <Box>{item.rating}</Box>
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            ( {item.review.length} reviews)
          </Box>
        </Box>

        <Button
          onClick={handleAdd}
          mt="29px"
          color={"white"}
          background="green.500"
          isDisabled={ToknowWishlist(item)} 
        >
          Add To Cart
        </Button>
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
        base: "repeat(1, 1fr)",
      }}
    >
      <Box padding="6" boxShadow="lg" bg="#CBD5E0">
        <SkeletonCircle size="20" />
        <SkeletonText mt="6" noOfLines={4} spacing="8" skeletonHeight="4" />
      </Box>
      <Box boxShadow="lg" bg="#CBD5E0">
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

const Carousel = () => {
  const products = useSelector((store) => store.ProductsReducer);
  const [index, setIndex] = useState(0);

  const images = [
    "https://lp2.hm.com/hmgoepprod?set=width[1200],quality[80],options[limit]&source=url[https://www2.hm.com/content/dam/global_campaigns/season_07/kids/4057c/4057C-3x2-style-staples-powered-by-denim.jpg]&scale=width[global.width],height[15000],options[global.options]&sink=format[jpg],quality[global.quality]",
    "https://lp2.hm.com/hmgoepprod?set=width[1200],quality[80],options[limit]&source=url[https://www2.hm.com/content/dam/global_campaigns/season_07/sport/7437c/7437C-3x2-hmmove-action-ready-tshirts.jpg]&scale=width[global.width],height[15000],options[global.options]&sink=format[jpg],quality[global.quality]",
    "https://lp2.hm.com/hmgoepprod?set=width[1200],quality[80],options[limit]&source=url[https://www2.hm.com/content/dam/global_campaigns/season_07/divided/5017a/5017A-3x2-baggy-fit-denim.jpg]&scale=width[global.width],height[15000],options[global.options]&sink=format[jpg],quality[global.quality]",
  ];

  return (
    <Box position="relative" w="100%" my="100px">
      <Flex height="600px">
        {images.map((image, idx) => (
          <Box
            key={idx}
            width="100%"
            height="100%"
            position="absolute"
            top={0}
            left={idx === index ? 0 : "100%"}
            transition="left 0.7s ease-in-out"
          >
            <Image
              isLazy
              h="600px"
              w="100%"
              src={image}
              objectFit="cover"
              transition="0.7s ease-in-out"
              opacity={idx === index ? 1 : 0}
            />
          </Box>
        ))}
      </Flex>
      <Button
        onClick={() => setIndex(index === 0 ? images.length - 1 : index - 1)}
        position="absolute"
        left={2}
        top="50%"
        transform="translateY(-50%)"
        backgroundColor={"transparent"}
        _hover={{ backgroundColor: "transparent" }}
      >
        <BsArrowBarLeft color="white" />
      </Button>
      <Button
        onClick={() => setIndex(index === images.length - 1 ? 0 : index + 1)}
        position="absolute"
        right={2}
        top="50%"
        transform="translateY(-50%)"
        backgroundColor={"transparent"}
        _hover={{ backgroundColor: "transparent" }}
      >
        <BsArrowBarRight color="white" />
      </Button>
    </Box>
  );
};

export { Carousel };
