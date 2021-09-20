import {
  Box,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';

import { Logo } from '@packages/components/icons';
import { useI18n } from '@packages/features/i18n-context';
import {
  HeaderTitle,
  SocialLinks,
  SupportLinks,
} from '@packages/utils/footerData';

export default function Footer() {
  const bgColor = useColorModeValue('gray.200', 'gray.800');
  const color = useColorModeValue('gray.700', 'gray.200');
  const { t } = useI18n('footer');

  return (
    <Box bg={bgColor} color={color}>
      <Container as={Stack} py="1.5rem" px="1.5rem" maxW="100%">
        <SimpleGrid
          flexDirection={{ base: 'column', sm: 'row' }}
          spacing="5rem"
          display="flex"
          justifyContent="space-around"
        >
          <Stack spacing="1rem" flex="1 1 auto">
            <Box>
              <Logo />
            </Box>
            <Text fontSize="sm">
              © {new Date().getFullYear()} Podcodar. {t(`legal`)}
            </Text>
          </Stack>
          <Stack align="flex-start">
            <HeaderTitle title={t(`socials`)} />
            <SocialLinks />
          </Stack>
          <Stack align="flex-start">
            <HeaderTitle title={t(`support`)} />
            <SupportLinks />
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
