import { GithubIcon, LinkedInIcon } from "@packages/components/icons";
import { getDatabase } from "@packages/repositories/db";
import { classes } from "@packages/utils/classes";
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

const badgeRoleMap: Record<string, string> = {
  mentored: "badge-secondary",
  mentor: "badge-primary",
  engineer: "badge-success",
};

function MembersTable() {
  const { members } = useLoaderData<typeof loader>();
  const headers = (
    <>
      <th>Name</th>
      <th>Role</th>
      <th>Social</th>
      <th>Actions</th>
    </>
  );

  return (
    <table className="table">
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

                <div>
                  <div className="font-bold">
                    {member.name.split(" ").slice(0, 2).join(" ")}
                  </div>
                </div>
              </div>
            </td>

            <td>
              <span className={classes("badge", badgeRoleMap[member.role])}>
                {member.role}
              </span>
            </td>

            <td>
              <a
                href={member.github}
                className="btn btn-ghost btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
              </a>

              <a
                href={member.linkedin}
                className="btn btn-ghost btn-sm text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </a>
            </td>

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
