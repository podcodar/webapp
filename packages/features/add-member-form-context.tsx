import { type Dispatch, useReducer } from "react";

import createCtx from "@packages/utils/createCtx";

import addMemberReducer, {
	type AddMemberFormState,
	changeGithub,
	changeLinkedin,
	changeRole,
	initialState,
} from "./add-member-form-reducer";

import type { AnyAction } from "@reduxjs/toolkit";
import type { ChildrenProps } from "@packages/utils/react";
import type { Role } from "@packages/entities/members";

export function AddMemberFormProvider({ children }: ChildrenProps) {
	const [state, dispatch] = useReducer(addMemberReducer, initialState);

	const actions = createActions(dispatch);
	const view = createView(state);

	return (
		<AddMemberFormViewProvider value={view}>
			<AddMemberFormActionsProvider value={actions}>{children}</AddMemberFormActionsProvider>
		</AddMemberFormViewProvider>
	);
}

export const [useAddMemberFormView, AddMemberFormViewProvider] =
	createCtx<ReturnType<typeof createView>>("add-member-form-view");
export const [useAddMemberFormActions, AddMemberFormActionsProvider] =
	createCtx<ReturnType<typeof createActions>>("add-member-form-actions");

const createActions = (dispatch: Dispatch<AnyAction>) => ({
	changeGithub: (value: string) => dispatch(changeGithub(value)),
	changeLinkedin: (value: string) => dispatch(changeLinkedin(value)),
	changeRole: (value: Role) => dispatch(changeRole(value)),
});

const createView = ({ github, linkedin, role }: AddMemberFormState) => {
	return {
		github,
		linkedin,
		role: {
			selectedValue: role,
			options: roleOptions,
		},
	};
};

interface Option<T = string> {
	label: string;
	value: T;
}

const roleOptions: Option<Role>[] = [
	{ value: "engineer", label: "role.engineer" },
	{ value: "mentor", label: "role.mentor" },
	{ value: "mentored", label: "role.mentored" },
];
