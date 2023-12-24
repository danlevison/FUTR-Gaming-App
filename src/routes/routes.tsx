import { FaHouse, FaGamepad, FaMasksTheater, FaHashtag } from "react-icons/fa6"
import { HiNewspaper, HiBuildingStorefront } from "react-icons/hi2"
import { BsCollectionFill } from "react-icons/bs"
import { FaHeart } from "react-icons/fa"

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
		name: "Tags",
		path: "/tags",
		icon: <FaHashtag size={25} />
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

export const userRoutes = [
	{
		name: "Collections",
		path: "/collections",
		icon: <BsCollectionFill size={25} />
	},
	{
		name: "Wishlist",
		path: "/wishlist",
		icon: <FaHeart size={25} />
	}
]
