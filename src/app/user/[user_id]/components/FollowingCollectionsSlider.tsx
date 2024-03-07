"use client"

import {
  useFetchFollowingCollectionsQuery,
  useFetchFollowingCollectionIdsQuery,
} from "@/redux/features/collectionsApiSlice"
import { useParams } from "next/navigation"
import CollectionsCarousel from "./CollectionsCarousel"
import useUser from "@/hooks/useUser"

export default function CollectionsSlider() {
  const { user_id } = useParams()
  const user = useUser()
  const { data: collectionsIds } = useFetchFollowingCollectionIdsQuery(
    user_id as string
  )

  const collectionId = collectionsIds?.map(
    (collection) => collection.collectionId
  )

  const {
    data: collectionsData,
    isLoading,
    isFetching,
    isError,
  } = useFetchFollowingCollectionsQuery(collectionId as string[])

  return (
    <section className="w-full">
      <h2 className="text-xl font-bold uppercase pb-2">
        Following Collections <span>({collectionsIds?.length})</span>
      </h2>
      {collectionsIds?.length === 0 ? (
        <p className="mt-20 text-xl text-center">
          {user?.uid === user_id
            ? "You are not following any collections yet."
            : "No collections yet."}
        </p>
      ) : (
        <CollectionsCarousel
          collectionsData={collectionsData || []}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
        />
      )}
    </section>
  )
}
