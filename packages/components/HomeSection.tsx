import React from 'react';
import { Icon, Box, useColorModeValue } from '@chakra-ui/react';
import { GoCode, GoBriefcase, GoCommentDiscussion } from 'react-icons/go';
import { SimpleGrid } from '@chakra-ui/react';

const HomeSection = () => {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} p="1rem" mt="3rem">
      <SimpleGrid
        minChildWidth="150px"
        spacing="50px"
        textAlign="center"
        margin={20}
      >
        <span>
          <Icon
            as={GoCommentDiscussion}
            w={7}
            h={7}
            marginBottom={3}
            color="purple.500"
          />

          <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Participe da comunidade
          </h3>
          <p>
            Parcicipe de meetups semanais com diversos outros profissionais da
            área de tecnologia e expanda seus conhecimentos.
          </p>
        </span>
        <span>
          <Icon as={GoCode} w={7} h={7} marginBottom={3} color="purple.500" />
          <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Aprenda a programar
          </h3>
          <p>
            Aprenda a programar de uma forma dinâmica através do
            compartilhamento de conhecimento e participe de nossas mentorias
            pesonalizadas ou em grupo.
          </p>
        </span>
        <span>
          <Icon
            as={GoBriefcase}
            w={7}
            h={7}
            marginBottom={3}
            color="purple.500"
          />
          <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Entre no mercado de trabalho
          </h3>
          <p>
            Prepare-se para o mercado através de simulações de entrevistas com
            profissionais já consolidados na área de tecnologia.
          </p>
        </span>
      </SimpleGrid>
    </Box>
  );
};

export default HomeSection;
