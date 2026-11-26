import { useQuery } from "@tanstack/react-query";
import {
	getClientAvatarPhoto,
	getClientVerification,
} from "../services/client-profile.service";

const PROFILE_QUERY_STALE_TIME = 60_000;

const photoReferenceKey = (value?: string | null): string =>
	value ? value.split(/[?#]/, 1)[0] : "none";

export const useClientProfilePhoto = (
	userId?: string,
	accountPhotoUrl?: string,
) => {
	const verification = useQuery({
		queryKey: ["client-verification", userId],
		queryFn: getClientVerification,
		enabled: Boolean(userId),
		staleTime: PROFILE_QUERY_STALE_TIME,
		retry: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});

	const photoSource = verification.data?.profile_photo_url
		? `verification:${photoReferenceKey(verification.data.profile_photo_url)}`
		: accountPhotoUrl
			? `account:${photoReferenceKey(accountPhotoUrl)}`
			: "none";
	const photo = useQuery({
		queryKey: ["client-profile-photo", userId, photoSource],
		queryFn: () =>
			getClientAvatarPhoto(
				verification.data?.profile_photo_url ?? null,
				accountPhotoUrl,
			),
		enabled: Boolean(userId && verification.data),
		staleTime: PROFILE_QUERY_STALE_TIME,
		retry: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});

	return { verification, photo };
};
