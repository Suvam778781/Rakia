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
  Textarea,
  Heading,
  ListItem,
  List,
  Container,
  Center,
  Td,
  Tr,
  Tbody,
  Thead,
  Table,
  Th,
  useBreakpointValue,
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
import {
  AddProductForAdmin,
  DeleteProductForAdmin,
  GetProductForAdmin,
  UpdateProductForAdmin,
} from "../HOF/Adminproductsreducer/Admin.products.action";
import { DeleteIcon, Search2Icon } from "@chakra-ui/icons";
import axios from "axios";
import { useState } from "react";
import { converttoUpper } from "../HOF/AllSmallFunction";
import { Navigate, useNavigate } from "react-router-dom";
const AdminDashBoard = () => {
  const [admindetails, setadmindetails] = useState({});
  const [search, setsearch] = useState("");
  const [adminloading, setadminloading] = useState(true);
  const [addmodal, setaddmodal] = useState(false);
  const [count, setcount] = useState(1);
  const [userloading, setuserloading] = useState(true);
  const [allusers, setallusers] = useState([]);
  const [alladmins, setalladmins] = useState([]);
  const dispatch = useDispatch();
  const productsadmin = useSelector((state) => state.AdminReducer);
  const userandadmin = useSelector((state) => state.useradminReducer);
  const [tempalluserdata, settempalluserdata] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const HandleSearch = () => {
    dispatch(GetProductForAdmin(search));
  };
  const GetAllUser = async () => {
    let admintoken = localStorage.getItem("admintoken") || "";
    try {
      setuserloading(true);
      let res = await axios(
        `${process.env.REACT_APP_BASE_URL}/users/allusers`,
        {
          headers: {
            Authorization: admintoken,
          },
        }
      );
      setuserloading(false);
      settempalluserdata(res.data);
    } catch (err) {
      setuserloading(false);
      toast({
        title: "Something Went Wrong.",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const GetAllAdmin = async () => {
    let admintoken = localStorage.getItem("admintoken") || "";
    try {
      let res = await axios(
        `${process.env.REACT_APP_BASE_URL}/admin/alladmin`,
        {
          headers: {
            Authorization: admintoken,
          },
        }
      );
      setalladmins(res.data);
    } catch (err) {
      toast({
        title: "Something Went Wrong.",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const GetAdminDetails = async () => {
    let admintoken = localStorage.getItem("admintoken") || "";

    try {
      setadminloading(true);
      let res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/singleadmin`,
        {
          headers: {
            Authorization: admintoken,
          },
        }
      );
      setadmindetails(false);
      setadmindetails(res.data);
    } catch (err) {
      setadmindetails(false);
      toast({
        title: "Admin Fetch Error.",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  //  filter here
  const FilterCancelled = () => {
    setcount(2);
    let filterdata = tempalluserdata.filter(
      (user) => user.allorders.length > 0
    );
    filterdata = filterdata.map((user) => {
      user.allorders = user.allorders.filter(
        (order) => order.status === "cancelled"
      );
      if(user.allorders.length>0){
      return user;
      };
    });
    setallusers(filterdata);
  };
  const FilterPlaced = () => {
    setcount(3);

    let filterdata = tempalluserdata.filter(
      (user) => user.allorders.length > 0
    );
    filterdata = filterdata.map((user) => {
      user.allorders = user.allorders.filter(
        (order) => order.status === "placed"
      );
      return user
    });
    setallusers(filterdata);
  };
  const HandleOrderHistory = () => {
    setcount(4);
    setallusers(tempalluserdata);
  };
  useEffect(() => {
    dispatch(GetProductForAdmin());
  }, []);
  useEffect(() => {
    GetAdminDetails();
    GetAllUser();
    GetAllAdmin();
  }, [count]);

  return (
    <div>
      <Box
        w="100%"
        px="20px"
        lineHeight={""}
        zIndex="21"
        boxShadow={"lg"}
        backgroundColor="#f6f6f6"
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
          onClick={() => navigate("/")}
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
            onChange={(e) => setsearch(e.target.value)}
            placeholder="Enter..."
            borderRadius={"0px"}
            border="none"
            value={search}
            borderBottom="1px solid black"
            _hover={{ borderBottom: "1px solid black" }}
            _after={{ borderBottom: "1px solid black" }}
            h="30px"
            color="gray"
            _placeholder={{ color: "grey" }}
          />
          <Search2Icon onClick={HandleSearch} ml="10px" color={"grey"} />
        </Box>
        <Box display={"flex"}>
          <Avatar size={"sm"} margin="auto 0px auto 0px" />
          {!adminloading ? (
            <Progress />
          ) : (
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
            </VStack>
          )}
        </Box>
      </Box>
      <Flex pt="70px">
        <VStack
          transition="all 0.5s"
          m="auto"
          backgroundColor="white"
          w={{base:"12%",sm:"12%",md:"12%",lg:"12%",xl:"12%","2xl":"12%"}}
          h="250px"
          mt="60px"
          zIndex={20}
        >
          <Button
            shadow={"sm"}
            transition="all 0.5s"
            bgColor={count == 1 ? "green.500" : "tranparent"}
            color={count == 1 ? "white" : "black"}
            bgImage={
              count == 1 &&
              "https://images.ctfassets.net/5de70he6op10/4IFhnhWQZpy0mGYEQeDwyZ/7f5135fc723f65cebb8463a4a2d677b8/Dress_Toppers_Party_Live_Text.jpg?w=630&q=80&fm=webp"
            }
            justifyContent={"flex-start"}
            rounded="md"
            _hover={{ bg: "green.500" }}
            background={"white"}
            className="admin_left_button"
            onClick={() => {
              setcount(1);
            }}
          >
            All Products
          </Button>
          <Button
            shadow={"sm"}
            transition="all 0.5s"
            _hover={{ bg: "green.500" }}
            justifyContent={"flex-start"}
            rounded="md"
            bgImage={
              count == 2 &&
              "https://images.ctfassets.net/5de70he6op10/4IFhnhWQZpy0mGYEQeDwyZ/7f5135fc723f65cebb8463a4a2d677b8/Dress_Toppers_Party_Live_Text.jpg?w=630&q=80&fm=webp"
            }
            background={"white"}
            className="admin_left_button"
            onClick={() => FilterCancelled()}
            bgColor={count == 2 ? "green.500" : "tranparent"}
            color={count == 2 ? "white" : "black"}
          >
            Cancelled Orders
          </Button>
          <Button
            bgImage={
              count == 3 &&
              "https://images.ctfassets.net/5de70he6op10/4IFhnhWQZpy0mGYEQeDwyZ/7f5135fc723f65cebb8463a4a2d677b8/Dress_Toppers_Party_Live_Text.jpg?w=630&q=80&fm=webp"
            }
            shadow={"sm"}
            transition="all 0.5s"
            _hover={{ bg: "green.500" }}
            justifyContent={"flex-start"}
            rounded="md"
            background={"white"}
            className="admin_left_button"
            onClick={() => FilterPlaced()}
            bgColor={count == 3 ? "green.500" : "tranparent"}
            color={count == 3 ? "white" : "black"}
          >
            Placed Orders
          </Button>
          <Button
            shadow={"sm"}
            transition="all 0.5s"
            _hover={{ bg: "green.500" }}
            justifyContent={"flex-start"}
            rounded="md"
            background={"white"}
            className="admin_left_button"
            onClick={() => HandleOrderHistory()}
            bgImage={
              count == 4 &&
              "https://images.ctfassets.net/5de70he6op10/4IFhnhWQZpy0mGYEQeDwyZ/7f5135fc723f65cebb8463a4a2d677b8/Dress_Toppers_Party_Live_Text.jpg?w=630&q=80&fm=webp"
            }
            bgColor={count == 4 ? "green.500" : "tranparent"}
            color={count == 4 ? "white" : "black"}
          >
            Order History
          </Button>
        </VStack>
        <Box justifyContent={"flex-end"} w="80%">
          <OrderData
            product={productsadmin.Products}
            allusers={allusers}
            alladmins={alladmins}
          />
          {/* all products */}
          {count == 1 && (
            <Box>
              <Button
                onClick={() => setaddmodal(true)}
                shadow={"sm"}
                my="20px"
                transition="all 0.5s"
                _hover={{ bg: "green.500", color: "white" }}
                justifyContent={"flex-start"}
                rounded="md"
                background={"white"}
                className="admin_left_button"
              >
                Add New Product
              </Button>
              <AddModal addmodal={addmodal} setaddmodal={setaddmodal} />
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
          )}

          {(count == 4 || count == 3 || count == 2) && (
            <Box>
              {!userloading &&
                allusers.map((ele) => <OrderHistory userdata={ele} />)}
            </Box>
          )}
        </Box>
      </Flex>
      <Flex></Flex>
    </div>
  );
};
const SingleProduct = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const HandleDelete = (id) => {
    dispatch(DeleteProductForAdmin(id));
  };

  return (
    <Box
      key={`${product._id}`}
      bg="#f6f6f6"
      shadow={"md"}
      alignItems="center"
      borderRadius="5px"
      border="1px solid"
      h="70px"
      p="10px"
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <HStack textAlign={"left"} w="50%" justifyContent={"space-between"}>
          <Image h="50px" src={product.image} alt={product.image} />
          <Text textAlign={"left"} marginRight="100px">
            {" "}
            {product.title}
          </Text>

          <Badge>₹ {product.price}</Badge>
        </HStack>
        <HStack>
          <Badge>Stock : {product.total_quantity}</Badge>
          <Menu w="20%">
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
              <MenuItem onClick={() => HandleDelete(product._id)} p="10px">
                <Box mr="10px">
                  <DeleteIcon />
                </Box>
                Delete
              </MenuItem>
              <MenuItem onClick={() => onOpen()} p="10px">
                <Box mr="10px">
                  <FiEdit />
                </Box>
                Update
              </MenuItem>
              <UpdateModal
                onOpen={onOpen}
                onClose={onClose}
                isOpen={isOpen}
                product={product}
              />
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};
export default AdminDashBoard;
export function Card({ stat, icon, title, bg }) {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      // border={"1px solid"}
      bgImage={bg}
      rounded={"sm"}
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
export function OrderData({ product, allusers, alladmins }) {
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      ></h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <Card
          title={"Users"}
          bg="https://images.ctfassets.net/5de70he6op10/54JigepSuZ2XyUc23wRjO3/b28c3fc1698914dd898dbe7ebcbd88c1/Dress_Toppers_Casual_Live_Text.jpg?w=630&q=80&fm=webp"
          stat={allusers.length}
          icon={<BsPerson size={"3em"} />}
        />
        <Card
          title={"Admins"}
          bg="https://images.ctfassets.net/5de70he6op10/4IFhnhWQZpy0mGYEQeDwyZ/7f5135fc723f65cebb8463a4a2d677b8/Dress_Toppers_Party_Live_Text.jpg?w=630&q=80&fm=webp"
          stat={alladmins.length}
          icon={<BsPerson size={"3em"} />}
        />
        <Card
          bg="https://images.ctfassets.net/5de70he6op10/6IfiRiqCR8n6Qtx499wHhk/045c88beb8c368c4ea7fa3c40174b796/Dress_Toppers_Wedding_Live_Text.jpg?w=630&q=80&fm=webp"
          title={"Products"}
          stat={product.length}
          icon={<FiServer size={"3em"} />}
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
  const [rating, setRating] = useState(product.rating);
  let dispatch = useDispatch();
  const handleSubmit = () => {
    let newDate = new Date();
    let day = newDate.getDate();
    let year = newDate.getFullYear();
    let month = newDate.getMonth();
    let data = {
      _id: product._id,
      title,
      description,
      price,
      category,
      image,
      allimages,
      quantity,
      brand,
      review: [],
      total_quantity,
      updated_at: `${day}/${month + 1}/${year}`,
      rating: rating,
    };
    //  console.log(data)
    dispatch(UpdateProductForAdmin(data));
  };
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
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
            <Textarea
              value={allimages.join(",")}
              onChange={(e) => setallImages(e.target.value.split(","))}
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
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              handleSubmit();
              onClose();
            }}
          >
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const AddModal = ({ addmodal, setaddmodal }) => {
  const dispatch = useDispatch();
  let newDate = new Date();
  let day = newDate.getDate();
  let year = newDate.getFullYear();
  let month = newDate.getMonth();

  const initialData = {
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    allimages: [],
    quantity: "",
    brand: "",
    review: [],
    total_quantity: "",
    created_at: `${day}/${month + 1}/${year}`,
    ordered_at: "",
    cancelled_at: "",
    updated_at: "",
    rating: "",
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    dispatch(AddProductForAdmin(formData));
    setaddmodal(false);
    setFormData(initialData);
  };
  return (
    <Modal isOpen={addmodal} size="xl" onClose={() => setaddmodal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Product</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Grid gridAutoColumns={"repeat(2 1fr)"}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>All Images</FormLabel>
                <Textarea
                  name="allimages"
                  value={formData.allimages.join(",")}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      allimages: e.target.value.split(","),
                    }));
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Brand</FormLabel>
                <Input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Total Quantity</FormLabel>
                <Input
                  name="total_quantity"
                  value={formData.total_quantity}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Rating</FormLabel>
                <Input
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Add Product
          </Button>
          <Button onClick={() => setaddmodal(false)}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
const OrderHistory = ({ userdata }) => {
  const tableSize = useBreakpointValue
  ({ base: "sm", md: "md", lg: "lg" });
  const total = () => {
    let total = 0;
    userdata.allorders.map((ele) => {
      total += ele.price * ele.quantity;
    });

    return total;
  };
  return (
    <Container maxW="container.lg">
      <Heading textAlign={"left"} p="4" size="md" mt="3" color={"GrayText"}>
        {converttoUpper(userdata.firstname)} {converttoUpper(userdata.lastname)}
        's Orders
      </Heading>
      {userdata.allorders.length > 0 ? (
        <List border="1px" borderColor="gray.200" borderRadius="md">
    <Table variant="simple" minW={"100%"} maxW="100%">
      <Thead>
        <Tr>
          <Th color={"yellow.600"}>Image</Th>
          <Th color={"yellow.600"}>Description</Th>
          <Th color={"yellow.600"}>Price</Th>
          <Th color={"yellow.600"}>Quantity</Th>
          {tableSize === "lg" && (
            <>
              <Th color={"yellow.600"}>Ordered At</Th>
              <Th color={"yellow.600"}>Cancelled At</Th>
            </>
          )}
        </Tr>
      </Thead>
      <Tbody>
        {userdata.allorders.map((order) => (
          <Tr fontSize={"13px"}>
            <Td>
              <Image h="200px" objectFit={"contain"} src={order.image} />
            </Td>
            <Td color={"gray.500"}>{order.description}</Td>
            <Td>₹{(order.price).toLocaleString()}</Td>
            <Td>{order.quantity}</Td>
            {tableSize === "lg" && (
              <>
                <Td>
                  <Badge color={"white"} bgColor="green.500">
                    {order.ordered_at}
                  </Badge>
                </Td>
                <Td color="red.600">
                  <Badge color={"white"} bgColor="red.500">
                    {order.cancelled_at || "null"}
                  </Badge>
                </Td>
              </>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
          <Flex
            display={"flex"}
            p="3"
            w="100%"
            verticalAlign={"center"}
            justifyContent={"space-between"}
          >
            <Text fontWeight={"600"} color={"red.400"}>
              TOTAL
            </Text>
            <Badge>₹ {total().toLocaleString()}</Badge>
          </Flex>
        </List>
      ) : (
        <Center border="1px" borderColor="gray.200" borderRadius="md" h="150px">
          <Text fontSize="sm">No orders yet.</Text>
        </Center>
      )}
    </Container>
  );
};

export { UpdateModal, AddModal };
