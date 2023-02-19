import {
  Avatar,
  Box,
  Image,
  Button,
  Text,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  VStack,
  Grid,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  useToast,
  Progress,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  BsCloudRain,
  BsCloudUpload,
  BsPerson,
  BsSuitSpade,
  BsThreeDots,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FiEdit, FiEdit2, FiEdit3, FiGitMerge, FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import React from "react";
import Navbar from "./Navbar";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DeleteProductForAdmin, GetProductForAdmin, UpdateProductForAdmin } from "../HOF/Adminproductsreducer/Admin.products.action";
import { DeleteIcon, Search2Icon } from "@chakra-ui/icons";
import axios from "axios";
import { useState } from "react";
import { converttoUpper } from "../HOF/AllSmallFunction";
const AdminDashBoard = () => {
  const [admindetails,setadmindetails]=useState({});
  const [search,setsearch]=useState("")
  const [adminloading,setadminloading]=useState(true)
  const dispatch = useDispatch();
  const productsadmin = useSelector((state) => state.AdminReducer);
  const userandadmin=useSelector((state)=>state.useradminReducer)
  const toast=useToast(); 
  const HandleSearch=()=>{

  }
const GetAdminDetails=async()=>{
let admintoken=localStorage.getItem("admintoken")||"";

try {
  setadminloading(true)
let res=await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/singleadmin`,
  {
    headers: {
      Authorization: admintoken,
    },

  }
  )
  setadmindetails(false)
  setadmindetails(res.data)
}catch(err){
  setadmindetails(false)
  toast({
    title: 'Admin Fetch Error.',
    description: "",
    status: 'error',
    duration: 3000,
    isClosable: true,
  })
}
}
  useEffect(() => {
    dispatch(GetProductForAdmin());

  }, []);
  useEffect(()=>{
GetAdminDetails()
  },[])

  return (
    <div>
      <Box
        w="100%"
        px="20px"
        lineHeight={""}
        zIndex="21"
        boxShadow={"lg"}
        backgroundColor="white"
        position="fixed"
        h="60px"
        display={"flex"}
        justifyContent="space-between"
        m="auto"
      >
        <Box
          fontSize={"25px"}
          fontWeight="semibold"
          textDecoration="line-through"
          color={"green.500"}
          margin="auto 0px auto 0px"
          style={{ fontFamily: "inherit" }}
        >
          RAKIA
        </Box>
        <Box m="auto" alignItems={"center"}>
          <Input
            w="400px"
            type={"text"}
            _focus={{
              boxShadow: "none",
              borderBottom: "1px solid white",
            }}
            onChange={(e)=>setsearch(e.target.value)}
            placeholder="Enter..."
            borderRadius={"0px"}
            border="none"
            value={search}
            borderBottom="1px solid white"
            h="30px"
            color="gray"
            _placeholder={{ color: "grey" }}
            
          />
          <Search2Icon onClick={HandleSearch} ml="10px" color={"grey"} />
        </Box>
        <Box display={"flex"}>
          <Avatar size={"sm"} margin="auto 0px auto 0px" />
          {!adminloading?<Progress/>:
          <VStack
            display={{ base: "none", md: "flex" }}
            alignItems="flex-start"
            spacing="1px"
            margin="auto 0px auto 0px"
            ml="2"
          >
            <Text fontSize="sm">{admindetails.name}</Text>
            <Text fontSize="xs" color="gray.600">
              Admin
            </Text>
          </VStack>}
        </Box>
      </Box>
      <Flex pt="70px">
        <VStack
          transition="all 0.5s"
          m="auto"
          backgroundColor="white"
          w="14%"
          h="250px"
          mt="60px"
          zIndex={20}
          shadow="sm"
        >
          <Button
            transition="all 0.5s"
            _hover={{ bg: "green.500", color: "white" }}
            justifyContent={"flex-start"}
            rounded="md"
            background={"white"}
            className="admin_left_button"
          >
            Order History
          </Button>
          <Button
            transition="all 0.5s"
            _hover={{ bg: "green.500", color: "white" }}
            justifyContent={"flex-start"}
            rounded="md"
            background={"white"}
            className="admin_left_button"
          >
            Cancelled orders
          </Button>
          <Button
            transition="all 0.5s"
            _hover={{ bg: "green.500", color: "white" }}
            justifyContent={"flex-start"}
            rounded="md"
            background={"white"}
            className="admin_left_button"
          >
            Add New Product
          </Button>
          <Button
            transition="all 0.5s"
            _hover={{ bg: "green.500", color: "white" }}
            justifyContent={"flex-start"}
            rounded="md"
            background={"white"}
            className="admin_left_button"
          >
            Delete Product
          </Button>
          <Button
            transition="all 0.5s"
            _hover={{ bg: "green.500", color: "white" }}
            justifyContent={"flex-start"}
            rounded="md"
            background={"white"}
            className="admin_left_button"
          >
            Update Product
          </Button>
        </VStack>
        <Box justifyContent={"flex-end"} w="86%">
          <OrderData product={productsadmin.Products} />
          <Grid
            gridAutoColumns={"repeat(1 1fr)"}
            h="500px"
            p="20px"
            w="95%"
            m="auto"
            gap="20px"
            id="scrollbar"
            overflowY={"scroll"}
          >
            {!productsadmin.GetLoading &&
              productsadmin.Products.map((ele) => (
                <SingleProduct product={ele} />
              ))}
          </Grid>
        </Box>
      </Flex>
      <Flex></Flex>
    </div>
  );
};

const SingleProduct = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch=useDispatch();
  const HandleDelete=(id)=>{
    dispatch(DeleteProductForAdmin(id))
  }

  return (
    <Box
      key={product._id}
      bg="#f6f6f6"
      shadow={"md"}
      alignItems="center"
      borderRadius="5px"
      border="1px solid"
      h="70px"
      p="10px"
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <HStack>
          <Image h="50px" src={product.image} alt={product.image} />
          <Text marginRight="100px"> {product.title}</Text>

          <Badge >₹{product.price}</Badge>
        </HStack>

        <Menu>
          <MenuButton
            as={Button}
            _active={{ bg: "none" }}
            bg="none"
            _hover={{ bg: "none" }}
            rightIcon={<BsThreeDotsVertical />}
          ></MenuButton>
          <MenuList
            fontSize={"xs"}
            minW="100px"
            w="80px"
            h="80px"
            p="0"
            m="auto"
          >
            <MenuItem onClick={()=>HandleDelete(product._id)} p="10px">
              <Box mr="10px">
                <DeleteIcon />
              </Box>
              Delete
            </MenuItem>
            <MenuItem onClick={()=>onOpen()} p="10px">
              <Box mr="10px">
                <FiEdit />
              </Box>
              Update
            </MenuItem>
            <UpdateModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} product={product}/>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default AdminDashBoard;

export function Card({ stat, icon, title }) {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"md"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}
export function OrderData({ product }) {
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      ></h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <Card title={"Users"} stat={"5,000"} icon={<BsPerson size={"3em"} />} />
        <Card title={"Admins"} stat={"7"} icon={<BsPerson size={"3em"} />} />
        <Card
          title={"Products"}
          stat={product.length}
          icon={<FiEdit size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}

const UpdateModal = ({ isOpen, onClose, product }) => { 
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [image, setImage] = useState(product.image);
  const [allimages, setallImages] = useState(product.allimages);
  const [total_quantity, setTotalQuantity] = useState(product.total_quantity);
  const [quantity, setQuantity] = useState(product.quantity);
  const [brand, setBrand] = useState(product.brand);
  const [rating,setRating]=useState(product.rating)
  let dispatch=useDispatch(); 
  const handleSubmit = () => {
    let newDate=new Date()
    let day=newDate.getDate()
    let year=newDate.getFullYear()
    let month=newDate.getMonth()
    let data={
      _id:product._id,
      title,
      description,
      price,
      category,
      image,
      allimages,
      quantity,
      brand,
      review:[],
      total_quantity,
      created_at:"",
      ordered_at:"",
      cancelled_at:"",
      updated_at:`${day}/${month+1}/${year}`,
      rating:rating,
    }
//  console.log(data)   
    dispatch(UpdateProductForAdmin(data))
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Product</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input value={image} onChange={(e) => setImage(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Images</FormLabel>
            <Input
              value={allimages.join(',')}
              onChange={(e) => setallImages(e.target.value.split(','))}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Total Quantity</FormLabel>
            <Input
              type="number"
              value={total_quantity}
              onChange={(e) => setTotalQuantity(parseInt(e.target.value))}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Quantity</FormLabel>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Brand</FormLabel>
            <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={()=>{handleSubmit();onClose()}}>
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export {UpdateModal};