import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";
import { Auth as SBAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Auth = () => {
  const supabase = useSupabaseClient();

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <div className="w-full max-w-sm px-8 pt-24">
        <SBAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "green",
                  brandAccent: "darkgreen",
                },
              },
            },
          }}
          magicLink={true}
        />
      </div>
    </div>
  );
};

export default Auth;
