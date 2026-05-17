"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedOnScroll = ({ children, delay = 0, direction = "up", threshold = 0.2 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: threshold });

    const directions = {
        up: { y: 50, x: 0 },
        down: { y: -50, x: 0 },
        left: { y: 0, x: 50 },
        right: { y: 0, x: -50 },
        none: { y: 0, x: 0 }
    };

    const startOffset = directions[direction] || directions.up;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...startOffset }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...startOffset }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedOnScroll;