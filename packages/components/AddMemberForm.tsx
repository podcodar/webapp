import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent } from 'react';

import {
  useAddMemberFormView,
  useAddMemberFormActions,
} from '@packages/features/add-member-form-context';

export default function AddMemberForm() {
  const view = useAddMemberFormView();
  const { changeGithub } = useAddMemberFormActions();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleGithubChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeGithub(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>https://api.github.com/users/{view.github}</p>

      <FormControl>
        <FormLabel htmlFor="gh-username">Github username</FormLabel>
        <Input
          id="gh-username"
          type="text"
          value={view.github}
          onChange={handleGithubChange}
        />
        <FormHelperText>We will share your github username.</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="role">Select a role</FormLabel>
        <Select id="role" placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </FormControl>
    </form>
  );
}
