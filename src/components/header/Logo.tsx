import { useRouter } from "next/navigation"

type LogoProps = {
  sidebarStatus?: boolean
  setNav?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Logo({ sidebarStatus, setNav }: LogoProps) {
  const router = useRouter()
  const handleLogoClick = () => {
    if (setNav) {
      setNav(false)
    }

    router.push("/")
  }

  return (
    <button
      onClick={handleLogoClick}
      className={`uppercase text-center text-sm font-bold text-primaryText border-y border-accentSecondary py-1 md:py-2 ${
        sidebarStatus && "text-xl w-full"
      }`}
    >
      Futr Gaming
    </button>
  )
}
