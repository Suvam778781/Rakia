import {
  Badge,
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Orders() {
  const [orderloading, setOrderloading] = useState(true);
  const [userdata, setuserdata] = useState({});
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
  useEffect(() => {
    SingleUser();
  }, []); 
  console.log(userdata);
  return (
    <Box m="auto" w="100%" my="60px">
      <Box>
        <Badge fontSize={"30px"}>My Orders</Badge>
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap="2" m="auto" mt="100px">
        {orderloading ? (
          <Box w="100%" m="auto">
            {" "}
            <Spinner m="auto" size={"xl"} />
          </Box>
        ) : (
          userdata.allorders.map((ele) => (
            <HStack
              justifyContent={"space-between"}
              overflow="hidden"
              h="200px"
              m="auto"
              w="90%"
              borderRadius={"5px"}
              shadow={"lg"}
            >
              <Image display={"block"} w="20%" h="100%" src={ele.image} />
              <Box w="30%">
                {ele.status == "placed" ? (
                  <Badge color={"red.500"}>Ordered_At : {ele.ordered_at}</Badge>
                ) : (
                  <Badge color={"red.500"}>
                    `Cancelled_At : ${ele.cancelled_at}`
                  </Badge>
                )}
                <Badge color={ele.status == "placed" ? "green.500" : "red.500"}>
                  Status :{ele.status}
                </Badge>
                <Box>
                  {ele.status == "placed" ? (
                    <Button h="25px" color={"red"}>
                      Cancel
                    </Button>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            </HStack>
          ))
        )}
      </Grid>
    </Box>
  );
}
export default Orders;
