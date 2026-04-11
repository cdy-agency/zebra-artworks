"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "../NavBar";
import Footer from "../Footer";

/* ================= DATA ================= */

const departments = [
  {
    id: "01",
    title: "INTERIOR DESIGN",
    subtitle: "Portfolio",
    description:
      "We craft interiors that merge aesthetics with function — from commercial lounges to private residences.",
    projects: [
      { src: "/interior1.jpg", title: "Commercial Spaces" },
      { src: "/interior2.jpg", title: "Residential Spaces" },
      { src: "/interior3.jpg", title: "Hotels & Apartments" },
      { src: "/interior4.jpg", title: "Public & Private Offices" },
    ],
  },
  {
    id: "02",
    title: "ARCHITECTURE & CONSTRUCTION",
    subtitle: "Departments",
    description:
      "End-to-end build solutions — from architectural planning and MEP to full construction and materials supply.",
    projects: [
      { src: "/interior5.jpg", title: "Architectural Plan" },
      { src: "/interior2.jpg", title: "MEP Supplies" },
      { src: "/interior3.jpg", title: "Construction" },
      { src: "/interior4.jpg", title: "Materials Supply" },
    ],
  },
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

/* ================= DEPARTMENT ================= */

function DepartmentSection({ dept }) {
  const [active, setActive] = useState(0);
  const current = dept.projects[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 border border-line/40 rounded-lg overflow-hidden bg-gray-dark/5">
      
      {/* LEFT */}
      <div className="flex flex-col justify-between p-8 border-b lg:border-b-0 lg:border-r border-line/40">
        
        <div className="space-y-2 mb-8">
          <span className="text-primary font-mono text-xs tracking-widest uppercase">
            {dept.id}
          </span>

          <h2 className="text-2xl font-extrabold text-foreground">
            {dept.title}
          </h2>

          <p className="text-gray-mid text-xs uppercase tracking-widest">
            {dept.subtitle}
          </p>

          <p className="text-gray-mid text-sm leading-relaxed pt-2 max-w-sm">
            {dept.description}
          </p>
        </div>

        <ul className="space-y-2">
          {dept.projects.map((p, i) => (
            <li key={i}>
              <button
                onClick={() => setActive(i)}
                className={`w-full cursor-pointer text-left px-4 py-2 rounded-md text-sm flex items-center gap-3 transition
                  ${
                    active === i
                      ? "bg-primary text-background"
                      : "text-gray-mid hover:text-foreground hover:bg-gray-dark/10"
                  }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    active === i ? "bg-background" : "bg-gray-mid/40"
                  }`}
                />
                {p.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="relative min-h-[300px] overflow-hidden">
        <Image
          key={current.src}
          src={current.src}
          alt={current.title}
          fill
          className="object-cover transition duration-700 hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute bottom-5 left-5">
          <span className="text-white/60 text-xs">
            {dept.id} / {String(active + 1).padStart(2, "0")}
          </span>
          <p className="text-white font-semibold">{current.title}</p>
        </div>

        {/* dots */}
        <div className="absolute top-4 right-4 flex gap-2">
          {dept.projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full ${
                active === i ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function ProjectsPage() {
  return (
    <>
      <Navbar />

      <main className="bg-subtle min-h-screen">

        {/* HERO */}
        <section className="relative w-full py-40 text-center -mt-28">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/interior2.jpg')" }}
          />
          <div className="absolute inset-0 bg-gray-dark/60" />

          <div className="relative z-10 pt-28">
            <h1 className="text-5xl font-extrabold text-background">
              OUR PROJECTS
            </h1>
          </div>
        </section>

        {/* CONTENT */}
        <div className="max-w-6xl  mx-auto px-6 pt-20 pb-32 space-y-10">

          {departments.map((dept) => (
            <DepartmentSection key={dept.id} dept={dept} />
          ))}

          {/* CLIENTS */}
          <section className="space-y-6 pt-6">
            <span className="text-xs text-gray-mid uppercase">
              Recent Clients
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="border border-line/40 rounded-md py-3 text-center text-xs text-gray-mid hover:text-primary hover:border-primary transition"
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