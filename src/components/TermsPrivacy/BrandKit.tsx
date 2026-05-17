"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    ShieldAlert,
    Copyright,
    BadgeCheck,
    ImageIcon,
} from "lucide-react";

export default function BrandKitSection() {

    const assets = [
        {
            title: "PrimalFi Logo",
            type: "PNG",
            image: "/brandkit/large-logo.png",
            download: "/brandkit/large-logo.png",
        },
        {
            title: "PrimalFi Head",
            type: "PNG",
            image: "/brandkit/prhead.png",
            download: "/brandkit/prhead.png",
        },
        {
            title: "PrimalFi Body",
            type: "PNG",
            image: "/brandkit/prbody.png",
            download: "/brandkit/prbody.png",
        },
        {
            title: "prAPE Token Logo",
            type: "PNG",
            image: "/brandkit/prAPE.png",
            download: "/brandkit/prAPE.png",
        },
    ];

    return (

        <section className="relative overflow-hidden py-28">

            <div className="relative max-w-7xl mx-auto px-6">

                {/* HERO */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >

                    <div className="
                        inline-flex
                        items-center
                        gap-3
                        px-5
                        py-3
                        rounded-full
                        border
                        border-cyan-400/20
                        bg-cyan-400/10
                        backdrop-blur-xl
                        mb-8
                    ">

                        <ImageIcon className="w-4 h-4 text-cyan-300" />

                        <p className="
                            text-cyan-200
                            text-xs
                            uppercase
                            tracking-[0.25em]
                            font-black
                        ">
                            Official Brand Assets
                        </p>

                    </div>

                    <h2 className="
                        text-6xl
                        md:text-7xl
                        font-black
                        leading-none
                        mb-8
                    ">
                        PrimalFi
                        <br />

                        <span className="
                            bg-gradient-to-r
                            from-cyan-300
                            to-sky-400
                            bg-clip-text
                            text-transparent
                        ">
                            Brand Kit
                        </span>
                    </h2>

                    <p className="
                        max-w-3xl
                        mx-auto
                        text-cyan-100/80
                        text-xl
                        leading-relaxed
                    ">
                        Official logos, symbols, and branding assets for media,
                        integrations, partnerships, announcements and ecosystem usage.
                    </p>

                </motion.div>

                {/* ASSETS GRID */}
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-4
                    gap-8
                    mb-20
                ">

                    {assets.map((asset, index) => (

                        <motion.div
                            key={asset.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.08,
                            }}
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-[30px]
                                border
                                border-white/10
                                bg-white/[0.04]
                                backdrop-blur-xl
                                hover:border-cyan-400/30
                                transition-all
                                duration-300
                            "
                        >

                            {/* IMAGE */}
                            <div className="
                                relative
                                h-[260px]
                                border-b
                                border-white/10
                                bg-transparent
                                flex
                                items-center
                                justify-center
                                p-10
                            ">

                                <Image
                                    src={asset.image}
                                    alt={asset.title}
                                    fill
                                    className="object-contain p-10"
                                />

                            </div>

                            {/* INFO */}
                            <div className="p-6">

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    mb-5
                                ">

                                    <div>

                                        <p className="
                                            text-white
                                            font-black
                                            text-xl
                                            mb-1
                                        ">
                                            {asset.title}
                                        </p>

                                        <p className="
                                            text-cyan-300
                                            text-sm
                                            font-bold
                                            uppercase
                                            tracking-[0.15em]
                                        ">
                                            {asset.type}
                                        </p>

                                    </div>

                                    <div className="
                                        w-12
                                        h-12
                                        rounded-2xl
                                        bg-cyan-400/10
                                        border
                                        border-cyan-400/20
                                        flex
                                        items-center
                                        justify-center
                                    ">

                                        <BadgeCheck className="
                                            w-5
                                            h-5
                                            text-cyan-300
                                        " />

                                    </div>

                                </div>

                                {/* DOWNLOAD */}
                                <a
                                    href={asset.download}
                                    download
                                    className="block w-full"
                                >

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="
                                            group
                                            relative
                                            overflow-hidden
                                            inline-flex
                                            items-center
                                            justify-center
                                            gap-4
                                            w-full
                                            px-8
                                            py-5
                                            rounded-[22px]
                                            bg-[#0d3cb1]
                                            hover:bg-[#1646be]
                                            border
                                            border-[#6f8fff]
                                            cursor-pointer
                                            transition-all
                                            duration-300
                                        "
                                    >

                                        {/* SHINE FX */}
                                        <motion.div
                                            className="
                                            absolute
                                            inset-0
                                            -translate-x-full
                                            group-hover:translate-x-full
                                            transition-transform
                                            duration-1000
                                            bg-gradient-to-r
                                            from-transparent
                                            via-white/10
                                            to-transparent
                                        "
                                        />

                                        {/* TEXT */}
                                        <span className="
                                            relative
                                            text-white
                                            text-sm
                                            md:text-base
                                            font-black
                                            tracking-[0.14em]
                                            uppercase
                                        ">
                                            Download
                                        </span>


                                    </motion.button>

                                </a>

                            </div>

                        </motion.div>
                    ))}

                </div>

                {/* LEGAL */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="
                        relative
                        overflow-hidden
                        rounded-[36px]
                        border
                        border-[#5f7fe0]
                        bg-[#0d1f42]
                        p-10
                        md:p-14
                    "
                >

                    <div className="
                        absolute
                        inset-0
                        bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,transparent_100%)]
                        pointer-events-none
                    " />

                    <div className="
                        relative
                        flex
                        flex-col
                        xl:flex-row
                        gap-10
                    ">

                        {/* LEFT */}
                        <div className="flex-1">

                            <div className="
                                flex
                                items-center
                                gap-4
                                mb-8
                            ">

                                <div className="
                                    w-16
                                    h-16
                                    rounded-2xl
                                    bg-red-500/10
                                    border
                                    border-red-400/20
                                    flex
                                    items-center
                                    justify-center
                                ">

                                    <ShieldAlert className="
                                        w-8
                                        h-8
                                        text-red-300
                                    " />

                                </div>

                                <div>

                                    <p className="
                                        text-red-300
                                        font-black
                                        uppercase
                                        tracking-[0.25em]
                                        text-xs
                                        mb-2
                                    ">
                                        Usage Policy
                                    </p>

                                    <h3 className="
                                        text-4xl
                                        font-black
                                        text-white
                                    ">
                                        Brand Protection
                                    </h3>

                                </div>

                            </div>

                            <div className="
                                space-y-6
                                text-cyan-100/85
                                text-lg
                                leading-relaxed
                            ">

                                <p>
                                    All PrimalFi logos, symbols, graphics,
                                    and brand assets are protected intellectual property.
                                </p>

                                <p>
                                    These files may only be used for:
                                </p>

                                <ul className="
                                    space-y-3
                                    list-disc
                                    pl-6
                                ">

                                    <li>
                                        Ecosystem integrations
                                    </li>

                                    <li>
                                        Media coverage
                                    </li>

                                    <li>
                                        Community content
                                    </li>

                                    <li>
                                        Official partnership material
                                    </li>

                                </ul>

                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="
                            xl:w-[420px]
                            rounded-[28px]
                            border
                            border-white/10
                            bg-white/[0.03]
                            p-8
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                                mb-6
                            ">

                                <Copyright className="
                                    w-6
                                    h-6
                                    text-cyan-300
                                " />

                                <p className="
                                    text-white
                                    font-black
                                    text-2xl
                                ">
                                    Restrictions
                                </p>

                            </div>

                            <div className="
                                space-y-5
                                text-[#c4d4ff]
                                leading-relaxed
                            ">

                                <p>
                                    Do not alter, distort, recolor,
                                    or modify any official asset.
                                </p>

                                <p>
                                    Modified versions, derivative branding,
                                    or unofficial variants are prohibited.
                                </p>

                                <p>
                                    Usage of PrimalFi branding does not grant
                                    ownership, trademark rights, or endorsement.
                                </p>

                                <p>
                                    All assets remain subject to copyright,
                                    trademark protection, and ecosystem brand policy.
                                </p>

                            </div>

                        </div>

                    </div>

                </motion.div>

            </div>

        </section>
    );
}