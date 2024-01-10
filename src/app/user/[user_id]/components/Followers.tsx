import Image from "next/image"
import Link from "next/link"
import { useFetchFollowersQuery } from "@/redux/features/friendsApiSlice"
import type { UserT } from "@/types"

type FollowersProps = {
	userParamId: string | string[]
	userData: UserT[] | undefined
}

export default function Followers({ userParamId, userData }: FollowersProps) {
	const { data: followersData } = useFetchFollowersQuery(userParamId as string)

	const followers = () => {
		const users = followersData?.map((follower) => {
			return userData?.find((user) => user?.uid === follower.userId)
		})

		return users?.filter((user) => user !== undefined)
	}

	return (
		<section>
			<h2 className="text-xl font-bold uppercase pb-2">
				Followers <span>({followers()?.length})</span>
			</h2>
			{followers() && followers()?.length === 0 ? (
				<p className="text-2xl">😴</p>
			) : (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] items-center gap-6">
					{followers()?.map((user) => (
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
