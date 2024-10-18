import { LocalizedText } from "@packages/locale/context";
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
  return (
    <Section innerClassName="grid gap-8">
      <h2 className="font-semibold text-center text-xl leading-tight">
        <LocalizedText token="roadmap.tech-title" />
      </h2>

      <div className="flex flex-wrap gap-6 items-center justify-center">
        {iconList.map((Icon) => (
          <Icon key={Icon.name} title={Icon.name} />
        ))}
      </div>
    </Section>
  );
}

export default TechSection;
