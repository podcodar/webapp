"use client";

import { useI18n } from "@packages/features/i18n-context";

import {
  DockerIcon,
  GitIcon,
  JavaScriptIcon,
  NextIcon,
  NodeIcon,
  PythonIcon,
  ReactIcon,
  ReduxIcon,
  ShellIcon,
  SqlIcon,
  TypeScriptIcon,
  LinuxIcon,
  WebPackIcon,
  HtmlIcon,
  CssIcon,
} from "./icons";
import Section from "./Section";

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
      <h2 className="mx-4 my-16 font-semibold text-left text-xl leading-tight">{t("tech-title")}</h2>

      <div className="flex flex-wrap mx-4 items-center justify-center">
        {iconList.map((Icon) => (
          <Icon className="ml-4:first-child:ml-0" p="0.3rem" key={Icon.name} />
        ))}
      </div>
    </Section>
  );
}

export default TechSection;
