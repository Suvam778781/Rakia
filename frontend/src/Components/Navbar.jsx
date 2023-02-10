import { HamburgerIcon, Search2Icon } from "@chakra-ui/icons";
import {
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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductsGetdata,
  Products_Getdata,
} from "../HOF/Productreducer/product.action";
import { UserSignout } from "../HOF/User&AdminReducer/UA.action";

export default function Navbar() {
  const [search, setsearch] = useState("");
  const dispatch = useDispatch();
  const userandadmin = useSelector((state) => state.useradminReducer);
  // const [authstate,setauthstate]=useState(userandadmin.adminloginSuc||userandadmin.userloginSuc)
  console.log(userandadmin);
  const HandleSearch = () => {
    dispatch(ProductsGetdata(search));
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
          <Box>
            {/* <InputAddon> */}
            <Input
              w="400px"
              type={"text"}
              _focus={{ boxShadow: "none", borderBottom: "1px solid white" }}
              placeholder="Enter..."
              borderRadius={"0px"}
              border="none"
              onChange={(e) => setsearch(e.target.value)}
              value={search}
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
              <Link href="/user/cart">Cart</Link>
            </Box>
            <Box>
              <Link href="/login" onClick={Handleauth}>
                {userandadmin.adminloginSuc || userandadmin.userloginSuc
                  ? "Logout"
                  : "Login"}
              </Link>
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
export const NavbarDrawer = ({ setsearch, search, HandleSearch,userandadmin }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
              {/* </InputAddon> */}
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
