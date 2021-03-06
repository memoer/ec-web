import { UserProvider } from "@/__generated__/globalTypes";
import { useCallback } from "react";
import { useAppCtx, OnLogInOauthClick } from "~/lib";

interface UseFaceBookLogin {
  setStep?: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  login?: (opts: OnLogInOauthClick) => void;
}

const useFacebookLogIn = ({ setStep, login }: UseFaceBookLogin = {}) => {
  const [as, setAs] = useAppCtx();
  const onFacebookClick = useCallback(() => {
    const meCallback = (response) => {
      const { id } = response as { id: string; name: string };
      setAs((s) => ({
        ...s,
        oauthProfile: { oauthId: id, provider: UserProvider.FACEBOOK },
      }));
      if (setStep) setStep(2);
      if (login) login({ oauthId: id, provider: UserProvider.FACEBOOK });
    };
    as.fbAuth.login(
      (res) => res.authResponse && as.fbAuth.api("/me", meCallback),
      {
        scope: "public_profile,email",
      },
    );
  }, [as.fbAuth]);
  return { onFacebookClick, fbBtnDisabled: !as.fbAuth };
};

export default useFacebookLogIn;
