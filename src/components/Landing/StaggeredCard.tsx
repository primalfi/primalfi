"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const StaggeredCard = ({ children, index, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default StaggeredCard;