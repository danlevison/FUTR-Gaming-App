import {
	useFollowUserMutation,
	useFetchFollowingQuery,
	useUnfollowUserMutation
} from "@/redux/features/friendsApiSlice"
import { FcCheckmark } from "react-icons/fc"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import useUser from "@/hooks/useUser"

type FollowBtnProps = {
	userParamId: string | string[]
}

export default function FollowBtn({ userParamId }: FollowBtnProps) {
	const user = useUser()
	const [followUser] = useFollowUserMutation()
	const [unfollowUser] = useUnfollowUserMutation()
	const { data: followingData, isFetching } = useFetchFollowingQuery(
		user?.uid as string
	)
	const { toast } = useToast()
	const Icons = {
		spinner: Loader2
	}

	const handleFollowUser = async () => {
		try {
			await followUser({
				userId: user?.uid as string,
				followedUserId: userParamId as string
			})
		} catch (error) {
			console.error("Error following user", error)
			toast({
				variant: "destructive",
				description: "Failed to follow user, please try again."
			})
		}
	}

	const handleUnfollowUser = async () => {
		try {
			await unfollowUser({
				userId: user?.uid as string,
				followedUserId: userParamId as string
			})
		} catch (error) {
			console.error("Error unfollowing user", error)
			toast({
				variant: "destructive",
				description: "Failed to unfollow user, please try again."
			})
		}
	}

	const isFollowing = followingData?.find((user) => user.userId === userParamId)

	const determineFollowButton = () => {
		if (user?.uid !== userParamId && !isFollowing) {
			return (
				<Button
					onClick={handleFollowUser}
					variant={"secondary"}
					className={`w-full xs:max-w-[140px] mx-auto xs:mx-0 ${
						isFetching ? "bg-gray-700 animate-pulse" : ""
					}`}
				>
					{isFetching ? (
						<Icons.spinner className="ml-2 w-4 h-4 animate-spin text-gray-400" />
					) : (
						<p>Follow</p>
					)}
				</Button>
			)
		} else if (user?.uid !== userParamId && isFollowing) {
			return (
				<Button
					onClick={handleUnfollowUser}
					variant={"outline"}
					className={`w-full xs:max-w-[140px] mx-auto xs:mx-0 ${
						isFetching ? "bg-gray-700 animate-pulse border-none" : ""
					}`}
				>
					{isFetching ? (
						<Icons.spinner className="ml-2 w-4 h-4 animate-spin text-gray-400" />
					) : (
						<>
							<p>Following</p>
							<FcCheckmark
								size={18}
								className="ml-1"
							/>
						</>
					)}
				</Button>
			)
		} else {
			return
		}
	}

	return <>{user && determineFollowButton()}</>
}
