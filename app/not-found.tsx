import Section from "@packages/components/Section";

export default function PageNotFound() {
  return (
    <Section className="px-0 pt-32">
      <div className="flex flex-col items-center space-y-2 text-center md:space-y-4">
        <h1 className="font-semibold text-3xl leading-tight sm:text-4xl">Não encontramos sua página</h1>
        <p className="text-purple-400">(╯°□°)╯︵ ┻━┻</p>
        <p className="max-w-3xl text-gray-500">Mas encontramos esse abacate!</p>
      </div>
    </Section>
  );
}
