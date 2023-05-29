import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { Auth as SBAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useTheme } from "next-themes";

const Auth = () => {
  const supabase = useSupabaseClient();
  const { theme, systemTheme } = useTheme();
  const [isDark] = useState(
    (theme === "system" ? systemTheme : theme) === "dark"
  );

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <div className="txt mt-8 w-full max-w-sm px-8">
        <SBAuth
          supabaseClient={supabase}
          socialLayout="horizontal"
          theme={isDark ? "dark" : "default"}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "darkorange",
                  brandAccent: "orange",
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
