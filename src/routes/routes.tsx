import { FaHouse } from "react-icons/fa6"
import { FaGamepad } from "react-icons/fa"
import { HiNewspaper, HiBuildingStorefront } from "react-icons/hi2"

export const pageRoutes = [
	{
		name: "Home",
		path: "/",
		icon: <FaHouse size={25} />
	},
	{
		name: "Games",
		path: "/games",
		icon: <FaGamepad size={25} />
	},
	{
		name: "Store",
		path: "/store",
		icon: <HiBuildingStorefront size={25} />
	},
	{
		name: "Publishers",
		path: "/publishers",
		icon: <HiNewspaper size={25} />
	}
]
