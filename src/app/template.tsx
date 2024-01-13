"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Template({ children }: { children: React.ReactNode }) {
	const key = usePathname()
	const variants = {
		initial: {
			y: -10,
			opacity: 0
		},
		enter: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.4, staggerDirection: 0.4, delay: 0.4 }
		},
		exit: {
			y: 10,
			opacity: 0
		}
	}

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={key}
				initial="initial"
				animate="enter"
				exit="exit"
				variants={variants}
				className="w-full"
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}
