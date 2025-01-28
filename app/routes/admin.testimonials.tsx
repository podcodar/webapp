import { getDatabase } from "@packages/repositories/db";
import type { SelectTestimonial } from "@packages/repositories/db/schema";
import { type LoaderFunctionArgs, useLoaderData } from "react-router";

export async function loader({ context }: LoaderFunctionArgs) {
  const db = getDatabase(context);
  const testimonials = await db.testimonials;
  return { testimonials };
}

export default function AdminTestimonials() {
  const { testimonials } = useLoaderData<typeof loader>();
  return (
    <>
      <h3 className="text-xl">📜 Testimonials</h3>

      <h4 className="text-sm font-light">
        Create, update, and delete PodCodar testimonials
      </h4>

      <div id="content-table">
        <div className="overflow-x-auto">
          <TestimonialsTable testimonials={testimonials} />
        </div>
      </div>
    </>
  );
}

type TableProps = {
  testimonials: SelectTestimonial[];
};

function TestimonialsTable({ testimonials }: TableProps) {
  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <th>Name</th>
          <th>Message</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {testimonials.map((testimonial) => (
          <tr key={testimonial.id}>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={testimonial.avatarUrl}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>

                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm opacity-50">
                    {testimonial.profileUrl}
                  </div>
                </div>
              </div>
            </td>

            <td>{testimonial.description}</td>

            <th>
              <button
                className="btn btn-outline btn-error btn-xs"
                aria-label="Delete"
                type="button"
              >
                🗑️
              </button>
            </th>
          </tr>
        ))}
      </tbody>

      {/* foot */}
      <tfoot>
        <tr>
          <th />
          <th>Name</th>
          <th>Message</th>
          <th>Actions</th>
        </tr>
      </tfoot>
    </table>
  );
}
