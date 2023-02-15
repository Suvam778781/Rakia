import { Box, Container, Divider, HStack, IconButton, Input, Link, SimpleGrid, Stack,Text, useColorModeValue } from "@chakra-ui/react";
import { BiMailSend } from "react-icons/bi";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return <Box h="auto" overflow={"hidden"} w="100%" p="3" display={{lg:"flex",xl:"flex",md:"flex",sm:"inherit","2xl":"flex"}} bg="rgb(167, 173, 173)">
          <Box w={{sm:"90%",md:"30%",lg:"30%",}}
          fontSize={"40px"}
          fontWeight="semibold"
          textDecoration="line-through"
          color={"green.500"}
          style={{ fontFamily: "inherit" }}
          pt="20px"
        >
          RAKIA
        </Box>

        <Container as={Box}  display={{sm:"flex",lg:"flex",md:"flex",xl:"flex","2xl":"flex"}} justifyContent="space-between"  m="auto" maxW={'6xl'} py={6}>

          <Box w={{sm:"90%",lg:"50%",xl:"50%","2xl":"50%"}}  display={"flex"} spacing={5} justifyContent="space-between">
         
            <Stack fontSize={{sm:"12px",md:"12px",lg:"13px",xl:"14px","2xl":"15px" }} align={'flex-start'} textAlign="start">
              <Text className="footer_header" color={"green.900"}>Company</Text>
              <Divider/>
              <Link id="all_footer_links"  href={'/aboutus'}>About us</Link>
              <Link id="all_footer_links"  href={'/blog'}>Blog</Link>
              <Link id="all_footer_links"  href={'contact'}>Contact us</Link>
              <Link id="all_footer_links"  href={'/testimonials'}>Testimonials</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <Text claissName="footer_header" color={"green.900"}>Support</Text>
              <Divider/>
              <Link id="all_footer_links" href={'/help'}>Help Center</Link>
              <Link id="all_footer_links"  href={'/tc'}>Terms of Service</Link>
              <Link id="all_footer_links" href={'/legal'}>Legal</Link>
              <Link id="all_footer_links"  href={'/privacypolicy'}>Privacy Policy</Link>
              <Link  id="all_footer_links" href={'/status'}>Status</Link>
            </Stack>

         </Box>   

            <Stack align={'flex-start'} ml="20px">  
              <Text className="footer_header" color={"green.900"} >Stay up to date</Text>
              <Divider/>
              <HStack display="flex" m="auto">
                <Input
                  placeholder={'Enter email address'}
                  bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                  border={0}
                  _focus={{
                    bg:useColorModeValue('green.100', 'gray.200')
                  }}
                />
                <IconButton w="30px"
                  bg={'green.500'}
                  color={useColorModeValue('white', 'gray.800')}
                  _hover={{
                    bg: 'green.600',
                  }}
                  aria-label="Subscribe"
                  icon={<BiMailSend />}
                />
              </HStack>


              <Stack p="60px" display={"flex"}  direction={'row'} spacing={5}>
                <Link label={'Twitter'} href={'#'}>
                  <FaTwitter size={27} />
                </Link>
                <Link label={'Twitter'} href={'#'}>
                  <FaYoutube  size={27} />
                </Link>
                <Link label={'Twitter'} href={'#'}>
                  <FaInstagram size={27} />
                </Link>
                <Link label={'Twitter'} href={'#'}>
                  <FaLinkedin size={27} />
                </Link>
              </Stack>
            </Stack>


      
        </Container>
      </Box>
  };
  export default Footer