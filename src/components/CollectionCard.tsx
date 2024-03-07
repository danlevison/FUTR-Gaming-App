import Link from "next/link"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import DeleteCollectionModal from "../app/collections/components/DeleteCollectionModal"
import EditCollection from "../app/collections/components/EditCollection"
import { usePathname } from "next/navigation"
import type { GameT } from "@/types"

type CollectionCardProps = {
  id: string
  title: string
  description: string
  isPublic: boolean
  followers: number
  games: GameT[]
  owner: string
  ownerId: string
}

export default function CollectionCard({
  id,
  title,
  description,
  isPublic,
  followers,
  games,
  owner,
  ownerId,
}: CollectionCardProps) {
  const pathname = usePathname()

  return (
    <Card className="relative bg-zinc-900/50 text-primaryText h-[420px]">
      {games.slice(0, 1).map((game) => (
        <Image
          key={game.id}
          src={game.background_image}
          alt={game.name}
          fill
          style={{ objectFit: "cover" }}
          className="absolute opacity-[0.20] w-full h-full rounded-lg z-0"
        />
      ))}
      <div className="relative z-10">
        <CardHeader>
          <div className="flex justify-between items-center gap-4">
            <CardTitle className="text-3xl">
              <Link href={`/collections/${id}`} className="underline">
                {title}
              </Link>
            </CardTitle>
            {!pathname.includes("user") && (
              <div className="flex items-center gap-4">
                <EditCollection
                  id={id}
                  title={title}
                  description={description}
                  isPublic={isPublic}
                />
                <DeleteCollectionModal id={id} />
              </div>
            )}
          </div>

          <CardDescription className="text-primaryText">
            Collection by:{" "}
            <Link href={`/user/${ownerId}`} className="hover:underline">
              {owner}
            </Link>
          </CardDescription>
          <CardDescription className="text-primaryText">
            {description}
          </CardDescription>
          {isPublic ? (
            <p className="flex items-center gap-2 font-bold">
              Public Collection <MdVisibility />
            </p>
          ) : (
            <p className="flex items-center gap-2 font-bold">
              Private Collection <MdVisibilityOff />
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-5 w-full py-4">
            <div>
              <p>{games.length}</p>
              <p className="font-bold">
                {games.length === 1 ? "game" : "games"}
              </p>
            </div>
            <div className="border-r-2 h-full border-black" />
            <div>
              <p>{followers}</p>
              <p className="font-bold">followers</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center gap-2">
          {games.slice(0, 3).map((game, idx, array) => (
            <div key={game.id} className="">
              <Image
                src={game.background_image}
                alt={game.name}
                width={200}
                height={200}
                style={{ objectFit: "cover" }}
                className={`rounded-lg ${
                  array.length === 3 && idx === 1 && "scale-125"
                }`}
              />
            </div>
          ))}
        </CardFooter>
      </div>
    </Card>
  )
}
