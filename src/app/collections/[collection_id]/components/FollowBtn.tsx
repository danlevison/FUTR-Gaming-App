import { FcCheckmark } from "react-icons/fc"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import useUser from "@/hooks/useUser"
import {
  useFetchFollowingCollectionIdsQuery,
  useFollowUserCollectionMutation,
  useUnfollowUserCollectionMutation,
} from "@/redux/features/collectionsApiSlice"

type FollowBtnProps = {
  collectionParamId: string | string[]
  ownerId: string
}

export default function FollowBtn({
  collectionParamId,
  ownerId,
}: FollowBtnProps) {
  const user = useUser()
  const [followUserCollection] = useFollowUserCollectionMutation()
  const [unfollowUserCollection] = useUnfollowUserCollectionMutation()
  const { toast } = useToast()
  const Icons = {
    spinner: Loader2,
  }
  const { data: followingCollectionData, isFetching } =
    useFetchFollowingCollectionIdsQuery(user?.uid as string)

  const isFollowing = followingCollectionData?.find(
    (collection) => collection.collectionId === collectionParamId
  )

  const handleFollowUserCollection = async () => {
    try {
      await followUserCollection({
        userId: user?.uid as string,
        collectionId: collectionParamId as string,
        ownerId: ownerId,
      })
    } catch (error) {
      console.error("Error following user", error)
      toast({
        variant: "destructive",
        description: "Failed to follow users collection, please try again.",
      })
    }
  }

  const handleUnfollowUserCollection = async () => {
    try {
      await unfollowUserCollection({
        userId: user?.uid as string,
        ownerId: ownerId,
        collectionId: collectionParamId as string,
      })
    } catch (error) {
      console.error("Error unfollowing user", error)
      toast({
        variant: "destructive",
        description: "Failed to unfollow users collection, please try again.",
      })
    }
  }

  const determineFollowButton = () => {
    if (user?.uid !== ownerId && !isFollowing) {
      return (
        <Button
          onClick={handleFollowUserCollection}
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
    } else if (user?.uid !== ownerId && isFollowing) {
      return (
        <Button
          onClick={handleUnfollowUserCollection}
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
              <FcCheckmark size={18} className="ml-1" />
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
