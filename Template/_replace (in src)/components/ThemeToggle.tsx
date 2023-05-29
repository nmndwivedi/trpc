import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { classNames } from "@/lib/common";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [enabled, setEnabled] = useState(
    (theme === "system" ? systemTheme : theme) === "dark"
  );
  const [server, setServer] = useState(true);

  useEffect(() => {
    setTheme(enabled ? "dark" : "light");
    setServer(false);
  }, [enabled]);

  if (server) return <div>Server</div>;

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        enabled ? "bg-gray-600" : "bg-gray-300",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0"
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out dark:bg-gray-900"
        )}
      >
        <p
          className={`${
            !enabled
              ? "-translate-y-[2px]"
              : "-translate-x-[2px] translate-y-[1px] -rotate-45"
          } transform transition-transform duration-300`}
        >
          {!enabled ? "☀️" : "🌜"}
        </p>
      </span>
    </Switch>
  );
}
