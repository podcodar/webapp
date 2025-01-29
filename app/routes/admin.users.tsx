import { getDatabase } from "@packages/repositories/db";
import { type LoaderFunctionArgs, useLoaderData } from "react-router";

export async function loader({ context }: LoaderFunctionArgs) {
  const db = getDatabase(context);
  const members = await db.members;
  return { members };
}
export default function AdminMembers() {
  return (
    <>
      <h3 className="text-xl">📜 Users</h3>

      <h4 className="text-sm font-light">
        Add, update, and delete PodCodar members
      </h4>

      <div id="content-table">
        <MembersTable />
      </div>
    </>
  );
}

function MembersTable() {
  const { members } = useLoaderData<typeof loader>();
  const headers = (
    <>
      <th>Name</th>
      <th>Role</th>
      <th>Github</th>
      <th>linkedin</th>
      <th>Actions</th>
    </>
  );
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
          {headers}
        </tr>
      </thead>

      <tbody>
        {members.map((member) => (
          <tr key={member.id}>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={member.avatar} alt={member.name} />
                  </div>
                </div>
              </div>
            </td>

            <td>{member.role}</td>

            <td>{member.github}</td>

            <td>{member.linkedin}</td>

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
          {headers}
        </tr>
      </tfoot>
    </table>
  );
}
