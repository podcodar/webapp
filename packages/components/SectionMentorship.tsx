import React, { useState } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  useColorModeValue,
  HStack,
  Heading,
  Text,
} from '@chakra-ui/react';

function SectionMentorship() {
  const colors = useColorModeValue(
    ['orange.200', 'blue.300', 'green.400'],
    ['purple.100', 'purple.200', 'purple.300'],
  );
  const [tabIndex, setTabIndex] = React.useState(0);
  const bg = colors[tabIndex];
  return (
    <Box marginTop="5 rem" p="5rem">
      <Heading colorScheme="gray">Mentorias</Heading>

      <Text>
        Todas as nossas mentorias são direcionados por trilhas conforme a
        necessidade e o interesse de cada mentorando. Focado em desenvolvimento
        pessoal e o ingresso no mercado de trabalho.
      </Text>

      <Tabs
        onChange={(index) => setTabIndex(index)}
        bg={bg}
        orientation="horizontal"
        marginTop="2rem"
        borderRadius="10px"
        padding="2rem"
      >
        <TabList display="flex" border="none">
          <HStack spacing="2rem" margin="0 auto">
            <Tab>Mentorias personalizadas</Tab>
            <Tab>Mentorias em dupla</Tab>
            <Tab>Mentorias de projetos</Tab>
          </HStack>
        </TabList>
        <TabPanels p="2rem">
          <TabPanel>A mentoria personalizada tem como objetivo </TabPanel>
          <TabPanel>
            {' '}
            *troca de experiências *pair programming *colaboração{' '}
          </TabPanel>
          <TabPanel>
            {' '}
            Foco do aprendizado desenvolvento projetos internos ou externos.
            *pair programming *simulação de time *desenvolvimento de projetos
            *code review
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default SectionMentorship;
