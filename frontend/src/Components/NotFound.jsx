import { Box, Heading, Text, Button, Badge } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
    const navigate=useNavigate()
  return (
    <Box textAlign="center" py={10} px={6}>
      <Badge
        display="inline-block"
        fontSize={"30px"}
        backgroundColor={"white"}
        shadow="md"
        color="red.400"
        >
        404
      </Badge>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>
      <Button
       bgColor="green.500"
        color="white"
        onClick={()=>navigate("/")}
        >
        Go to Home
      </Button>
    </Box>
  );
}
