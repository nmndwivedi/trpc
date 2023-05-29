export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function truncate(str: string, charCount: number) {
  let trailing = str.length <= charCount ? "" : "...";
  let retStr = str.length <= charCount ? str : str.slice(0, charCount);
  while (retStr[retStr.length - 1] === " ") retStr = retStr.slice(0, -1);

  return retStr + trailing;
}

export function nFormatter(num?: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

const colors = [
  "bg-blue-600",
  "bg-pink-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-lime-700",
  "bg-rose-500",
  "bg-sky-600",
  "bg-teal-600",
  "bg-cyan-600",
  "bg-indigo-500",
  "bg-fuchsia-400",
];

export function colorGen(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length] as string;
}

export function slugify(inputString: string) {
  return inputString
    .replace(/[^\w\s]/gi, "")
    .split(" ")
    .filter((word) => word)
    .join(" ")
    .toLowerCase()
    .replaceAll(" ", "-");
}

export function snakify(inputString: string) {
  return inputString
    .replace(/[^\w\s]/gi, "")
    .split(" ")
    .filter((word) => word)
    .join(" ")
    .toLowerCase()
    .replaceAll(" ", "_");
}

export function camelify(inputString: string) {
  return inputString
    .replace(/[^\w\s]/gi, " ")
    .split(" ")
    .reduce(
      (camelCased, word, index) =>
        camelCased +
        (index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()),
      ""
    );
}

export function dateDiff(first: number) {
  return Math.round((Date.now() - first) / (1000 * 60 * 60 * 24));
}

export function roundToNearest10(number: number) {
  return Math.round(number / 10) * 10;
}

export function compactNumber(number: number) {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(number)
    .toLocaleLowerCase();
}

export function dollariseNumber(number: number) {
  return "$" + number.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getDateTimeLocal = (timestamp?: Date): string => {
  const d = timestamp ? new Date(timestamp) : new Date();
  if (d.toString() === "Invalid Date") return "";
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .split(":")
    .slice(0, 2)
    .join(":");
};

export const formatDate = (dateString: string) => {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};
