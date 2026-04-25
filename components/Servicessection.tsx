"use client";

import { motion } from "framer-motion";
import ServiceCard, { Service } from "@/components/Servicecard";

const services: Service[] = [
  {
    title: "Interior Design",
    description:
      "Transform your spaces with our innovative interior design solutions. From concept to completion, we create environments that inspire and function beautifully.",
    href: "/interior-design",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80&auto=format&fit=crop",
    imageAlt: "Modern interior design living room with elegant furniture",
  },
  {
    title: "Architecture & Construction",
    description:
      "Comprehensive architectural planning and construction services. We bring your vision to life with precision, quality, and attention to detail.",
    href: "/constructions",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop",
    imageAlt: "Modern architecture and construction project exterior",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-background py-20 sm:py-28 px-6 sm:px-10 lg:px-20">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 max-w-6xl mx-auto"
      >
        <div>
          <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">
            What we do
          </p>
          <h1 className="text-4xl sm:text-5xl text-foreground leading-[1.1]">
            Our Services
          </h1>

          <div className="h-0.5 w-56 bg-accent mt-1 rounded-full" />
        </div>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard key={service.href} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
