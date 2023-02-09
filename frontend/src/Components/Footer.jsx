import { Box, Container, HStack, IconButton, Input, Link, SimpleGrid, Stack,Text, useColorModeValue } from "@chakra-ui/react";
import { BiMailSend } from "react-icons/bi";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return <Box h="auto" overflow={"hidden"} w="100%" display={{lg:"flex",xl:"flex",md:"flex",sm:"inherit","2xl":"flex"}} bg="rgb(167, 173, 173)">
          <Box 
          fontSize={"45px"}
          fontWeight="semibold"
          textDecoration="line-through"
          color={"green.500"}
          style={{ fontFamily: "inherit" }}
          pt="60px"
        >
          RAKIA
        </Box>
        <Container as={Stack} maxW={'6xl'} py={6}>
          
          <SimpleGrid
            templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
            >
            <Stack spacing={6}>
              <Box>
              </Box>

            </Stack>
            <Stack align={'flex-start'} textAlign="start">
              <Text className="footer_header">Company</Text>
              <Link id="all_footer_links"  href={'/aboutus'}>About us</Link>
              <Link id="all_footer_links"  href={'/blog'}>Blog</Link>
              <Link id="all_footer_links"  href={'contact'}>Contact us</Link>
              <Link  id="all_footer_links" href={'/pricing'}>Pricing</Link>
              <Link id="all_footer_links"  href={'/testimonials'}>Testimonials</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <Text claissName="footer_header">Support</Text>
              <Link id="all_footer_links" href={'/help'}>Help Center</Link>
              <Link id="all_footer_links"  href={'/tc'}>Terms of Service</Link>
              <Link id="all_footer_links" href={'/legal'}>Legal</Link>
              <Link id="all_footer_links"  href={'/privacypolicy'}>Privacy Policy</Link>
              <Link  id="all_footer_links" href={'/status'}>Status</Link>
            </Stack>
            <Stack align={'flex-start'}>  
              <Text className="footer_header" >Stay up to date</Text>
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
          </SimpleGrid>           
        </Container>
      </Box>
  };
  export default Footer