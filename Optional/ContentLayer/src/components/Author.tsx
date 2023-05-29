import Link from "next/link";
import BlurImage from "./BlurImage";

export default function Author({
  username,
  data,
  imageOnly,
}: {
  username: string;
  data: {
    profile_image_url_https: string;
    name: string;
    screen_name: string;
    errors: any; // Optional field, present only if there are errors in the API response
  } | null;
  imageOnly?: boolean;
}) {
  if (!data)
    return (
      <Link
        href={`https://twitter.com/${username}`}
        className="group flex items-center space-x-3"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="h-12 w-12 bg-gradient-to-tr from-orange-500 to-cyan-500 rounded-full bg-gray-500 transition-all group-hover:brightness-90" />
        <div className="flex flex-col">
          <p className="font-bold txt opacity-70">@{username}</p>
        </div>
      </Link>
    );

  return imageOnly ? (
    <BlurImage
      src={data.profile_image_url_https.replace("_normal", "")}
      alt={data.name}
      width={36}
      height={36}
      className="rounded-full transition-all group-hover:brightness-90"
    />
  ) : (
    <Link
      href={`https://twitter.com/${data.screen_name}`}
      className="group flex items-center space-x-3"
      target="_blank"
      rel="noopener noreferrer"
    >
      <BlurImage
        src={data.profile_image_url_https.replace("_normal", "")}
        alt={data.name}
        width={48}
        height={48}
        className="rounded-full transition-all group-hover:brightness-90"
      />
      <div className="flex flex-col">
        <p className="font-bold txt opacity-70">{data.name}</p>
        <p className="text-sm txt opacity-40">@{data.screen_name}</p>
      </div>
    </Link>
  );
}
