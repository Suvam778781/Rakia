import { HamburgerIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
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
import React, { useState } from "react";
import { BsLinkedin } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  ProductsGetdata,
  Products_Getdata,
} from "../HOF/Productreducer/product.action";
import { UserSignout } from "../HOF/User&AdminReducer/UA.action";

export default function Navbar() {
  const [search, setsearch] = useState("");
  const [openModal, setopenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const userandadmin = useSelector((state) => state.useradminReducer);
  // const [authstate,setauthstate]=useState(userandadmin.adminloginSuc||userandadmin.userloginSuc)
  console.log(userandadmin);
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
          w="20%"
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
                <Search2Icon ml="10px" color={"white"} onClick={HandleSearch} />
              </Box>
            )}
          </Box>
          <HStack
            justifyContent={"space-between"}
            w="10%"
            fontWeight={"bold"}
            color={"white"}
          >
            <Box>
              <Link href="/user/help">Help</Link>
            </Box>
            <Box>
              <Link href="/user/cart">Cart</Link>
            </Box>
            <Box>
              <Menu isLazy >
                <MenuButton as={Link} >
                  Profile
                </MenuButton>
                <MenuList  bg={"rgb(167, 173, 173)"} >
                  <MenuGroup fontWeight={"700"} fontSize="20px" color={"green.500"}  bg={"rgb(167, 173, 173)"} title="Profile">
                    <MenuItem bg={"rgb(167, 173, 173)"} _hover={{color:"green.500"}} as={"a"} href="/login" onClick={Handleauth}>
                      {userandadmin.adminloginSuc || userandadmin.userloginSuc
                        ? "Logout"
                        : "Login"}
                    </MenuItem>
                    <MenuItem bg={"rgb(167, 173, 173)"}_hover={{color:"green.500"}}  as={"a"} href="/user/order">My Order</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup fontWeight={"700"} fontSize="20px" color={"green.500"}  title="Help">
                    <MenuItem _hover={{color:"green.500"}} bg={"rgb(167, 173, 173)"} as="a">Docs</MenuItem>
                    <MenuItem _hover={{color:"green.500"}}  bg={"rgb(167, 173, 173)"} as="a">FAQ</MenuItem>
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
            <Box>
              <Input
                w="80%"
                type={"text"}
                _focus={{ boxShadow: "none", borderBottom: "1px solid green" }}
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
            <VStack textAlign={"left"} alignItems="flex-start">
              <Link href="/user/cart">Cart</Link>
              <Link href="/login" onClick={Handleauth}>
                {userandadmin.adminloginSuc || userandadmin.userloginSuc
                  ? "Logout"
                  : "Login"}
              </Link>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
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
