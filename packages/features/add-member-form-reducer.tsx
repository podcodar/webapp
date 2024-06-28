import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Role } from '@packages/entities/members';

export interface AddMemberFormState {
  github: string;
  linkedin: string;
  role: Role;
}

export const initialState: AddMemberFormState = {
  github: '',
  linkedin: '',
  role: 'mentored',
};

const addMemberSlice = createSlice({
  name: 'addMember',
  initialState,
  reducers: {
    changeGithub(state, { payload }: PayloadAction<string>) {
      state.github = payload;
    },
    changeLinkedin(state, { payload }: PayloadAction<string>) {
      state.linkedin = payload;
    },
    changeRole(state, { payload }: PayloadAction<Role>) {
      state.role = payload;
    },
  },
});

export const { changeGithub, changeLinkedin, changeRole } =
  addMemberSlice.actions;
export default addMemberSlice.reducer;
