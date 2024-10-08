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
    <Section>
      <h2 className="mx-4 my-16 font-semibold text-left text-xl leading-tight">{t("tech-title")}</h2>

      <div className="flex flex-wrap mx-4 items-center justify-center">
        {iconList.map((Icon, index) => {
          const iconSpacing = classes(index > 0 && "ml-4");

          return <Icon className={iconSpacing} style={{ padding: "0.3rem" }} key={Icon.name} />;
        })}
      </div>
    </Section>
  );
}

export default TechSection;
