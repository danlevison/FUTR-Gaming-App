"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useFetchCollectionQuery } from "@/redux/features/collectionsApiSlice"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import GamesList from "@/components/GamesList"
import PageHeading from "@/components/PageHeading"
import Spinner from "@/components/loading/Spinner"
import ErrorDisplay from "@/components/ErrorDisplay"
import useUser from "@/hooks/useUser"
import FollowBtn from "./components/FollowBtn"

function Collection() {
  const { collection_id } = useParams()
  const user = useUser()
  const {
    data: collectionData,
    isLoading,
    isFetching,
    isError,
  } = useFetchCollectionQuery(collection_id as string)

  // prevent private collections be shown to users that are not the collection owner
  if (!collectionData?.isPublic && collectionData?.ownerId !== user?.uid) {
    return (
      <main className="flex flex-col justify-center items-center min-h-screen w-full text-center px-5">
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold">404</h1>
        <p className="text-2xl sm:text:3xl md:text-4xl">
          We couldn&apos;t find that page.
        </p>
        <Link
          href={"/"}
          className="bg-white text-foreground p-4 rounded-md mt-5 text-lg hover:opacity-70 duration-300"
        >
          Return to Home
        </Link>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen w-full mx-auto px-5 pt-20 pb-10 md:pt-2">
      {isLoading || isFetching ? (
        <div className="flex justify-center items-center py-20">
          <Spinner />
        </div>
      ) : (
        <>
          {collectionData?.collectionBg && (
            <>
              <Image
                alt=""
                src={collectionData?.collectionBg}
                quality={100}
                fill
                sizes="100vw"
                priority
                style={{
                  objectFit: "cover",
                }}
                className="z-0"
              />
              <div className="absolute inset-0 bg-black/80" />
            </>
          )}
          <div className="relative z-10">
            <div className="flex justify-between">
              <PageHeading headingText={collectionData?.title} />
              {collectionData?.ownerId && (
                <FollowBtn
                  collectionParamId={collection_id}
                  ownerId={collectionData?.ownerId}
                />
              )}
            </div>
            <div className="mt-2">
              <p>
                Collection by:{" "}
                <Link
                  href={`/user/${collectionData?.ownerId}`}
                  className="underline"
                >
                  {collectionData?.owner}
                </Link>
              </p>
              {collectionData?.isPublic ? (
                <p className="flex items-center gap-2">
                  Public Collection <MdVisibility />
                </p>
              ) : (
                <p className="flex items-center gap-2">
                  Private Collection <MdVisibilityOff />
                </p>
              )}
            </div>
            <div className="flex flex-col items-center mt-5">
              {collectionData && collectionData.games?.length > 0 && (
                <GamesList
                  games={collectionData.games}
                  ownerId={collectionData.ownerId}
                />
              )}

              {isError && (
                <ErrorDisplay errorMessage="Unable to load collection." />
              )}
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default Collection
