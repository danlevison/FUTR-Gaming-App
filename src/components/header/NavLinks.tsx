"use client"

import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { pageRoutes } from "@/routes/routes"

export default function NavLinks({
  sidebarStatus,
  nav,
  handleNav,
}: {
  sidebarStatus?: boolean
  nav?: boolean
  handleNav?: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleRouter = (path: string) => {
    handleNav && handleNav()
    router.push(path)
  }

  return (
    <ul className="flex flex-col justify-between gap-5 mt-5 md:mt-8">
      {pageRoutes.map(({ name, path, icon }) => (
        <li key={path} className="group w-fit">
          <button
            className="flex items-center gap-2"
            onClick={() => handleRouter(path)}
          >
            <span
              className={`${
                pathname === path
                  ? "text-white"
                  : "text-gray-400 group-hover:text-primaryText duration-300"
              }`}
            >
              {icon}
            </span>

            {(sidebarStatus || nav) && (
              <span
                className={`font-bold text-gray-400 md:text-lg transition-all group-hover:text-primaryText duration-300 ${
                  pathname === path && "text-white"
                } ${sidebarStatus || nav ? "block" : "hidden"} `}
              >
                {name}
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  )
}
