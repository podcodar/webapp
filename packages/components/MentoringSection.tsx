import { LocalizedText, type TranslationToken } from "@packages/locale/context";
import Section from "./Section";

export default function MentoringSection() {
  return (
    <Section className="bg-white py-20 dark:bg-gray-950">
      <div className="grid grid-cols-5 gap-0 md:gap-4">
        <div className="col-span-5 row-span-1 md:col-span-2 md:row-span-3">
          <h2 className="my-8 text-center font-medium text-lg">
            <LocalizedText token="mentoring.title" />
          </h2>

          <div className="px-12 text-center text-4xl text-gray-400">
            <LocalizedText token="mentoring.description" />
          </div>
        </div>

        {mentoringList.map((mentoring) => (
          <CardItem
            key={mentoring}
            title={`mentoring.${mentoring}.title`}
            description={`mentoring.${mentoring}.description`}
          />
        ))}
      </div>
    </Section>
  );
}

interface CardItemProps {
  title: TranslationToken;
  description: TranslationToken;
}

function CardItem({ title, description }: CardItemProps) {
  return (
    <div className="col-span-5 text-center md:col-span-3 md:text-left">
      <h3 className="my-8 font-medium text-md">
        <LocalizedText token={title} />
      </h3>
      <span className="text-gray-500">
        <LocalizedText token={description} />
      </span>
    </div>
  );
}

const mentoringList = ["study-mentorships", "project-mentoring", "market-mentoring"];
