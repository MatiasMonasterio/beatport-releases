import type { User } from "@br/core";

import { useState, useEffect } from "react";
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

import { useHttpRequest } from "hooks";
import { getUserInfo } from "@/dashboard/services/user";

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const { callRequest } = useHttpRequest();

  useEffect(() => {
    callRequest(getUserInfo).then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <VStack spacing={8}>
      <Heading size="lg" borderBottom="1px solid" borderColor="secondary.black.600" py={2} w="100%">
        Mis datos
      </Heading>

      <HStack w="100%" spacing={4}>
        <Avatar size="xl" name={user?.username} src={user?.avatar} />

        <VStack alignItems="flex-start">
          <Heading as="h2" size="md" color="secondary.gray.200" fontWeight="medium">
            {user?.username}
          </Heading>

          <Text>Init with Google</Text>
        </VStack>
      </HStack>

      <Box w="100%">
        <Heading
          as="h3"
          fontWeight="medium"
          size="md"
          borderBottom="1px solid"
          borderColor="secondary.black.600"
          mb={4}
        >
          Init session
        </Heading>

        <VStack as="form" gap={4}>
          <FormControl>
            <FormLabel fontWeight="normal" fontSize="sm">
              Your email:
            </FormLabel>

            <HStack>
              <Input value={user?.email} type="text" disabled />
              <Button bgColor="secondary.pink" color="secondary.gray.200">
                Modified
              </Button>
            </HStack>
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="normal" fontSize="sm">
              Your password:
            </FormLabel>

            <HStack>
              <Input value={user?.password} type="password" disabled />
              <Button bgColor="secondary.pink" color="secondary.gray.200">
                Modified
              </Button>
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
          borderColor="secondary.black.600"
          mb={4}
        >
          Private Data
        </Heading>

        <VStack as="form" gap={4}>
          <FormControl>
            <FormLabel fontWeight="normal" fontSize="sm">
              Genre:
            </FormLabel>

            <RadioGroup value={user?.genre}>
              <Stack direction="row">
                <Radio value="male" borderColor="secondary.black.600">
                  Male
                </Radio>
                <Radio value="female" borderColor="secondary.black.600">
                  Female
                </Radio>
                <Radio value="nobinary" borderColor="secondary.black.600">
                  No Binary
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="normal" fontSize="sm">
              User Name:
            </FormLabel>

            <Input value={user?.username} type="text" />
          </FormControl>
        </VStack>
      </Box>

      <Box w="100%">
        <Heading
          as="h3"
          fontWeight="medium"
          size="md"
          borderBottom="1px solid"
          borderColor="secondary.black.600"
          mb={4}
        >
          Private Data
        </Heading>

        <VStack as="form" gap={4}>
          <FormControl>
            <FormLabel fontWeight="normal" fontSize="sm">
              Date:
            </FormLabel>

            <HStack>
              <Select placeholder="Day" borderColor="secondary.black.600">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>

              <Select placeholder="Month" borderColor="secondary.black.600">
                {new Array(12).map((index) => (
                  <option value="option1" key={index}>
                    Option 1
                  </option>
                ))}
              </Select>

              <Select placeholder="Year" borderColor="secondary.black.600">
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

            <Select placeholder="Select option" borderColor="secondary.black.600">
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
