"use client";

import Link from "next/link";
import Navbar from "../NavBar";

export default function ServicesPage() {
  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-[#f6f7f9] text-[#1a1a1a]">

      {/* HERO WITH BACKGROUND IMAGE */}
      <section className="relative w-full py-32 px-6 text-center overflow-hidden">

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/interior.jpg')" }}
        />

        {/* Light overlay */}
        <div className="absolute inset-0" />

        {/* Content */}
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-background ">
            Our Services
          </h1>

          <p className="text-background/75  mt-4 text-sm md:text-base">
            We deliver refined interior design, architecture, and construction
            solutions tailored for modern living.
          </p>
        </div>
      </section>

      {/* INTERIOR DESIGN */}
      <section className="px-6 pb-16 pt-16">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-xl font-bold mb-8">
            Interior Design Department
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              "Commercial Spaces",
              "Residential Spaces",
              "Hotels & Apartments",
              "Public & Private Offices",
            ].map((item) => (
              <div
                key={item}
                className="bg-[var(--color-primary-dark)] text-white rounded-2xl p-6
                hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-md"
              >
                <h3 className="font-semibold text-sm">
                  {item}
                </h3>

                <p className="text-white/70 text-xs mt-2">
                  Elegant interior solutions designed for comfort and modern living.
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-xl font-bold mb-8">
            Architecture & Construction
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              "Architectural Plan",
              "MEP Supplies",
              "Construction Services",
              "Materials Supply",
            ].map((item) => (
              <div
                key={item}
                className="bg-[var(--color-primary-dark)] text-white rounded-2xl p-6
                hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-md"
              >
                <h3 className="font-semibold text-sm">
                  {item}
                </h3>

                <p className="text-white/70 text-xs mt-2">
                  Reliable engineering and construction solutions built to last.
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto text-center bg-white border border-[#e6e6e6] rounded-3xl p-10 shadow-sm">

          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to start your project?
          </h2>

          <p className="text-[#6b6b6b] mt-3 text-sm">
            Let’s turn your vision into reality with professional design and construction.
          </p>
        </div>
      </section>

    </main>
    </>
  );
}