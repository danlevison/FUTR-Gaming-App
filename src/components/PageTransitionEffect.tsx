"use client"

import { useContext, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime"

function FrozenRouter(props: { children: React.ReactNode }) {
	const context = useContext(LayoutRouterContext ?? {})
	const frozen = useRef(context).current

	return (
		<LayoutRouterContext.Provider value={frozen}>
			{props.children}
		</LayoutRouterContext.Provider>
	)
}

const variants = {
	initial: {
		y: -10,
		opacity: 0
	},
	enter: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.2, staggerDirection: 0.4, delay: 0.2 }
	},
	exit: {
		y: 10,
		opacity: 0
	}
}

const PageTransitionEffect = ({ children }: { children: React.ReactNode }) => {
	const key = usePathname()

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
				<FrozenRouter>{children}</FrozenRouter>
			</motion.div>
		</AnimatePresence>
	)
}

export default PageTransitionEffect
