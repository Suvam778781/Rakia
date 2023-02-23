import { DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { converttoUpper } from "../HOF/AllSmallFunction";

function Orders() {
  const [orderloading, setOrderloading] = useState(true);
  const [userdata, setuserdata] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const SingleUser = async () => {
    setOrderloading(true);
    let token = localStorage.getItem("token") || "";
    let user = await axios(
      `${process.env.REACT_APP_BASE_URL}/users/singleuser`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setOrderloading(false);
    setuserdata(user.data);
  };

  const HandleCancelled = async (order) => {
    let newDate = new Date();
    let day = newDate.getDate();
    let year = newDate.getFullYear();
    let month = newDate.getMonth();
    let updateorderdata = {
      ...order,
      cancelled_at: `${day}/${month + 1}/${year}`,
      status: "cancelled",
    };
    try {
      setOrderloading(true);
      let res = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/changestatus/${userdata._id}/${order._id}`,
        updateorderdata
      );
      toast({
        title: `${res.data[0].msg}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      SingleUser();
    } catch (err) {
      toast({
        title: `${err.data[0].msg}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    SingleUser();
  }, []);
  return (
    <Box w="100%" my="60px">
      <Box>
        <Badge fontSize={"30px"}>My Orders</Badge>
      </Box>
      {orderloading ? (
        <Box my="100px">
          {" "}
          <Spinner display={"flex"} m="auto" size={"xl"} />
        </Box>
      ) : (
        <Grid
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            lg: "repeat(2, 1fr)",
            xl: "repeat(2, 1fr)",
            "2xl": "repeat(2, 1fr)",
          }}
          gap="2"
          w="94%"
          m="auto"
          mt="100px"
        >
          {userdata.allorders.map((ele) => (
            <>
              <Box
                key={ele._id}
                justifyContent={"space-between"}
                // overflow="hidden"
                h="200px"
                m="auto"
                w="100%"
                d="flex"
                borderRadius={"5px"}
                border="2px solid"
                display={"flex"}
                overflow={"hidden"} 
              >
                <Image display={"block"} w="20%" h="100%" src={ele.image} />
                <Box w="30%" textAlign={"left"}>
                  <Text>₹ {ele.price}</Text>

                  <Box
                    fontSize={"13px"}
                    p={1}
                    borderWidth="1px"
                    borderRadius="lg"
                    mb={5}
                    bg="gray.100"
                    textAlign="left"
                    mt="20px"
                  >
                    {/*  address started here */}

                    <Text fontWeight="bold" mb={2} color="gray.800">
                      {ele.address.name.toUpperCase()}
                    </Text>
                    <Text mb={2} color="gray.600">
                      {ele.address.pincode}
                    </Text>
                    <Text mb={2} color="gray.600">
                      {converttoUpper(ele.address.city)}
                      {converttoUpper(ele.address.state)}
                    </Text>
                  </Box>
                </Box>

                <Box textAlign={"left"} w="40%">
                  {ele.status == "placed" ? (
                    <Badge color={"red.500"}>
                      Ordered_At : {ele.ordered_at}
                    </Badge>
                  ) : (
                    <Badge color={"red.500"}>
                      Cancelled_At : {ele.cancelled_at}
                    </Badge>
                  )}
                  <Badge
                    color={ele.status == "placed" ? "green.500" : "red.500"}
                  >
                    Status :{ele.status}
                  </Badge>
                  <Box>
                    {ele.status == "placed" ? (
                      <Button
                        onClick={() => HandleCancelled(ele)}
                        mt="20px"
                        h="25px"
                        color={"red"}
                      >
                        Cancel
                      </Button>
                    ) : (
                      ""
                    )}
                  </Box>

                  {ele.status == "placed" && (
                    <Text my="10px" fontSize={"12px"}>
                      Item will be delivered to your pincode within 5day's
                    </Text>
                  )}
                </Box>
              </Box>
            </>
          ))}
        </Grid>
      )}
    </Box>
  );
}
export default Orders;
