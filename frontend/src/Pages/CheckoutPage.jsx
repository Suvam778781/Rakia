// suvam pages------------->
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, DeleteIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  Button,
  Input,
  useToast,
  Progress,
  HStack,
  Image,
  Heading,
  SimpleGrid,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Grid,
  GridItem,
  Divider,
  Select,
  Badge,
  SelectField,
} from "@chakra-ui/react";
import axios from "axios";
import { converttoUpper } from "../HOF/AllSmallFunction";
import PaymentPage from "./PaymentPage";

function CheckoutPage() {
  const [total, settotal] = useState(0);
  const [progress, setprogress] = useState(33.33);
  const [termserror, settermserror] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [address, setaddress] = useState([]);
  const [paymentmodal,setpaymentmodal]=useState(false)
  const [formData, setFormData] = useState({
    pincode: "",
    mobile: "",
    alternateMobile: "",
    name: "",
    city: "",
    state: "",
    landmark: "",
    area: "",
    flatNo: "",
    isPrimary: false,
    terms: false,
  });

  const MakePayment=()=>{

// {
    //  here i will take
//  user data
// firstname:"",
// lastname:"",
// email:"",
// _id
// allOrders:[{...products,status:cancelled},{...products,status:placed},{...products,status:refund}]
  // }
  }
  const AddressGetdata = async () => {
    const token = localStorage.getItem("token") || "";
    let data;
    try {
      data = await axios.get(`${process.env.REACT_APP_BASE_URL}/address`, {
        headers: {
          Authorization: token,
        },
      });
      setaddress(data.data);
    } catch (err) {
      toast({
        title: "Alert.",
        description: "Something Went Wrong.",
        status: "error",
        duration: 2000,
        isClosable: true,
      }); 
    }
  };
  const RemoveAddress = async (id) => {
    console.log(id);

    let filterdata = address.filter((ele) => ele._id !== id);
    setaddress(filterdata);

    let token = localStorage.getItem("token") || "";
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/address/delete/${id}`);
      toast({
        title: "Alert.",
        description: "Address Delete Succesfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Alert.",
        description: "Something Went Wrong.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const AddAddress = async (data) => {
if(address.length<2){
    let token = localStorage.getItem("token") || "";
    try {
      let res=await axios.post(
        `${process.env.REACT_APP_BASE_URL}/address/addaddress`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      )
        toast({
          title: "Alert.",
          description: `${res.data[0].msg}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        })
    
      setaddress([...address,data])
      console.log(res)
    } catch (err) {
      toast({
        title: "Alert.",
        description: `Add Correct Details`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });}

  }
  else {

    toast({
      title: "Alert.",
      description: "You Can Add Max 2 Address.",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  }
  };
  const UpdateAddress = async (data) => {
    let token = localStorage.getItem("token") || "";
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/address/update/${data._id}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (err) {
      toast({
        title: "Alert.",
        description: `${err.data[0].msg}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    AddressGetdata();
  }, []);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.checked,
    });
    settermserror(formData.terms);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.terms == false) {
      toast({
        title: "Alert----.",
        description: "Please Accept Terms And Conditions.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      AddAddress(formData);
    }
    // Perform form submission logic here, such as sending data to an API or server
  };

  return (
    <>
      <Box w="100%" my="30px">
      </Box>
      <Box
        p={5}
        display={{
          sm: "inherit",
          md: "flex",
          lg: "flex",
          xl: "flex",
          "2xl": "flex",
        }}
        m="auto"
        w="80%"
        mt="90px"
        boxShadow={"md"}
      >
        
          <VStack
            w={{ sm: "100%", md: "48%", lg: "48%", xl: "48%", "2xl": "48%" }}
          >
            <Box>
              <form
                style={{ width: "100%", lineHeight: 3 }}
                onSubmit={handleSubmit}
              >
                <Input
                  borderRadius={"0"}
                  type="text"
                  isRequired="true"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />
                <Input
                  borderRadius={"0"}
                  type="text"
                  name="mobile"
                  isRequired="true"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                <Input
                  borderRadius={"0"}
                  placeholder="Alternate Mobile:"
                  type="text"
                  name="alternateMobile"
                  value={formData.alternateMobile}
                  onChange={handleChange}
                />
                <Input
                  borderRadius={"0"}
                  type="text"
                  name="name"
                  placeholder="Name:"
                  isRequired="true"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input
                  borderRadius={"0"}
                  placeholder="Flat, House no., Building, Company, Apartment"
                  type="text"
                  name="flatNo"
                  isRequired="true"
                  value={formData.flat}
                  onChange={handleChange}
                />
                <Input
                  borderRadius={"0"}
                  placeholder=" Area, Street, Sector, Village(optional)"
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                />
                <Input
                  borderRadius={"0"}
                  placeholder="City:"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                <Input
                  borderRadius={"0"}
                  type="text"
                  placeholder="State:"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
                <Input
                  borderRadius={"0"}
                  type="text"
                  isRequired="true"
                  name="landmark"
                  placeholder="Landmark:"
                  value={formData.landmark}
                  onChange={handleChange}
                />
                <VStack lineHeight={"1"} align="flex-start">
                  <Box>
                    <input
                      borderRadius={"0"}
                      name="isPrimary"
                      type="checkbox"
                      onChange={handleCheckboxChange}
                    />
                    Make as Primary Address
                  </Box>
                  <Box>
                    <input
                      borderRadius={"0"}
                      name="terms"
                      type="checkbox"
                      onChange={handleCheckboxChange}
                    />
                    Terms and Conditions
                  </Box>
                </VStack>
                <Button type="submit" w="140px">
                  ADD
                </Button>
              </form>
            </Box>
          </VStack>
       
        <Box
          w={{ sm: "80%", md: "48%", lg: "48%", xl: "48%", "2xl": "48%" }}
          m="auto"
          h="auto"
        >
          <Badge fontSize={"25px"} mb="10px" mt="30px">
            ADDRESS
          </Badge>
          {address.length > 0 &&
            address.map((ele) => (
              <Box 
                p={5}
                borderWidth="1px"
                borderRadius="lg"
                mb={5}
                bg="gray.100"
                textAlign="center"
              >
                 <Badge position={"relative"} color="white" backgroundColor={"green.500"} right="-231px" top="-41px">{ele.isPrimary ? "Primary" : ""}</Badge>
                <Box
                  onClick={() => RemoveAddress(ele._id)}
                  borderRadius={"50%"}
                  bgColor="red.100"
                  w="40px"
                  h="40px"
                  top={"-29px"}
                  color={"red"}
                  py="5px"
                  position={"relative"}
                >
                  <DeleteIcon />
                </Box>

               
                <Text fontWeight="bold" mb={2} color="gray.800">
                  {ele.name.toUpperCase()}
                </Text>
                <Text mb={2} color="gray.600">
                  {ele.pincode}
                </Text>
                <Text mb={2} color="gray.600">
                  {converttoUpper(ele.city)} {converttoUpper(ele.state)}
                </Text>
                <a
                  href={`https://maps.google.com?q=123+Main+St.+${ele.state},+india+${ele.pincode}`}
                  style={{ color: "blue" }}
                >
                  View on Google Maps
                </a>
                <Box>
                <Button
                shadow={"sm"}
                borderRadius="4px"
                  bgColor="green.500"
                  w="60px"
                  h="26px"
                  color={"white"}
                  m="auto"
                 alignItems={"center"}
                  mt='10px'
                  position={"relative"}
                  onClick={()=>setpaymentmodal(true)}
                  _hover={{ bgColor:"green.600"}}
                >
                SELECT
                </Button>
                <PaymentPage paymentmodal={paymentmodal} setpaymentmodal={setpaymentmodal} address={ele}/>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2NiYmM5OWFhYTZkZTRmNGU4ZDJjOGMiLCJpYXQiOjE2NzQyOTY1MDd9.barY9qnmDOK4I4ZwOOS7olVvQv8PxmDgVb2et-ipLCc"
export default CheckoutPage;

