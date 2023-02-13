import React, { useRef } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import env from "react-dotenv";

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2RmOTlkZmY0ODAzY2Q4YTYzMjMzOTUiLCJpYXQiOjE2NzU1OTgzMjMsImV4cCI6MTY3NTY4NDcyM30.chHmPbJN8h9QPtViekmUqs4WbG9DoRgnwXdr2Qbuzzw"
import {
  Box,
  VStack,
  Divider,
  Image,
  Text,
  Button,
  Input,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  useDisclosure,
  ModalHeader,
  Collapse,
  Badge,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import axios from "axios";
import Navbar from "../Components/Navbar";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  CartlistGetdata,
  RemoveFromCartlist,
  UpdateCartProducts,
} from "../HOF/Cartreducer/cart.action";
const AddToCartPage = () => {
  const cartdata = useSelector((state) => state.CartReducer);
  const [pin, setPin] = useState("");
  const toast = useToast();
  const [error, setError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [total, settotal] = useState(0);
  const [coupon, setcoupon] = useState("");
  const [couponCount, setcouponCount] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollHeight, setscrollHeight] = useState(0);
  const navigate = useNavigate();
  const cartRef = useRef(null);
  const dispatch = useDispatch();
  const userandadmin = useSelector((state) => state.useradminReducer);
  const handleScroll = () => {
    setScrollPosition(cartRef.current.scrollTop);
    setscrollHeight(cartRef.current.scrollHeight);
  };
  useEffect(() => {
    cartRef.current.addEventListener("scroll", handleScroll);
    return () => {
      cartRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(cartdata);
  // colapse function for price details
  useEffect(() => {
    dispatch(CartlistGetdata());
  }, []);
  const handleTotal = () => {
    let Total = 0;
    cartdata.Cart.map((ele) => {
      let Addgst = (ele.price / 100) * 18;
      let Singleprice = Addgst + ele.price;
      Total += Math.floor(Singleprice * ele.quantity);
    });
    settotal(Total);
  };
  useEffect(() => {
    handleTotal();
  }, [cartdata]);
  const handleDecrease = (item) => {
    const token = localStorage.getItem("token") || "";
    if (item.quantity > 1) {
      item = { ...item, quantity: item.quantity - 1 };
      dispatch(UpdateCartProducts(item));
    } else {
      toast({
        title: "Quantity",
        description: "Minimum Quantity Is 1.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleIncrease = (item) => {
    const token = localStorage.getItem("token") || "";
    if (item.quantity < 5) {
      item = { ...item, quantity: item.quantity + 1 };

      dispatch(UpdateCartProducts(item));
      // setCartdata(newdata);
    } else {
      toast({
        title: "Quantity",
        description: "Maximum Quantity Is 5 .",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const findDelivery = () => {
    let length = pin.length;
    if (length === 6) {
      setError("");
    } else if (length < 6) {
      setError("Please enter valid 6-digit pincode.");
    }
  };
  const handleRemove = (item) => {
    dispatch(RemoveFromCartlist(item._id));
    toast({
      title: "Remove Data",
      description: "Remove Succesfully",
      status: "success",
      position: "top",
      duration: 2000,
      isClosable: true,
    });
  };
  const handleRedirected = () => {
    navigate("/cart/checkout");
  };
  const handleDiscount = () => {
    if (couponCount == 1) {
      toast({
        title: "Offers",
        description: "Coupon Already Applied.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else if (
      (coupon == "DUBAM300" && couponCount == 0) ||
      (coupon == "APP300" && couponCount == 0)
    ) {
      setcouponCount(1);
      settotal((tota) => tota - 300);
      toast({
        title: "Offers",
        description: "Coupon Added Succesfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Quantity",
        description: "Enter Valid Coupon.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  if (!userandadmin.userloginSuc) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Box mt="90px">
        <Box
          display="flex"
          w="88%"
          h="50px"
          alignItems={"center"}
          borderBottom={"0.5px solid RGBA(0, 0, 0, 0.08)"}
          borderTop="0.5px solid RGBA(0, 0, 0, 0.08)"
          mt="70px"
          m="auto"
        >
          {/* cart page startting from here */}
          <Text fontWeight={"semibold"} fontSize={"20px"}>
            Products Cart
          </Text>
          <Text w="70px">({cartdata.Cart.length}items)</Text>
        </Box>

        <Box display="inherit" mb="30px" w="90%" m="auto">
          <Box overflow={"hidden"}>
            <Box
              id="scrollbar"
              ref={cartRef}
              style={{ height: "500px", overflowY: "scroll" }}
              w="98%"
              m="10px"
            >
              <Box
                justifyContent="space-between"
                display="flex"
                w="88%"
                px="50px"
                py="10px"
                bgColor="green.500"
                m="auto"
                color={"white"}
                visibility={scrollHeight - scrollPosition < 600 ? "hidden" : ""}
                position={
                  scrollHeight - scrollPosition > 600 ? "absolute" : "fixed"
                }
                // top="0px"
                zIndex="1"
              >
                <Text>Item</Text>
                <Text>Quantity</Text>
                <Text>Price (Inclusive of GST)</Text>
              </Box>
              {/*  mapping all the cart data */}
              {cartdata.Cart.length > 0 &&
                cartdata.Cart.map((item, index) => (
                  <Box boxShadow={"md"} key={item.id}>
                    <SingleItem
                      key={item._id}
                      item={item}
                      handleDecrease={handleDecrease}
                      handleIncrease={handleIncrease}
                      handleRemove={handleRemove}
                    />
                  </Box>
                ))}
            </Box>
          </Box>
          <Button bgColor={"green.500"} my="20px" as="a" href="/user/cart/checkout">CHECKOUT</Button>
          <VStack w="100%" my="10px" mx="10px" mb="100px">
            <Box
              h="auto"
              pb="20px"
              style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
              w="100%"
            >
              {/*  pincode added and shiping section */}
              <Box
                bgColor={"green.500"}
                w="100%"
                h="40px"
                mb={"10px"}
                display="flex"
                px="7px"
                justifyContent="space-between"
              >
                <Text
                  color="white"
                  alignItems={"center"}
                  textAlign="left"
                  pt="5px"
                >
                  Payment Summary
                </Text>
                <Image
                  filter={"invert(100%)"}
                  w="20px"
                  src="https://www.industrybuying.com/static/desktop-payment/assets/svg/rupee-circle-icon.svg"
                />
              </Box>
              <Text
                color="RGBA(0, 0, 0, 0.48)"
                pl="20px"
                pb="10px"
                textAlign={"left"}
              >
                Estimate shipping charges
              </Text>
              <HStack px="20px" w="100%">
                <Input
                  w="80%"
                  type={"text"}
                  _focus={{
                    boxShadow: "none",
                    borderBottom: "2px solid green",
                  }}
                  borderRadius={"0px"}
                  border="none"
                  value={pin}
                  borderBottom="1px solid green"
                  h="30px"
                  color="gray"
                  _placeholder={{ color: "grey" }}
                  fontSize={"12px"}
                  placeholder="ENTER YOUR PINCODE"
                  rounded="xs"
                  _hover={{ borderBotton: "2px solid green" }}
                  onChange={(e) => setPin(e.target.value)}
                />
                <Search2Icon
                  onClick={findDelivery}
                  verticalAlign="middle"
                  zIndex="10"
                />
              </HStack>
              <Text
                pl="20px"
                fontSize={"13px"}
                color="#de2511"
                py="3px"
                textAlign={"left"}
              >
                {error}
              </Text>
              {!error ? (
                <VStack>
                  <Box
                    display={"flex"}
                    h="30px"
                    justifyContent="space-between"
                    w="90%"
                    margin="auto"
                    py="20px"
                  >
                    <Text>Subtotal:Rs.</Text>
                    <Text>{total.toLocaleString()}</Text>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent="space-between"
                    h="30px"
                    w="90%"
                    margin="auto"
                    py="20px"
                  >
                    <Text>Shipping Charges</Text>
                    <Text color="#3da73a">FREE</Text>
                  </Box>
                  <Box
                    fontWeight={"bold"}
                    display={"flex"}
                    h="30px"
                    justifyContent="space-between"
                    w="90%"
                    margin="auto"
                    py="20px"
                    fontSize={"20px"}
                  >
                    <Text>Total Price</Text>
                    <Text color="#e45301">{total.toLocaleString()}</Text>
                  </Box>
                  <HStack
                    w="100%"
                    px="10px"
                    mt="10px"
                    borderTop={"0.5px solid RGBA(0, 0, 0, 0.36)"}
                  >
                    <Image
                      w="30px"
                      h="30px"
                      src="https://www.industrybuying.com/static/desktop-payment/assets/svg/delivery-truck.svg"
                      alt="Free Shipping"
                    />
                    <Text color={"grey"} fontSize="12px">
                      Shipping charges applicable as per your pincode {pin}
                    </Text>
                  </HStack>
                </VStack>
              ) : null}
            </Box>
            {/* Partner offer section */}
            <Box
              h="auto"
              pb="20px"
              style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
              w="100%"
            >
              <Box
                bgColor={"green.500"}
                w="100%"
                h="40px"
                mb={"10px"}
                display="flex"
                px="7px"
                justifyContent="space-between"
              >
                <Text
                  color="white"
                  alignItems={"center"}
                  textAlign="left"
                  pt="5px"
                >
                  Partner Offers
                </Text>
                <Image
                  filter={"invert(100%)"}
                  w="20px"
                  src="https://www.industrybuying.com/static/desktop-payment/assets/svg/discount-icon.svg"
                />
              </Box>
              <VStack
                textAlign={"left"}
                lineHeight="20px"
                align="flex-start"
                borderRadius={"7px"}
                px="20px"
                h="80px"
                bgColor={"#fffaef"}
                border="1px dashed #e3daad"
                w="90%"
                m="auto"
              >
                <Text fontWeight={"semibold"}>
                  Get GST invoice and save up to 28% on Business Purchases.
                </Text>
                <Link
                  onClick={onOpen}
                  color={"#046699"}
                  textDecoration="underline"
                >
                  View More
                </Link>
              </VStack>
            </Box>

            <Box
              h="auto"
              pb="20px"
              style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
              w="100%"
            >
              <Box
                bgColor={"green.500"}
                w="100%"
                h="40px"
                mb={"10px"}
                display="flex"
                px="7px"
                justifyContent="space-between"
              >
                <Text
                  color="white"
                  alignItems={"center"}
                  textAlign="left"
                  pt="5px"
                >
                  Offers Available
                </Text>
                <Image
                  filter={"invert(100%)"}
                  w="20px"
                  src="https://www.industrybuying.com/static/desktop-payment/assets/svg/discount-icon.svg"
                />
              </Box>
              <HStack px="20px" w="100%">
                <Input
                  fontSize={"12px"}
                  w="100%"
                  placeholder="ENTER YOUR PINCODE"
                  _hover={{ border: "none" }}
                  value={coupon}
                  onChange={(e) => setcoupon(e.target.value)}
                />
                <Link
                  as={Link}
                  position={"relative"}
                  left="-60px"
                  color="#fb8869"
                  verticalAlign="middle"
                  zIndex="20"
                  onClick={() => handleDiscount()}
                >
                  Apply
                </Link>
              </HStack>
            </Box>
            {/* first coupon box */}
            <Box
              px="10px"
              alignItems="flex-start"
              w="100%"
              pl="10px"
              h="100px"
              id="scrollbar"
              fontSize={"14px"}
              overflowY="scroll"
            >
              <Box>
                <Box display={"flex"}>
                  <Badge
                    bgColor={"#fb8869"}
                    alignItems="flex-start"
                    color="white"
                  >
                    Avalable
                  </Badge>
                </Box>
                <Flex w="100%" justifyContent={"space-between"}>
                  <Text>DUBAM300</Text>
                  <Link onClick={() => setcoupon("DUBAM300")} color={"#E53E3E"}>
                    Apply Now
                  </Link>
                </Flex>
                <Flex mt="20px" w="100%" justifyContent={"space-between"}>
                  <h6>Get Flat Rs. 300 Off.</h6>
                  <Link>T&C Apply</Link>
                </Flex>
              </Box>
              {/* second coupon box */}
              <Box>
                <Box display={"flex"} pt="30px" pb="4px">
                  <Badge
                    bgColor={"#fb8869"}
                    alignItems="flex-start"
                    color="white"
                  >
                    Avalable
                  </Badge>
                </Box>
                <Flex w="100%" justifyContent={"space-between"}>
                  <Text>APP300</Text>
                  <Link onClick={() => setcoupon("APP300")} color={"#E53E3E"}>
                    Apply Now
                  </Link>
                </Flex>
              </Box>
              <Flex w="100%" mt="20px" justifyContent={"space-between"}>
                <h6>Get Flat Rs. 300 Off.</h6>
                <Link>T&C Apply</Link>
              </Flex>
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
};
export const SingleItem = ({
  item,
  handleDecrease,
  handleIncrease,
  handleRemove,
  dd,
}) => {
  const toast = useToast();
  const [show, setShow] = React.useState(true);
  const totalPrice = (item) => {
    let tax = Math.floor(item.price / 100) * 18;
    let totaltax = tax * item.quantity;
    let total = item.price * item.quantity + totaltax;
    return { total, tax: totaltax };
  };
  // colapse function for price details
  const handleToggle = () => setShow(!show);
  return (
    <Box h="350px" key={item._id} py="20px">
      {/* initial sec item quantity */}
      <Text
        mb="30px"
        textAlign={"left"}
        w="300px"
        fontSize="15px"
        display="flex"
        pl="10px"
      >
        {item.title}
      </Text>

      <Box display="flex" w="100%" justifyContent="space-between" m="auto">
        <Box display="flex" fontSize="14px" w="40%">
          <Box boxShadow={"sm"} mr="10px">
            <Image
              src={item.image}
              style={{
                width: "100%",
                height: "200px",
              }}
            />
          </Box>
          <Box textAlign={"left"} w="200px" lineHeight={"25px"}>
            <Text> Brand:{item.brand}</Text>
            <Text> category:{item.category}</Text>
            {/* <Text> {item.Spindle_Speed}</Text> */}
            {!dd ? (
              <Button
                mt="40px"
                style={{
                  textAlign: "left",
                  display: "flex",
                  fontSize: "13px",
                }}
                verticalAlign="middle"
                alignItems={"center"}
                pl="0px"
                bg="white"
                color="red"
                _hover={{ backgroundColor: "background", color: "red.700" }}
                onClick={() => handleRemove(item)}
              >
                <DeleteIcon color="red" />
                Remove
              </Button>
            ) : null}
          </Box>
        </Box>
        {dd ? null : (
          <Box
            style={{
              width: "10%",
              m: "auto",
              display: "flex",
              height: "33px",
              color: "grey",
              alignItems: "center",
              border: "0.5px solid RGBA(0, 0, 0, 0.16)",
            }}
          >
            <button
              style={{
                alignItems: "center",
                fontSize: "18px",
                backgroundColor: "white",
                border: "none",
                borderRight: "0.5px solid RGBA(0, 0, 0, 0.16)",
                cursor: "pointer",
                margin: "auto",
              }}
              onClick={() => handleDecrease(item)}
            >
              <MinusIcon py="1" />
            </button>
            <input
              type="text"
              value={item.quantity}
              style={{
                width: "30px",
                height: "30px",
                fontSize: "20px",
                textAlign: "center",
                margin: "auto",
              }}
            />
            <button
              style={{
                alignItems: "center",
                fontSize: "18px",
                backgroundColor: "white",
                border: "none",
                borderLeft: "0.5px solid RGBA(0, 0, 0, 0.16)",
                cursor: "pointer",
                margin: "auto",
              }}
              onClick={() => handleIncrease(item)}
            >
              <AddIcon py="1" />
            </button>
          </Box>
        )}

        <Box w="50%">
          <HStack w="50%" m="auto" justifyContent={"space-between"}>
            <span>RS:{totalPrice(item).total.toLocaleString()}</span>
            <Button
              fontSize={"14px"}
              color="green.500"
              w="40px"
              m="auto"
              background={"Background"}
              _hover={{ backgroundColor: "white" }}
              variantColor="blue"
              onClick={handleToggle}
            >
              Details{" "}
              {show ? (
                <AddIcon
                  borderRadius={"50%"}
                  w="15px"
                  h="15px"
                  border="1px solid #38A169"
                  color={"green.500"}
                />
              ) : (
                <MinusIcon
                  color={"green.500"}
                  w="15px"
                  h="15px"
                  borderRadius={"50%"}
                  border="1px solid #38A169"
                />
              )}
            </Button>
          </HStack>
          <Collapse color="black" mt={4} in={show}>
            <VStack
              w="200px"
              fontSize="12px"
              display="flex"
              justifyContent="space-between"
              p="10px"
              lineHeight="0.7"
              m="auto"
              bgColor="green.500"
              color={"white"}
            >
              <Box display="flex" w="95%" justifyContent="space-between">
                <span> Price Rs.</span>
                <span>{item.price.toLocaleString()}</span>
              </Box>
              <Box
                display="flex"
                w="95%"
                justifyContent="space-between"
                m="auto"
              >
                <span> GST@{18}%</span>
                <span>+Rs.{totalPrice(item).tax.toLocaleString()}</span>
              </Box>
              <Box
                display="flex"
                w="95%"
                justifyContent="space-between"
                m="auto"
              >
                <span>Final Price</span>
                <span>{totalPrice(item).total.toLocaleString()}</span>
              </Box>
            </VStack>
          </Collapse>
          <HStack w="50%" m="auto" pt="70px">
            <Image
              w="30px"
              h="30px"
              src="https://www.industrybuying.com/static/svg/delivery-truck-afterdiscount.svg"
              alt="Free Shipping"
            />
            <Text textAlign={"center"} color={"#4c993e"}>
              Free shipping
            </Text>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
// model for t&c checking
export default AddToCartPage;

const QuantityButton = () => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "#F1F1F1",
          color: "#333",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={decreaseQuantity}
      >
        -
      </button>
      <input
        type="text"
        value={quantity}
        style={{
          width: "40px",
          textAlign: "center",
          border: "none",
          borderRadius: "4px",
        }}
        readOnly
      />
      <button
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "#F1F1F1",
          color: "#333",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
};

export { QuantityButton };
