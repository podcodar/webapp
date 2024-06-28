import { Heading, Grid, Text } from "@chakra-ui/react";
import { Trans } from "react-i18next";
import Head from "next/head";

import { useI18n } from "@packages/features/i18n-context";
import { title } from "@packages/config/site";
import Section from "@packages/components/Section";
import { QuestionsProvider } from "@packages/features/questions-context";
import AddQuestionForm from "@packages/components/AddQuestionForm";
import ListQuestions from "@packages/components/ListQuestions";

export default function AskUsPage() {
	const { t } = useI18n("ask-us-page");
	return (
		<Section py="10rem">
			<Head>
				<title>
					{t("head")} - {title}
				</title>
			</Head>
			<Grid gap="2rem">
				<Heading fontWeight={600} fontSize={{ base: "3xl", sm: "4xl" }} lineHeight="110%" textAlign="center">
					<Trans
						i18nKey={t("title")}
						components={{
							span: <Text as="span" color="purple.400" />,
						}}
					/>
				</Heading>

				<QuestionsProvider>
					<AddQuestionForm />
					<ListQuestions />
				</QuestionsProvider>
			</Grid>
		</Section>
	);
}
