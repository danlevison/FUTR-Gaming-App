import Image from "next/image"
import Link from "next/link"
import { useFetchFollowingQuery } from "@/redux/features/friendsApiSlice"
import type { UserT } from "@/types"

type FollowingProps = {
	userParamId: string | string[]
	userData: UserT[] | undefined
}

export default function Following({ userParamId, userData }: FollowingProps) {
	const { data: followingData } = useFetchFollowingQuery(userParamId as string)

	const followedUsers = () => {
		const users = followingData?.map((followedUser) => {
			return userData?.find((user) => user?.uid === followedUser.userId)
		})

		return users?.filter((user) => user !== undefined)
	}

	return (
		<section className="w-full">
			<h2 className="text-xl font-bold uppercase pb-2">
				Following <span>({followedUsers()?.length})</span>
			</h2>
			{followedUsers() && followedUsers()?.length === 0 ? (
				<p className="text-2xl">😴</p>
			) : (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] items-center gap-6">
					{followedUsers()?.map((user) => (
						<Link
							key={user?.uid}
							href={`/user/${user?.uid}`}
							className="block bg-foreground p-4 w-full max-w-[200px] rounded-md "
						>
							<div className="flex items-center gap-2">
								{user?.avatar && (
									<Image
										src={user?.avatar}
										alt={user?.displayName}
										width={40}
										height={40}
										className="rounded-full"
									/>
								)}
								<p className="font-bold">{user?.displayName}</p>
							</div>
						</Link>
					))}
				</div>
			)}
		</section>
	)
}
