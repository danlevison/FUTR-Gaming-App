"use client"

import { useFetchCollectionsQuery } from "@/redux/features/collectionsApiSlice"
import Spinner from "@/components/loading/Spinner"
import CollectionCard from "@/components/CollectionCard"
//types
import { UserT } from "@/types"

export default function CollectionGrid({ user }: { user: UserT }) {
	const {
		data: collectionsData,
		isLoading,
		isFetching,
		isError
	} = useFetchCollectionsQuery({ userId: user?.uid as string })

	return (
		<div>
			{isLoading || isFetching ? (
				<div className="flex justify-center items-center">
					<Spinner />
				</div>
			) : (
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
					{collectionsData?.map(
						({ id, title, description, isPublic, games }) => (
							<li key={id}>
								<CollectionCard
									id={id}
									title={title}
									description={description}
									isPublic={isPublic}
									games={games}
									user={user!}
								/>
							</li>
						)
					)}
					{/* TODO: Check styling */}
					{isError && <p>Unable to load collections.</p>}
				</ul>
			)}
		</div>
	)
}
