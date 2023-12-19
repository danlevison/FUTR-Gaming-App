import { FaHouse, FaGamepad, FaMasksTheater } from "react-icons/fa6"
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
		name: "Genres",
		path: "/genres",
		icon: <FaMasksTheater size={25} />
	},
	{
		name: "Stores",
		path: "/stores",
		icon: <HiBuildingStorefront size={25} />
	},
	{
		name: "Publishers",
		path: "/publishers",
		icon: <HiNewspaper size={25} />
	}
]
