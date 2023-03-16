import { Dispatch, SetStateAction, useState } from "react";
import Toggle from "../../components/sub/Toggle";

export default function LabelToggle({
  enabled,
  setEnabled,
  currentLabel,
}: {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  currentLabel: string;
}) {
  return (
    <div className="flex items-center gap-x-1">
      <p className="text-xs text-white opacity-40">{currentLabel}</p>
      <Toggle enabled={enabled} setEnabled={setEnabled} />
    </div>
  );
}

export const useLabelToggle = ({
  leftOption,
  rightOption,
  defaultOption,
}: {
  leftOption: string;
  rightOption: string;
  defaultOption: "left" | "right";
}) => {
  const [enabled, setEnabled] = useState<boolean>(defaultOption === "right");

  return {
    LabelToggle,
    enabled,
    setEnabled,
    currentLabel: enabled ? rightOption : leftOption,
  };
};
