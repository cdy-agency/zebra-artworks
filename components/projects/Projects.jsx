"use client";

import Image from "next/image";
import Navbar from "../NavBar";
import Footer from "../Footer";

const projects = [
  { src: "/interior1.jpg", title: "Modern Interior Design" },
  { src: "/interior2.jpg", title: "Office Workspace" },
  { src: "/interior3.jpg", title: "Luxury Living Room" },
  { src: "/interior4.jpg", title: "Commercial Space" },
  { src: "/interior5.jpg", title: "Hotel Interior" },
  { src: "/interior3.jpg", title: "Landscape Design" },
];

const clients = [
  "URBAN PARK SUITES",
  "GALAXY HOTEL",
  "REMA",
  "RCS",
  "SHREECOM",
  "PWC",
  "MR ROOF",
  "CHARISMA BOOKSTORE",
  "GORILLA GAMES",
  "BRANDSPEAK",
  "IPRC TUMBA",
  "TOMTRANSFERS",
  "NEWSPECIES",
  "BEST GADGET",
  "SAMSUNG 250",
  "KIGALI PHONES KT",
];

export default function ProjectsPage() {
  return (
    <>
      <Navbar />

      <main className="bg-subtle min-h-screen">

        {/* 🔥 HERO SECTION (NEW) */}
        <section className="relative w-full py-40 px-6 text-center overflow-hidden -mt-28">

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/interior2.jpg')" }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-dark/60" />

          {/* Content */}
          <div className="relative z-10 pt-28">
            <h1 className="text-4xl md:text-5xl font-extrabold text-background">
              Our Projects
            </h1>

            <p className="text-background/80 mt-4 max-w-2xl mx-auto">
              Explore our completed works in construction, architecture, and interior design.
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-32 space-y-20">

          {/* 🖼️ PROJECT GALLERY */}
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Portfolio
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-gray-dark/5 border border-line cursor-pointer hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={project.src}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gray-dark/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <p className="text-white font-semibold text-center px-4">
                      {project.title}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </section>

          {/* 🤝 CLIENTS */}
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-foreground text-center">
              Recent Clients
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

              {clients.map((client, index) => (
                <div
                  key={index}
                  className="bg-subtle border border-line rounded-xl py-4 px-3 text-center text-sm font-medium text-gray-mid hover:text-primary hover:border-primary transition"
                >
                  {client}
                </div>
              ))}

            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}