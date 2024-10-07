"use client";

import { HStack } from "@chakra-ui/react";

import { useI18n } from "@packages/features/i18n-context";

import Section from "./Section";
import {
  CssIcon,
  DockerIcon,
  GitIcon,
  HtmlIcon,
  JavaScriptIcon,
  LinuxIcon,
  NextIcon,
  NodeIcon,
  PythonIcon,
  ReactIcon,
  ReduxIcon,
  ShellIcon,
  SqlIcon,
  TypeScriptIcon,
  WebPackIcon,
} from "./icons";

const iconList = [
  GitIcon,
  HtmlIcon,
  CssIcon,
  JavaScriptIcon,
  ReactIcon,
  ReduxIcon,
  TypeScriptIcon,
  NodeIcon,
  NextIcon,
  PythonIcon,
  ShellIcon,
  WebPackIcon,
  SqlIcon,
  LinuxIcon,
  DockerIcon,
];

function TechSection() {
  const { t } = useI18n("roadmap");

  return (
    <Section>
      <h2 className="my-16 text-xl leading-tight font-semibold text-left">{t("tech-title")}</h2>

      <HStack spacing="1rem" flexWrap="wrap" justifyContent="center" alignItems="center" lineHeight="200%">
        {iconList.map((Icon) => (
          <Icon p="0.3rem" key={Icon.name} />
        ))}
      </HStack>
    </Section>
  );
}

export default TechSection;
