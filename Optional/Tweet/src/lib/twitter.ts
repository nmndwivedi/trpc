interface MediaInfo {
  video_info: VideoInfo;
  //... other fields
}

interface VideoInfo {
  variants: Variant[];
  //... other fields
}

interface Variant {
  content_type: string;
  bitrate: number;
  //... other fields
}

interface TwitterData {
  extended_entities: {
    media: MediaInfo[];
  };
  //... other fields
}

interface TwitterResponse {
  data: TweetData;
  includes: {
    users: User[];
    tweets?: TweetData[];
    media?: Media[];
    polls?: Poll[];
  };
}

interface TweetData {
  id: string;
  author_id: string;
  text: string;
  attachments?: {
    media_keys: string[];
  };
  entities?: {
    urls: URLData[];
  };
  referenced_tweets?: { id: string; type: string }[];
}

interface User {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
  verified: boolean;
  protected: boolean;
  url: string;
}

interface Media {
  media_key: string;
  type: string;
  duration_ms: number;
  height: number;
  url: string;
  width: number;
  public_metrics: any;
}

interface Poll {
  duration_minutes: number;
  end_datetime: string;
  id: string;
  options: any;
  voting_status: string;
}

interface URLData {
  url: string;
  expanded_url: string;
  display_url: string;
}

interface VideoData {
  bitrate: number;
  content_type: string;
}

const getTwitterMedia = async (id: string): Promise<Variant | undefined> => {
  try {
    const response = await fetch(
      `https://api.twitter.com/1.1/statuses/show.json?id=${id}&tweet_mode=extended`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_AUTH_TOKEN}`,
        },
      }
    );
    const data = (await response.json()) as TwitterData;
    const videoData = data.extended_entities.media[0]?.video_info;

    // filter for only MP4 videos
    const mp4VideosOnly = videoData?.variants?.filter(
      (variant) => variant.content_type === "video/mp4"
    );

    // get the video with the best bitrate
    const bestVideoBitrate = mp4VideosOnly?.reduce(
      (prev: Variant, current: Variant) => {
        return prev.bitrate > current.bitrate ? prev : current;
      }
    );

    return bestVideoBitrate;
  } catch (error) {
    console.log(id, error);
    return undefined;
  }
};

export const getTweet = async (id: string): Promise<any> => {
  try {
    const response = await fetch(
      `https://api.twitter.com/2/tweets/${id}?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_AUTH_TOKEN}`,
        },
        next: {
          revalidate: 3600, // revalidate every 1 hour
        },
      }
    );
    const tweet = (await response.json()) as TwitterResponse;

    if (!tweet.data)
      throw new Error(`Failed to get tweet data for tweet ID: ${id}`);

    const getAuthorInfo = (author_id: string): User | undefined =>
      tweet.includes.users.find((user) => user.id === author_id);

    const getReferencedTweets = (
      mainTweet: TweetData
    ): (TweetData & { type: string })[] | [] =>
      mainTweet?.referenced_tweets?.map((referencedTweet) => {
        const fullReferencedTweet = tweet.includes.tweets?.find(
          (tweet) => tweet.id === referencedTweet.id
        );
        if (!fullReferencedTweet)
          throw new Error(
            `Failed to find full tweet from referenced tweet ID: ${referencedTweet.id}`
          );

        return {
          type: referencedTweet.type,
          ...fullReferencedTweet,
        };
      }) || [];

    if (tweet.data) tweet.data.text = getExternalUrls(tweet.data); // removing/replacing t.co links for main tweet
    tweet?.includes?.tweets?.map((twt: TweetData) => {
      // removing/replacing t.co links for referenced tweets
      twt.text = getExternalUrls(twt);
    });

    const media = tweet.data?.attachments?.media_keys?.map((key: string) =>
      tweet.includes.media?.find((media: Media) => media.media_key === key)
    );

    const referenced_tweets = getReferencedTweets(tweet.data);

    return {
      ...tweet.data,
      author: getAuthorInfo(tweet.data?.author_id),
      media: media || [],
      polls: tweet?.includes?.polls || [],
      referenced_tweets: referenced_tweets,
      url_meta:
        media || referenced_tweets.length > 0 || !tweet.data?.entities?.urls
          ? null
          : tweet.data?.entities?.urls.at(-1), // take the last unfurled URL in the tweet (similar to Twitter's behavior)
      video:
        media &&
        media[0] &&
        (media[0].type === "video" || media[0].type === "animated_gif")
          ? await getTwitterMedia(id)
          : null,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

function getExternalUrls(tweet: TweetData) {
  const externalURLs = tweet?.entities?.urls;

  let mappings: {
    [I in string]: string;
  } = {};

  if (externalURLs)
    externalURLs.map((url) => {
      mappings[url.url] =
        !url.display_url.startsWith("pic.twitter.com") &&
        !url.display_url.startsWith("twitter.com")
          ? url.expanded_url
          : "";
    });

  let processedText = tweet?.text;
  Object.entries(mappings).map(([key, value]) => {
    processedText = processedText.replace(key, value);
  });

  return processedText;
}

const queryParams = new URLSearchParams({
  expansions:
    "author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id,attachments.poll_ids",
  "tweet.fields":
    "attachments,author_id,public_metrics,created_at,id,in_reply_to_user_id,referenced_tweets,text,entities",
  "user.fields": "id,name,profile_image_url,protected,url,username,verified",
  "media.fields":
    "duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics",
  "poll.fields": "duration_minutes,end_datetime,id,options,voting_status",
}).toString();
