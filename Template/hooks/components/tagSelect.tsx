import { Dispatch, SetStateAction, useState } from "react";
import Select from "react-tailwindcss-select";
import { Option } from "react-tailwindcss-select/dist/components/type";

export default function TagSelect({
  tagSelection,
  setTagSelection,
  tags,
}: {
  tagSelection: string[];
  setTagSelection: Dispatch<SetStateAction<string[]>>;
  tags: string[];
}) {
  const handleChange = (value?: Option | Option[] | null) => {
    setTagSelection(((value as Option[]) || []).map((t) => t.label));
  };

  return (
    <>
      <Select
        isMultiple={true}
        primaryColor={"emerald"}
        value={tagSelection.map((t) => ({ value: t, label: t }))}
        onChange={handleChange}
        options={tags.map((t) => ({ value: t, label: t }))}
        placeholder="Choose upto 5 relevant tags"
        isSearchable={true}
      />
    </>
  );
}

export const useTagSelect = ({ tags }: { tags: string[] }) => {
  const [tagSelection, setTagSelection] = useState<string[]>([]);

  return {
    TagSelect,
    tagSelection,
    setTagSelection,
    tags,
  };
};
