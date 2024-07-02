import { type FormEvent, useState } from "react";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Grid } from "@chakra-ui/layout";

import { useQuestionActions } from "@packages/features/questions-context";
import { useI18n } from "@packages/features/i18n-context";

export default function AddQuestionForm() {
  const actions = useQuestionActions();
  const [text, setText] = useState("");
  const { t } = useI18n("ask-us-page");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if text has at lease one word
    if (text.split("").length === 0) return;

    actions.addQuestion({
      text,
      votes: 0,
      answered: false,
    });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid gap="1rem" gridTemplateColumns={{ base: "1fr", sm: "3fr 1fr", md: "4fr 1fr" }}>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder={t("text-placeholder")} />
        <Button type="submit">{t("send-button")}</Button>
      </Grid>
    </form>
  );
}
