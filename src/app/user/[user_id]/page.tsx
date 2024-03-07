"use client"

import { useState } from "react"
import Image from "next/image"
import CollectionsSlider from "./components/CollectionsSlider"
import { useParams } from "next/navigation"
import { useFetchUsersQuery } from "@/redux/features/usersApiSlice"
import useUser from "@/hooks/useUser"
import FollowBtn from "./components/FollowBtn"
import Following from "./components/Following"
import Followers from "./components/Followers"
import WishlistLink from "./components/WishlistLink"
import PageHeading from "@/components/PageHeading"
import MessageBtn from "./components/MessageBtn"
import ErrorDisplay from "@/components/ErrorDisplay"
import FollowingCollectionsSlider from "./components/FollowingCollectionsSlider"
import { Button } from "@/components/ui/button"

export default function User() {
  const { user_id } = useParams()
  const user = useUser()
  const { data: userData, isError } = useFetchUsersQuery({})
  const [isMyCollections, setIsMyCollections] = useState(true)

  const userDetails = () => {
    return userData?.find((fetchedUser) => fetchedUser?.uid === user_id)
  }

  const { displayName, avatar } = userDetails() || {}

  return (
    <main className="w-full px-5 pt-20 pb-10 md:pt-2">
      {isError && <ErrorDisplay errorMessage="Unable to display user info." />}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col items-center xs:flex-row gap-2 mb-3">
          <PageHeading headingText={displayName} />

          {avatar && (
            <Image
              src={avatar}
              alt={displayName || "User avatar"}
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
        </div>
        <div className="flex items-center gap-4">
          <FollowBtn userParamId={user_id} />
          <MessageBtn
            userParamId={user_id}
            displayName={displayName}
            avatar={avatar}
          />
        </div>
      </div>
      <WishlistLink userParamId={user_id} />
      <div className="flex gap-5 mt-4">
        <Button
          onClick={() => setIsMyCollections(true)}
          variant={"link"}
          className={`text-gray-500 p-0 ${
            isMyCollections ? "underline text-white" : ""
          }`}
        >
          {user_id === user?.uid ? "Mine" : "Created"}
        </Button>
        <Button
          onClick={() => setIsMyCollections(false)}
          variant={"link"}
          className={`text-gray-500 p-0 ${
            !isMyCollections ? "underline text-white" : ""
          }`}
        >
          Following
        </Button>
      </div>
      {isMyCollections ? <CollectionsSlider /> : <FollowingCollectionsSlider />}
      <Followers userParamId={user_id} userData={userData} />
      <Following userParamId={user_id} userData={userData} />
    </main>
  )
}
