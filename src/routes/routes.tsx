import { FaHouse, FaGamepad, FaMasksTheater, FaHashtag } from "react-icons/fa6"
import { HiNewspaper, HiBuildingStorefront } from "react-icons/hi2"
import { BsCollectionFill } from "react-icons/bs"
import { FaHeart, FaEnvelope } from "react-icons/fa"

export const pageRoutes = [
	{
		name: "Home",
		path: "/",
		icon: <FaHouse size={22} />
	},
	{
		name: "Games",
		path: "/games",
		icon: <FaGamepad size={22} />
	},
	{
		name: "Genres",
		path: "/genres",
		icon: <FaMasksTheater size={22} />
	},
	{
		name: "Tags",
		path: "/tags",
		icon: <FaHashtag size={22} />
	},
	{
		name: "Stores",
		path: "/stores",
		icon: <HiBuildingStorefront size={22} />
	},
	{
		name: "Publishers",
		path: "/publishers",
		icon: <HiNewspaper size={22} />
	}
]

export const userRoutes = [
	{
		name: "Collections",
		path: "/collections",
		icon: <BsCollectionFill size={22} />
	},
	{
		name: "Wishlist",
		path: "/wishlist",
		icon: <FaHeart size={22} />
	},
	{
		name: "Messages",
		path: "/messages",
		icon: <FaEnvelope size={22} />
	}
]
