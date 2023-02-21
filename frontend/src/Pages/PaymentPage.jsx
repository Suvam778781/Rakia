import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  Box,
  Badge,
  HStack,
  PinInputField,
  PinInput,
} from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBG-3TqMxHdc_Mjlhqa2w3JnBmrDgkONB0",
  authDomain: "otp-prdb-authentication.firebaseapp.com",
  projectId: "otp-prdb-authentication",
  storageBucket: "otp-prdb-authentication.appspot.com",
  messagingSenderId: "946617291073",
  appId: "1:946617291073:web:72236126f867f8838311c0",
  measurementId: "G-8KNPTFHYM0",
};

firebase.initializeApp(firebaseConfig);

const PaymentPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [code, setCode] = useState("");
  const toast = useToast();

  const HandleSendCode = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(
        phoneNumber,
        new firebase.auth.RecaptchaVerifier("recaptcha-container")
      )
      .then((id) => {
        setVerificationId(id);
        toast({
          title: "Verification code sent!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Error sending verification code",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  const HandleVerifyCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        toast({
          title: "Order Placed Succesfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Error logging in",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <Box
      w="xl"
      p="4"
      borderWidth="2px"
      borderRadius="sm"
      m="auto"
      my="50px"
    >
      <Badge> price $776</Badge>
      <Box h="300px"></Box>
      <Stack w="60%" m="auto" spacing="4">
        <FormControl id="phone">
          <FormLabel>Phone number</FormLabel>
          <Input
             borderRadius={"sm"}
            type="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormControl>
        <Button borderRadius={"sm"} onClick={HandleSendCode}>Send code</Button>
        {verificationId && (
          <>
            {/* <FormControl id="code"> */}
              <FormLabel>Verification code</FormLabel>
            <HStack>
              <PinInput  type='alphanumeric' otp onChange={(e) => setCode(e.target.value)} defaultValue={code}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            {/* </FormControl> */}

            <Button onClick={HandleVerifyCode}>Placed Order</Button>
          </>
        )}
        <div id="recaptcha-container"></div>
      </Stack>
    </Box>
  );
};

export default PaymentPage;
