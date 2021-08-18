import React from 'react';
import { Icon, Container } from '@chakra-ui/react';
import { GoCode, GoBriefcase, GoCommentDiscussion } from 'react-icons/go';
import { SimpleGrid } from '@chakra-ui/react';

const HomeSection = () => {
  return (
    <Container maxW="container.md">
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
            Participe de uma comunidade
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum et
            voluptates aperiam ipsum enim provident iusto at corporis saepe
            officiis.
          </p>
        </span>
        <span>
          <Icon as={GoCode} w={7} h={7} marginBottom={3} color="purple.500" />
          <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Aprenda a programar
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            perspiciatis neque ducimus, tempore commodi quia dolorum illum ea
            nulla porro. Quam laborum repudiandae, similique harum eum illo et
            minus, obcaecati nobis eos blanditiis quia dolore reiciendis aut rem
            alias cupiditate perspiciatis quos necessitatibus qui numquam
            eveniet repellendus. Reiciendis, atque minima.
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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel nobis
            repellat, quo deserunt laboriosam odio adipisci commodi rerum beatae
            quidem impedit, aut reiciendis eos et esse dolore eius porro
            numquam.
          </p>
        </span>
      </SimpleGrid>
    </Container>
  );
};

export default HomeSection;
