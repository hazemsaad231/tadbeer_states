import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type AnimationType = 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight'

const variants = {
    fadeUp: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    fadeLeft: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    },
}

interface Props {
    children: ReactNode
    type?: AnimationType
    delay?: number
    className?: string
}

const AnimateOnScroll = ({ children, type = 'fadeUp', delay = 0, className }: Props) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            variants={variants[type]}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default AnimateOnScroll
