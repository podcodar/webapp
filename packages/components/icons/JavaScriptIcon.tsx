import { Flex, IconProps, Text } from '@chakra-ui/react';

export const JavaScriptIcon = (props: IconProps) => {
  return (
    <Flex
      background="#eace2c"
      alignItems="flex-end"
      justifyContent="right"
      borderRadius="10px"
      p="1rem 1rem 0 1rem"
      w="128px"
      h="128px"
    >
      <Text
        fontFamily="Noto Sans"
        fontSize="4rem"
        fontWeight="bold"
        color="white"
      >
        JS
      </Text>
    </Flex>
  );
};
