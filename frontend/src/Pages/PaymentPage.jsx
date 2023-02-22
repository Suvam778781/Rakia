import React, { useEffect, useState } from "react";
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
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  VStack,
  Text,
  Checkbox,
  Collapse,
} from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useDispatch, useSelector } from "react-redux";
import { CartlistGetdata } from "../HOF/Cartreducer/cart.action";
import { CloseIcon } from "@chakra-ui/icons";
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

const PaymentPage = ({ paymentmodal, setpaymentmodal, address }) => {
  const cartdata = useSelector((state) => state.CartReducer);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [code, setCode] = useState("");
  const [total, settotal] = useState(0);
  const toast = useToast();
  const dispatch = useDispatch();
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
    dispatch(CartlistGetdata());
  }, []);
  useEffect(() => {
    handleTotal();
  }, [cartdata]);
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
    <Modal
      isClosable={true}
      isOpen={paymentmodal}
      size="sm"
      p="4"
      borderWidth="2px"
      borderRadius="sm"
      m="auto"
      my="50px"
    >
      <ModalBody>
        <ModalContent>
          <Box position={"absolute"} right="-22px" top="-22px">
            <CloseIcon
              onClick={() => setpaymentmodal(false)}
              p="1px"
              w="28px"
              h="28px"
              color={"white"}
              backgroundColor="red.400"
              border={"1px solid white"}
              borderRadius="50%"
            />
          </Box>
          <Badge w="40%" p="auto" m="auto" mt="20px">
            Total Price: ₹ {total}
          </Badge>
          <VStack h="200px">
            <Box>
              Deliver To :
              <Collapse>
                <Text>{address.name}</Text>
              </Collapse>
            </Box>

            <VStack>
              <Checkbox>Cash Dn Delivery.</Checkbox>
              <Checkbox>Net Banking</Checkbox>
            </VStack>
          </VStack>
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
            <Button borderRadius={"sm"} onClick={HandleSendCode}>
              Send code
            </Button>
            {verificationId && (
              <>
                {/* <FormControl id="code"> */}
                <FormLabel>Verification code</FormLabel>
                <HStack>
                  <Input
                    type="alphanumeric"
                    otp
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                  />
                </HStack>
                {/* </FormControl> */}
                <Button onClick={HandleVerifyCode}>Placed Order</Button>
              </>
            )}
            <div id="recaptcha-container"></div>
          </Stack>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default PaymentPage;
