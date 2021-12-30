import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { FormEvent } from 'react';

function AddMemberForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor="gh-username">Github username</FormLabel>
        <Input id="gh-username" type="text" />
        <FormHelperText>We will share your github username.</FormHelperText>
      </FormControl>

      <Select placeholder="Select option">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </form>
  );
}

export default AddMemberForm;
