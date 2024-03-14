import Image from "next/image"
import { useRouter } from "next/navigation"
import ErrorDisplay from "../ErrorDisplay"
import { useFetchUsersQuery } from "@/redux/features/usersApiSlice"

type SearchedUsersListProps = {
  searchInput: string
  handleLinkClick: () => void
}

export default function SearchedUsersList({
  searchInput,
  handleLinkClick,
}: SearchedUsersListProps) {
  const { data: userData, isError: isUserDataError } = useFetchUsersQuery({})

  const filteredUsers = userData?.filter((user) =>
    user?.displayName.toLowerCase().includes(searchInput.toLowerCase())
  )
  const router = useRouter()

  const handleRouter = (id: string) => {
    router.push(`/user/${id}`)
    handleLinkClick()
  }

  return (
    <div className="mt-5 border-b-[0.5px] pb-5">
      <h3 className="font-bold text-2xl">Users</h3>
      {isUserDataError && <ErrorDisplay errorMessage="Unable to load users." />}
      {userData && filteredUsers?.length === 0 ? (
        <p>No users found!</p>
      ) : (
        <ul className="flex flex-col gap-3 mt-4">
          {userData &&
            filteredUsers?.map((user) => (
              <li key={user?.uid} className="flex items-center gap-2">
                {user?.avatar && (
                  <Image
                    src={user?.avatar}
                    alt={user?.displayName}
                    width={50}
                    height={50}
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                  />
                )}
                <button
                  onClick={() => handleRouter(user?.uid!)}
                  className="font-bold md:text-lg hover:underline"
                >
                  {user?.displayName}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
