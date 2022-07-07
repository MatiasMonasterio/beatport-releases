import {
  Heading,
  VStack,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  Avatar,
  Text,
  Select,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";

export default function Account() {
  return (
    <VStack spacing={8}>
      <Heading size="lg" borderBottom="1px solid" borderColor="gray.700" py={2} w="100%">
        Mis datos
      </Heading>

      <HStack w="100%" spacing={4}>
        <Avatar size="xl" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />

        <VStack alignItems="flex-start">
          <Heading as="h2" size="md" color="gray.300" fontWeight="medium">
            Matías M. Monasterio
          </Heading>

          <Text color="gray.400">Init with Google</Text>
        </VStack>
      </HStack>

      <Box w="100%">
        <Heading
          as="h3"
          fontWeight="medium"
          size="md"
          borderBottom="1px solid"
          borderColor="gray.700"
          mb={4}
        >
          Init session
        </Heading>

        <VStack as="form" color="gray.300" gap={4}>
          <FormControl>
            <FormLabel fontWeight="normal" fontSize="sm">
              Your email:
            </FormLabel>

            <HStack>
              <Input
                bgColor="gray.700"
                borderColor="gray.600"
                borderRadius="3px"
                value="matias_monasterio@outlook.com"
                color="gray.300"
                type="text"
                disabled
              />

              <Button colorScheme="blackAlpha">Modified</Button>
            </HStack>
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="normal" fontSize="sm">
              Your password:
            </FormLabel>

            <HStack>
              <Input
                bgColor="gray.700"
                borderColor="gray.600"
                borderRadius="3px"
                value="thisisapassword"
                color="gray.300"
                type="password"
                disabled
              />

              <Button colorScheme="blackAlpha">Modified</Button>
            </HStack>
          </FormControl>
        </VStack>
      </Box>

      <Box w="100%">
        <Heading
          as="h3"
          fontWeight="medium"
          size="md"
          borderBottom="1px solid"
          borderColor="gray.700"
          mb={4}
        >
          Private Data
        </Heading>

        <VStack as="form" color="gray.300" gap={4}>
          <FormControl>
            <FormLabel fontWeight="normal" fontSize="sm">
              Genre:
            </FormLabel>

            <RadioGroup>
              <Stack direction="row">
                <Radio value="1" borderColor="gray.700">
                  Male
                </Radio>
                <Radio value="2" borderColor="gray.700">
                  Female
                </Radio>
                <Radio value="3" borderColor="gray.700">
                  No Binary
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="normal" fontSize="sm">
              User Name:
            </FormLabel>

            <Input
              bgColor="gray.700"
              borderColor="gray.600"
              borderRadius="3px"
              value="Matias M. Monasterio"
              color="gray.300"
              type="text"
            />
          </FormControl>
        </VStack>
      </Box>

      <Box w="100%">
        <Heading
          as="h3"
          fontWeight="medium"
          size="md"
          borderBottom="1px solid"
          borderColor="gray.700"
          mb={4}
        >
          Private Data
        </Heading>

        <VStack as="form" color="gray.300" gap={4}>
          <FormControl>
            <FormLabel fontWeight="normal" fontSize="sm">
              Date:
            </FormLabel>

            <HStack>
              <Select placeholder="Select option" bgColor="gray.700" borderColor="gray.600">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>

              <Select placeholder="Select option" bgColor="gray.700" borderColor="gray.600">
                {new Array(12).map((index) => (
                  <option value="option1" key={index}>
                    Option 1
                  </option>
                ))}
              </Select>

              <Select placeholder="Select option" bgColor="gray.700" borderColor="gray.600">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </HStack>
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="normal" fontSize="sm">
              Country:
            </FormLabel>

            <Select placeholder="Select option" bgColor="gray.700" borderColor="gray.600">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </FormControl>
        </VStack>
      </Box>
    </VStack>
  );
}
