import { classes } from "@packages/utils/classes";
import { Fragment } from "react/jsx-runtime";
import Link from "./Link";

type Tabs = {
  id: string;
  title: string;
};

type TabNavProps = {
  tabs: Tabs[];
  children: React.ReactNode;
  hidden?: boolean;
  activeTab?: string;
  header?: React.ReactNode;
};

export function TabNav(props: TabNavProps) {
  const { tabs, hidden = false, activeTab = "" } = props;

  if (hidden) return props.children;

  console.log({
    activeTab,
    tabs,
  });

  return (
    <nav className="grid gap-4">
      {props.header}

      <div role="tablist" className="tabs tabs-lift ">
        {tabs.map((tab) => (
          <Fragment key={tab.id}>
            <Link
              role="tab"
              className={classes("tab", tab.id === activeTab && "tab-active")}
              href={`/admin/${tab.id}`}
            >
              {tab.title}
            </Link>

            <div className="tab-content bg-base-100 border-base-300 p-6">
              {props.children}
            </div>
          </Fragment>
        ))}
      </div>
    </nav>
  );
}
