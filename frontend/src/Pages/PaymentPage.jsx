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
  Progress,
  Spinner,
  Select,
} from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useDispatch, useSelector } from "react-redux";
import { CartlistGetdata } from "../HOF/Cartreducer/cart.action";
import { CloseIcon } from "@chakra-ui/icons";
import { converttoUpper } from "../HOF/AllSmallFunction";
import axios from "axios";
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
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [userdata,setuserdata]=useState({});
  const [verificationId, setVerificationId] = useState("");
  const [loading,setLoading]=useState(false)
  const [code, setCode] = useState("");
  const [total, settotal] = useState(0);
  const [show,setShow]=useState(true)
  const [mod,setMod]=useState("Cash On Delivery.")
  const toast = useToast();
  const dispatch = useDispatch();
  const SingleUser=async()=>{
    let token=localStorage.getItem("token")||"";
    let user=await axios(`${process.env.REACT_APP_BASE_URL}/users/singleuser`,{
    headers:{
      Authorization:token
    }
    })
    setuserdata(user.data);
      }
  const handleTotal = () => {
    let Total = 0;
    cartdata.Cart.map((ele) => {
      let Addgst = (ele.price / 100) * 18;
      let Singleprice = Addgst + ele.price;
      Total += Math.floor(Singleprice * ele.quantity);
    });
    settotal(Total);
  };
  const HandleOrderplace=async()=>{
    let newDate=new Date()
    let day=newDate.getDate()
    let year=newDate.getFullYear()
    let month=newDate.getMonth()
    let updatecartdata=cartdata.Cart.map((ele)=>{
      ele={...ele,ordered_at:`${day}/${month+1}/${year}`,status:"placed",mop:"COD"}
      return ele
    })
    try{
     let res=await axios.post(`${process.env.REACT_APP_BASE_URL}/users/checkout/${userdata._id}`,updatecartdata)
     toast({
      title: `${res.data.msg}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    }catch(err){
      toast({
        title: `${err.data.msg}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }
  useEffect(() => {
    dispatch(CartlistGetdata());
  }, []);
  useEffect(()=>{
SingleUser()
  },[])
  console.log(userdata)
  useEffect(() => {
    handleTotal();
  }, [cartdata]);
  const HandleSendCode = () => {
    setLoading(true);
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(
        phoneNumber,
        new firebase.auth.RecaptchaVerifier("recaptcha-container")
      )
      .then((id) => {
        setLoading(false)
        setVerificationId(id);
        toast({
          title: "Verification code sent!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setLoading(false)
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
        HandleOrderplace()
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
          <VStack mt="60px" h="250px">
            <Box w="80%" borderRadius={"4px"} onClick={()=>setShow((sh)=>!sh)}>
             <Badge m="auto" my="10px">Deliver To</Badge>
              <Collapse color="black" in={show}>
                <VStack align={"self-start"} p="2" color={"white"} bgColor="green.500"  w="100%" border="1px solid white">
                <Text>Name : {converttoUpper(address.name)}</Text>
                <Text>Pin : {address.pincode}</Text>
                </VStack>
              </Collapse>
            </Box>
            <Select m="auto" py="20px" align={"self-start"} w="80%" value={mod} onChange={(e)=>setMod(e.target.value)}>
              <option borderRadius={"50%"} >Cash On Delivery.</option>
              <option>Net Banking.</option>
            </Select>
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
             {loading?<Spinner />: "Send code"}
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
                    defaultValue="+91"
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
