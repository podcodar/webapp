import { LocalizedText } from "@packages/locale/context";
import type { SelectTestimonial } from "@packages/repositories/db/schema";

import Section from "./Section";

interface Props {
  testimonials: SelectTestimonial[];
}

export default function TestimonialSection({ testimonials }: Props) {
  return (
    <Section
      className="bg-gray-50 dark:bg-gray-900"
      innerClassName="grid gap-4"
    >
      <h2 className="py-8 text-center font-semibold text-3xl sm:text-4xl">
        <LocalizedText token="testimonials.title" />
      </h2>

      <div className="carousel w-full gap-4">
        {testimonials.map(({ id, name, description, avatarUrl }, idx) => (
          <TestimonialCard
            key={id}
            name={name}
            testimonial={description}
            img={avatarUrl}
            idx={idx}
            maxSize={testimonials.length - 1}
          />
        ))}
      </div>

      <div className="flex w-full justify-center gap-2 py-2">
        {testimonials.map(({ id }, idx) => (
          <a href={`#testimonial-${idx}`} className="btn btn-xs" key={id}>
            {idx + 1}
          </a>
        ))}
      </div>
    </Section>
  );
}

interface TestimonialCardProps {
  name: string;
  testimonial: string;
  img: string;
  idx: number;
  maxSize: number;
}

function TestimonialCard({
  name,
  testimonial,
  img,
  idx,
  maxSize,
}: TestimonialCardProps) {
  const nextIdx = idx === maxSize ? 0 : idx + 1;
  const prevIdx = idx === 0 ? maxSize : idx - 1;

  return (
    <div
      className="carousel-item relative w-full border-red-100"
      id={`testimonial-${idx}`}
    >
      <div className="card mx-12 md:mx-24 xl:mx-32 min-w-400 rounded-sm border-10 border-blue-500">
        <img
          src={img}
          alt={name}
          width={100}
          height={100}
          className="mx-auto max-w-4rem rounded-full border-3 border-blue-500 object-cover sm:max-w-4.5rem"
        />
        <div className="card-body">
          <h2 className="card-title mx-auto">{name}</h2>
          <p>{testimonial}</p>
        </div>
      </div>

      <div className="-translate-y-1/2 absolute top-1/2 right-5 left-5 flex transform justify-between">
        <a href={`#testimonial-${prevIdx}`} className="btn btn-circle">
          ❮
        </a>
        <a href={`#testimonial-${nextIdx}`} className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
}
