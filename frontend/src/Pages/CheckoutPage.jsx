// suvam pages------------->
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import axios from "axios";

function CheckoutPage() {
  const [total, settotal] = useState(0);
  const [progress, setprogress] = useState(33.33);
  const [termserror, settermserror] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pincode: "",
    mobile: "",
    alternateMobile: "",
    name: "",
    city: "",
    state: "",
    landmark: "",
    area: "",
    flat: "",
    makeprimary: false,
    terms: false,
  });
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
      toast({
        title: "Adress.",
        description: "New Adress Added Succesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setStep((stp) => stp + 1);
      setprogress((prog) => prog + 33.33);
    }
    // Perform form submission logic here, such as sending data to an API or server
  };
  return (
    <>
     <Box w="100%" my="30px">
           <Progress
             colorScheme="green"
             size="sm"
             w="58%"
             m={"auto"}
             value={progress}
           />
         </Box>
    <Box p={5} display={{sm:"inherit",md:"flex",lg:"flex",xl:"flex","2xl":"flex"}} m="auto" w="80%" mt="90px"  boxShadow={"md"}>
        {step === 1 ? (
          <VStack  w={{sm:"100%",md:"48%",lg:"48%",xl:"48%","2xl":"48%"}}  > 
          <Box  >
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
                name="flat"
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
                    name="makeprimary"
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
        ):
          <CheckForm1
            setprogress={setprogress}
            setStep={setStep}
          />}
      <Box w={{sm:"80%",md:"48%",lg:"48%",xl:"48%","2xl":"48%"}} m="auto" h="auto" border={"1px solid red"}>
      </Box>
      </Box>
    {/* </Box> */}
    </>
  );
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2NiYmM5OWFhYTZkZTRmNGU4ZDJjOGMiLCJpYXQiOjE2NzQyOTY1MDd9.barY9qnmDOK4I4ZwOOS7olVvQv8PxmDgVb2et-ipLCc"
export default CheckoutPage ;


const CheckForm1 = ({ setStep, setprogress, Cart_Data }) => {
  const handle1 = () => {
    setStep((stp) => stp - 1);
    setprogress((prog) => prog - 33.33);
  };
  const handle2 = () => {
    setStep((stp) => stp + 1);
    setprogress((prog) => prog + 33.33);
  };
  return (
    <>
      <Text margin={"auto"} display="flex" w="200px" my="30px">
        Product Preview
      </Text>
      <Box>
        {/* {Cart_Data.map((item, index) => (
          <div key={item.id}>
            <SingleItem
              key={item._id}
              item={item}
              dd={true}
              // handleDecrease={handleDecrease}
              // handleIncrease={handleIncrease}
              // handleRemove={handleRemove} */}
            {/* /> */}
            {/* <Divider /> */}
          {/* </div> */}
        {/* ))} */}
      </Box>
      <Button onClick={handle1}>Back</Button>
      <Button onClick={handle2}>Next</Button>
    </>
  );
};
