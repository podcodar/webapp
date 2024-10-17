"use client";

import { useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";

import { LocalizedText } from "@packages/features/i18n-context";
import type { SelectTestimonial } from "@packages/repositories/db/schema";

import Section from "./Section";

interface Props {
  testimonials: SelectTestimonial[];
}

export default function TestimonialSection({ testimonials }: Props) {
  const bgColor = useColorModeValue("bg-gray-50", "bg-gray-900");

  return (
    <Section className={bgColor} innerClassName="grid gap-4">
      <h2 className="text-center font-semibold text-3xl sm:text-4xl py-8">
        <LocalizedText token="testimonials.title" />
      </h2>

      <div className="carousel w-full gap-4">
        {testimonials.map(({ id, name, description, avatarUrl }, idx) => (
          <TestimonialCard key={id} name={name} testimonial={description} img={avatarUrl} idx={idx} />
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
}

function TestimonialCard({ name, testimonial, img, idx }: TestimonialCardProps) {
  return (
    <div className="carousel-item relative w-full border-red-100" id={`testimonial-${idx}`}>
      <div className="card mx-40 min-w-400 border-10 border-blue-500 rounded-sm">
        <Image
          src={img}
          alt={name}
          width={100}
          height={100}
          className="rounded-full border-3 border-blue-500 max-w-4rem sm:max-w-4.5rem object-cover mx-auto"
        />
        <div className="card-body">
          <h2 className="card-title text-center">{name}</h2>
          <p>{testimonial}</p>
        </div>
      </div>

      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href={`#testimonial-${idx - 1}`} className="btn btn-circle">
          ❮
        </a>
        <a href={`#testimonial-${idx + 1}`} className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
}
