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
    <section className="landing-section bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="landing-section-header"
      >
        <div>
          <p className="landing-eyebrow">What we do</p>
          <h2 className="landing-title">Our Services</h2>
          <div className="landing-rule" />
        </div>
      </motion.div>

      <div className="landing-container grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.href} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
