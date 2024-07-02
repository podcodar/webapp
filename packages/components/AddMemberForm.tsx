import { Button, FormControl, FormLabel, Grid, Heading, Input, Select, useToast } from "@chakra-ui/react";
import { type ChangeEvent, type FormEvent, useState } from "react";

import { useAddMemberFormView, useAddMemberFormActions } from "@packages/features/add-member-form-context";
import { useI18n } from "@packages/features/i18n-context";
import { membersApi } from "@packages/hooks/api";

import type { Role } from "@packages/entities/members";

export default function AddMemberForm() {
  const { t } = useI18n("team-page");
  const view = useAddMemberFormView();
  // TODO: move to actions
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await membersApi.create({
        github: view.github,
        linkedin: view.linkedin,
        role: view.role.selectedValue,
      });

      const description = t("toast.success", { username: view.github });
      toast({ description, status: "success", isClosable: true });
    } catch (e) {
      const description = (e as Error).message;
      toast({ description, status: "error", isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Heading py="1rem">{t("add-member-title")}</Heading>

      <Grid templateColumns="1fr 1fr" gap="1rem">
        <GithubInput />
        <LinkedinInput />

        <SelectRole />

        <Button type="submit" gridColumn="span 2" isLoading={loading}>
          {t("submit")}
        </Button>
      </Grid>
    </form>
  );
}

function GithubInput() {
  const { t } = useI18n("team-page");
  const { github } = useAddMemberFormView();
  const { changeGithub } = useAddMemberFormActions();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeGithub(e.target.value);
  };

  return (
    <FormControl>
      <FormLabel htmlFor="gh-username">{t("label.github")}</FormLabel>
      <Input id="gh-username" type="text" value={github} onChange={handleChange} />
    </FormControl>
  );
}

function LinkedinInput() {
  const { t } = useI18n("team-page");
  const { linkedin } = useAddMemberFormView();
  const { changeLinkedin } = useAddMemberFormActions();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeLinkedin(e.target.value);
  };

  return (
    <FormControl>
      <FormLabel htmlFor="linkedin-username">{t("label.linkedin")}</FormLabel>
      <Input id="linkedin-username" type="text" value={linkedin} onChange={handleChange} />
    </FormControl>
  );
}

function SelectRole() {
  const { t } = useI18n("team-page");
  const { role } = useAddMemberFormView();
  const { changeRole } = useAddMemberFormActions();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    changeRole(e.target.value as Role);
  };

  return (
    <FormControl gridColumn="span 2">
      <FormLabel htmlFor="role">{t("label.role")}</FormLabel>
      <Select id="role" onChange={handleChange} value={role.selectedValue}>
        {role.options.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
