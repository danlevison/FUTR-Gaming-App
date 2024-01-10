import { Button } from "@/components/ui/button"
import {
	useFollowUserMutation,
	useFetchFollowingQuery,
	useUnfollowUserMutation
} from "@/redux/features/friendsApiSlice"
import { FcCheckmark } from "react-icons/fc"
import type { UserT } from "@/types"

type FollowBtnProps = {
	user: UserT
	userParamId: string | string[]
}

export default function FollowBtn({ user, userParamId }: FollowBtnProps) {
	const [followUser] = useFollowUserMutation()
	const [unfollowUser] = useUnfollowUserMutation()
	const { data: followingData } = useFetchFollowingQuery(user?.uid as string)

	const handleFollowUser = () => {
		followUser({
			userId: user?.uid as string,
			followedUserId: userParamId as string
		})
	}

	const handleUnfollowUser = () => {
		unfollowUser({
			userId: user?.uid as string,
			followedUserId: userParamId as string
		})
	}

	const isFollowing = followingData?.find((user) => user.userId === userParamId)

	const determineFollowButton = () => {
		if (user?.uid !== userParamId && !isFollowing) {
			return (
				<Button
					onClick={handleFollowUser}
					variant={"secondary"}
				>
					Follow
				</Button>
			)
		} else if (user?.uid !== userParamId && isFollowing) {
			return (
				<Button
					onClick={handleUnfollowUser}
					variant={"outline"}
				>
					Following
					<FcCheckmark
						size={18}
						className="ml-1"
					/>
				</Button>
			)
		} else {
			return
		}
	}

	return <>{determineFollowButton()}</>
}
