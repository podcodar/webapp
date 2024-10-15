"use client";

import { useI18n } from "@packages/features/i18n-context";
import { classes } from "@packages/utils/classes";

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
    <Section className="py-2">
      <h2 className="font-semibold text-center text-xl leading-tight p-4 mx-4">{t("tech-title")}</h2>

      <div className="flex flex-wrap items-center justify-center p-4 mx-4">
        {iconList.map((Icon, index) => {
          const iconSpacing = classes("p-1", index > 0 && "ml-4");

          return <Icon className={iconSpacing} key={Icon.name} />;
        })}
      </div>
    </Section>
  );
}

export default TechSection;
