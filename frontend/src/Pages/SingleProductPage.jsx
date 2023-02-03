import React from 'react'
import Navbar from '../Components/Navbar'
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Divider,
  Alert,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const SingleProductPage = () => {
const params=useParams()
const [product,setproduct]=useState({})
const productsbyId=async()=>{

  let data=await axios.get(`http://localhost:8080/products/${params._id}`)
  setproduct(data.data)
}
useEffect(()=>{
productsbyId()
},[])
  return (
    <div>
      <Navbar/>
      <Container maxW={'8xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Stack >
          <Image mb="100px"
            border={"4px solid #38A169"}
            rounded={'20px'}
            alt={'product image'}
            src={
            product.image
            }
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
         
        </Stack>
        
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
            {product.title}
            </Heading>
            
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}>
              ${product.price}
            </Text>
          </Box>
          <Divider borderColor={"green"}/>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <Divider borderColor={"green"}/>
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('green.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}>
              {product.description}
              </Text>
              <Text fontSize={'lg'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                maxime modi nam officiis porro, quae, quisquam quos
                reprehenderit velit? Natus, totam.
              </Text>
            </VStack>
            <Box mb="200px">
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={'green.500'}
                fontWeight={'500'}
                mb={'4'}>
                DETAILS
                </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Price:{product.price}</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem>{' '}
                  <ListItem>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Anti‑magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem>
                </List>
              </SimpleGrid>
            </Box> 
            
          </Stack>
          <Button
            w={'300px'}
            size={'md'}
            py={'7'}
            bg={useColorModeValue('green.500', 'gray.50')}
            _hover={{
              transform: 'translateY(4px)',
              boxShadow: 'md',
            }}
            color="white"
            >
            ADD TO CART
          </Button>
          <Divider borderColor={"green"}/>
          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>6-7 business days delivery</Text>
          </Stack>
          
        </Stack>
        
      </SimpleGrid>
      
    </Container>
      
    </div>
  )
}
export default SingleProductPage