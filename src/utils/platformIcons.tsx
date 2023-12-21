import {
	FaWindows,
	FaPlaystation,
	FaXbox,
	FaApple,
	FaLinux,
	FaAndroid,
	FaAppStoreIos
} from "react-icons/fa"
import { SiNintendo, SiSega } from "react-icons/si"

export const platformIcons: { [key: string]: JSX.Element } = {
	PC: <FaWindows size={15} />,
	PlayStation: <FaPlaystation size={15} />,
	Xbox: <FaXbox size={15} />,
	"Apple Macintosh": <FaApple size={15} />,
	Nintendo: <SiNintendo size={13} />,
	Linux: <FaLinux size={15} />,
	Android: <FaAndroid size={15} />,
	iOS: <FaAppStoreIos size={15} />,
	SEGA: <SiSega size={15} />
}
