import Section from "@packages/components/Section";

export default function PageNotFound() {
  return (
    <Section className="px-0 pt-32">
      <div className="flex flex-col items-center text-center space-y-2 md:space-y-4">
        <h1 className="font-semibold text-3xl sm:text-4xl leading-tight">Não encontramos sua página</h1>
        <p className="text-purple-400">(╯°□°)╯︵ ┻━┻</p>
        <p className="text-gray-500 max-w-3xl">Mas encontramos esse abacate!</p>
      </div>
    </Section>
  );
}
