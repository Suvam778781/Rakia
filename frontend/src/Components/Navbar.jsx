import { HamburgerIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  Text,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { BsLinkedin } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { converttoUpper } from "../HOF/AllSmallFunction";
import {
  ProductsGetdata,
  Products_Getdata,
} from "../HOF/Productreducer/product.action";
import { UserSignout } from "../HOF/User&AdminReducer/UA.action";

export default function Navbar() {
  const [userdata, setuserdata] = useState({});
  const [search, setsearch] = useState("");
  const [openModal, setopenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const userandadmin = useSelector((state) => state.useradminReducer);
  // const [authstate,setauthstate]=useState(userandadmin.adminloginSuc||userandadmin.userloginSuc)

  const SingleUser = async () => {
    let token = localStorage.getItem("token") || "";
    let user = await axios(
      `${process.env.REACT_APP_BASE_URL}/users/singleuser`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setuserdata(user.data);
  };
  console.log(userdata);
  useEffect(() => {
    SingleUser();
  }, [userandadmin]);
  const HandleSearch = () => {
    navigate("/");
    if (search !== "") {
      dispatch(ProductsGetdata(search, "", ""));
    } else {
      toast({
        title: "Please Enter.",
        description: "Please Enter A Category.",
        status: "error",
        position: "top-left",
        variant: "top-accent",
        duration: 6000,
        colorScheme: "yellow",
        isClosable: true,
      });
    }
  };
  const Handleauth = () => {
    if (userandadmin.adminloginSuc || userandadmin.userloginSuc) {
      UserSignout();
    }
  };
  return (
    <>
      {location.pathname !== "/admin/dashboard" && (
        <div style={{ height: "60px" }} mb="10px">
          <HStack
            // display={{md:"none"}}
            zIndex={20}
            w="100%"
            px="20px"
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
              color={"green.500"}
              style={{ fontFamily: "inherit" }}
              w={{ sm: "30%", md: "30%", lg: "20%" }}
            >
              <Link href="/">RAKIA</Link>
            </Box>
            <Box
              w="80%"
              visibility={{
                lg: "visible",
                xl: "visible",
                "2xl": "visible",
                base: "hidden",
              }}
              display={{
                base: "none",
                lg: "flex",
                md: "flex",
                xl: "flex",
                "2xl": "flex",
              }}
              pr="60px"
              justifyContent={"space-between"}
            >
              <Box w="50%">
                {/* <InputAddon> */}
                {location.pathname == "/" && (
                  <Box>
                    <Input
                      w="400px"
                      type={"text"}
                      _focus={{
                        boxShadow: "none",
                        borderBottom: "1px solid white",
                      }}
                      placeholder="Enter..."
                      borderRadius={"0px"}
                      border="none"
                      value={search}
                      borderBottom="1px solid white"
                      h="30px"
                      color="gray"
                      _placeholder={{ color: "grey" }}
                      onClick={() => setopenModal(true)}
                    />
                    <SearchModal
                      openModal={openModal}
                      setopenModal={setopenModal}
                      search={search}
                      setsearch={setsearch}
                      HandleSearch={HandleSearch}
                    />
                    <Search2Icon
                      ml="10px"
                      color={"white"}
                      onClick={HandleSearch}
                    />
                  </Box>
                )}
              </Box>
              <HStack
                justifyContent={"space-between"}
                w="10%"
                fontWeight={"bold"}
                color={"white"}
              >
                <Box
                  borderBottom={
                    location.pathname == "/user/help" && "3px solid green"
                  }
                >
                  <Link href="/user/help">Help</Link>
                </Box>
                <Box
                  borderBottom={
                    location.pathname == "/user/cart" && "3px solid green"
                  }
                >
                  <Link href="/user/cart">Cart</Link>
                </Box>
                <Box>
                  <Menu isLazy>
                    <MenuButton as={Link}>Profile</MenuButton>
                    <MenuList bg={"rgb(167, 173, 173)"}>
                      <Avatar />
                      <Text
                        fontWeight={"700"}
                        fontSize="20px"
                        color={"grey"}
                        bg={"rgb(167, 173, 173)"}
                      >
                        {userdata.firstname &&
                          converttoUpper(
                            userdata.firstname + " " + userdata.lastname
                          )}
                      </Text>
                      <MenuItem
                        bg={"rgb(167, 173, 173)"}
                        _hover={{ color: "grey  " }}
                        as={"a"}
                        href="/login"
                        onClick={Handleauth}
                      >
                        {userandadmin.adminloginSuc || userandadmin.userloginSuc
                          ? "Logout"
                          : "Login"}
                      </MenuItem>
                      <Box p={"10px"} textAlign={"left"}>
                        <Link
                          borderBottom={
                            location.pathname == "/user/orders" &&
                            "3px solid green"
                          }
                          w="30%"
                          bg={"rgb(167, 173, 173)"}
                          _hover={{ color: "grey" }}
                          as={"a"}
                          href="/user/orders"
                        >
                          My Order
                        </Link>
                      </Box>
                      <MenuDivider />
                      <MenuGroup
                        fontWeight={"700"}
                        fontSize="20px"
                        color={"grey"}
                        title="Help"
                      >
                        <MenuItem
                          borderBottom={
                            location.pathname == "/user/docs" &&
                            "3px solid green"
                          }
                          w="30%"
                          _hover={{ color: "grey" }}
                          bg={"rgb(167, 173, 173)"}
                          as="a"
                          href="/user/docs"
                        >
                          Docs
                        </MenuItem>
                        <MenuItem
                          borderBottom={
                            location.pathname == "/user/faq" &&
                            "3px solid green"
                          }
                          w="30%"
                          _hover={{ color: "grey" }}
                          bg={"rgb(167, 173, 173)"}
                          as="a"
                          href="/user/faq"
                        >
                          FAQ
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                </Box>
              </HStack>
            </Box>
            <Box
              visibility={{
                base: "visible",
                sm: "visible",
                md: "visible",
                lg: "hidden",
                xl: "hidden",
                "2xl": "hidden",
              }}
              display={{ base: "flex", lg: "none", xl: "none", "2xl": "none" }}
            >
              <NavbarDrawer
                search={search}
                setsearch={setsearch}
                HandleSearch={HandleSearch}
                userandadmin={userandadmin}
              />
            </Box>
          </HStack>
        </div>
      )}
    </>
  );
}
export const NavbarDrawer = ({
  setsearch,
  search,
  HandleSearch,
  userandadmin,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openModal, setopenModal] = useState(false);
  const btnRef = React.useRef();
  const location = useLocation();
  const Handleauth = () => {
    if (userandadmin.adminloginSuc || userandadmin.userloginSuc) {
      UserSignout();
    }
  };

  return (
    <>
      <HamburgerIcon ref={btnRef} color="green.500" onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Box
              fontSize={"25px"}
              fontWeight="semibold"
              textDecoration="line-through"
              color={"green.500"}
              style={{ fontFamily: "inherit" }}
              w="100%"
            >
              <Link href="/">RAKIA</Link>
            </Box>
          </DrawerHeader>
          <DrawerBody>
            {location.pathname === "/" && (
              <Box>
                <Input
                  w="80%"
                  type={"text"}
                  _focus={{
                    boxShadow: "none",
                    borderBottom: "1px solid green",
                  }}
                  placeholder="Enter..."
                  borderRadius={"0px"}
                  border="none"
                  onChange={(e) => setsearch(e.target.value)}
                  value={search}
                  borderBottom="1px solid green"
                  h="30px"
                  color="gray"
                  _placeholder={{ color: "grey" }}
                />
                <Search2Icon
                  ml="10px"
                  boxSize={"30px"}
                  color={"green.500"}
                  onClick={HandleSearch}
                />
              </Box>
            )}
            <VStack textAlign={"left"} alignItems="flex-start">
              <Box
                p="2px"
                borderBottom={
                  location.pathname == "/user/cart" && "3px solid green"
                }
              >
                <Link href="/user/cart">Cart</Link>
              </Box>
              <Box transition={"2s ease-in-out"} textAlign={"left"}>
                <Link
                  borderBottom={
                    location.pathname == "/user/orders" && "3px solid green"
                  }
                  href="/user/orders"
                >
                  My Order
                </Link>
              </Box>
              <Box
                borderBottom={
                  location.pathname == "/login" && "3px solid green"
                }
              >
                <Link href="/login" onClick={Handleauth}>
                  {userandadmin.adminloginSuc || userandadmin.userloginSuc
                    ? "Logout"
                    : "Login"}
                </Link>
              </Box>

              <Link href="/user/orders">{}</Link>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
const SearchModal = ({
  openModal,
  setopenModal,
  HandleSearch,
  search,
  setsearch,
}) => {
  return (
    <>
      <Modal
        isOpen={openModal}
        size="5xl"
        rounded="md"
        width="90%"
        onClose={() => setopenModal(false)}
        height="110px"
      >
        <ModalOverlay
          bg="blackAlpha.600"
          backdropFilter="auto"
          backdropInvert="20%"
          backdropBlur="4px"
        />
        <ModalContent
          p={1}
          rounded="md"
          height={"100px"}
          minH="70px"
          maxH="70px"
          backgroundColor="white"
          boxShadow="lg"
        >
          <ModalCloseButton />
          <ModalBody m="auto" w="70%">
            <Box display={"flex"} margin="auto" justifyContent={"center"}>
              {/* <InputAddon> */}
              <Input
                type={"text"}
                _focus={{ boxShadow: "none", borderBottom: "1px solid grey" }}
                placeholder="Enter..."
                borderRadius={"0px"}
                border="none"
                onChange={(e) => setsearch(e.target.value)}
                value={search}
                borderBottom="1px solid black"
                h="30px"
                color="gray"
                _placeholder={{ color: "grey" }}
              />
              <Search2Icon
                onClick={() => {
                  HandleSearch();
                  setopenModal(false);
                }}
                m="auto"
                ml="10px"
                color={"grey"}
              />
            </Box>
          </ModalBody>

          <Box
            color="green.400"
            display={"flex"}
            w="40%"
            m="auto"
            justifyContent={"space-between"}
          >
            <Badge color="green.400">Jeans</Badge>
            <Badge color="red.400">Tshirt</Badge>
            <Badge color="yellow.400">Hoodie</Badge>
            <Badge color="blackAlpha.900">Shirt</Badge>
            <Badge color={"pink.300"}>Shoe</Badge>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export { SearchModal };
