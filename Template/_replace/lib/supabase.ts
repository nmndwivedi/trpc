import {
  createClient,
  PostgrestError,
} from "@supabase/supabase-js";
import { TRPCError } from "@trpc/server";
import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  JWT_SECRET
} from "~/lib/env";
import { Database } from "~/schema";
import { validateAndExtractJWT } from "~/lib/jwt";

export const supamaster = createClient<Database>(
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_KEY || NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getUserFromToken(tokens: string) {
  let cookie: string | null | undefined = JSON.parse(tokens);
  let access = cookie?.[0];

  // const { data } = await supamaster.auth.getUser(access);
  const info = access ? await validateAndExtractJWT(access, JWT_SECRET) : null;

  const user = info ? convertJWTInfoToUser(info) : null;

  return user;
}

const convertJWTInfoToUser = (json: any): User => {
  const userIdentity: UserIdentity = {
    id: json.sub,
    user_id: json.sub,
    identity_data: {},
    provider: json.app_metadata.provider,
    created_at: json.amr?.[0]?.timestamp || "", // Assuming it's an empty string as there's no field in your JSON object.
    last_sign_in_at: "", // Assuming it's an empty string as there's no field in your JSON object.
  };

  const userAppMetadata: UserAppMetadata = { ...json.app_metadata };
  const userMetadata: UserMetadata = { ...json.user_metadata };

  const user: User = {
    id: json.sub,
    app_metadata: userAppMetadata,
    user_metadata: userMetadata,
    aud: json.aud,
    email: json.email,
    phone: json.phone,
    created_at: json.amr?.[0]?.timestamp || "", // Assuming it's an empty string as there's no field in your JSON object.
    role: json.role,
    identities: [userIdentity], // Assuming the user identity is a single element array.
    factors: [], // Assuming no factors present as it's not included in your JSON object.
  };

  return user;
};

export function throwTRPCError({
  error,
  code,
  message,
}: {
  error?: PostgrestError;
  code?:
    | "PARSE_ERROR"
    | "BAD_REQUEST"
    | "INTERNAL_SERVER_ERROR"
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "METHOD_NOT_SUPPORTED"
    | "TIMEOUT"
    | "CONFLICT"
    | "PRECONDITION_FAILED"
    | "PAYLOAD_TOO_LARGE"
    | "TOO_MANY_REQUESTS"
    | "CLIENT_CLOSED_REQUEST";
  message?: string;
}) {
  throw new TRPCError({
    code: code ?? "INTERNAL_SERVER_ERROR",
    message: message ?? error?.message,
    // optional: pass the original error to retain stack trace
    cause: error?.details,
  });
}

// type Supa<T> =
//   | { data: null; count: null; status: number; statusText: string }
//   | { data: T[]; count: number | null; status: number; statusText: string };

// export const handleSupabaseArrayTRPCError = <T>({
//   error,
//   ...rest
// }: PostgrestResponse<T>): Supa<T> => {
//   if (error) {
//     throw new TRPCError({
//       code: "INTERNAL_SERVER_ERROR",
//       message: error?.message,
//       // optional: pass the original error to retain stack trace
//       cause: error?.details,
//     });
//   }

//   return rest;
// };

// type SupaSingle<T> =
//   | { data: null; count: null; status: number; statusText: string }
//   | {
//       data: T | null;
//       count: number | null;
//       status: number;
//       statusText: string;
//     };

// export const handleSupabaseMaybeSingleTRPCError = <T>({
//   error,
//   ...rest
// }: PostgrestMaybeSingleResponse<T>): SupaSingle<T> => {
//   if (error) {
//     throw new TRPCError({
//       code: "INTERNAL_SERVER_ERROR",
//       message: error?.message,
//       // optional: pass the original error to retain stack trace
//       cause: error?.details,
//     });
//   }

//   return rest;
// };
