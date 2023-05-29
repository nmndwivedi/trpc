import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

export default function BlurImage(props: ImageProps) {
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState(props.src);
  useEffect(() => setSrc(props.src), [props.src]); // update the `src` value when the `prop.src` value changes

  return (
    <Image
      {...props}
      src={
        loading ? `/shimmer.gif` : src
      }
      alt={props.alt}
      className={props.className}
      onLoadingComplete={async () => {
        setLoading(false);
      }}
      onError={() => {
        setSrc(`/error.png`); // if the image fails to load, use the default avatar
      }}
    />
  );
}
