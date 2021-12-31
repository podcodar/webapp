import { useRouter } from 'next/router';

export default function useEditingMode() {
  const { query } = useRouter();
  const isEditing = Object.keys(query).includes('edit');

  return { isEditing };
}
