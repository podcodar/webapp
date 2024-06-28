import { type ChakraProps, Container, Box } from "@chakra-ui/react";

import type { ReactNode } from "react";

interface Props extends ChakraProps {
	children: ReactNode;
	id?: string;
}

function Section({ children, ...props }: Props) {
	return (
		<Box py="4rem" {...props}>
			<Container maxW="5xl">{children}</Container>
		</Box>
	);
}

export default Section;
