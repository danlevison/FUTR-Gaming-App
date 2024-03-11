import Link from "next/link"
import { usePathname } from "next/navigation"
import { userRoutes } from "@/routes/routes"
import useUser from "@/hooks/useUser"

export default function UserLinks({
  sidebarStatus,
  nav,
  handleNav,
}: {
  sidebarStatus?: boolean
  nav?: boolean
  handleNav?: () => void
}) {
  const user = useUser()
  const pathname = usePathname()
  return (
    <ul className="flex flex-col gap-5 mt-5 md:mt-8">
      {userRoutes.map(({ name, path, icon }) => (
        <li key={name} className="group w-fit">
          <Link
            href={`${path}`}
            // href={
            // 	path === "/wishlist" && !user
            // 		? "/wishlist"
            // 		: path === "/wishlist" && user
            // 		? `/wishlist/${user.uid}`
            // 		: path
            // }
            className="flex items-center gap-2"
            onClick={handleNav}
          >
            <span
              className={`${
                pathname.includes(path)
                  ? "text-white"
                  : "text-gray-400 group-hover:text-primaryText duration-300"
              }`}
            >
              {icon}
            </span>

            {(sidebarStatus || nav) && (
              <span
                className={`font-bold md:text-lg text-gray-400 transition-all group-hover:text-primaryText duration-300 ${
                  sidebarStatus || nav ? "block" : "hidden"
                }`}
              >
                {name}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
