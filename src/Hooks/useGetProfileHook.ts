import { useDispatch } from "react-redux";
import { useLazyGetProfileQuery } from "authContainer/duck/authAPI";
import { loggedInUserActions } from "../authContainer/duck/loogedInUserSlice";
import { removeAppTokens, showNotification } from "Utils/commonFunction";
import { UserProfileApiResponse } from "../authContainer/duck/auth.interface";
import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useGetProfileHook = () => {
  const dispatch = useDispatch();
  const [getUserProfile, result] = useLazyGetProfileQuery();

  const fetchUserProfile = useCallback(() => {
    if (result.isUninitialized) {
      getUserProfile()
        .unwrap()
        .then((response: UserProfileApiResponse) => {
          dispatch(loggedInUserActions.setLoggedInUserData(response));
        })
        .catch((error) => {
          showNotification("error", error);
          removeAppTokens();
        });
    }
  }, [dispatch, getUserProfile, result.isUninitialized]);

  return { fetchUserProfile, result };
};

export const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};
