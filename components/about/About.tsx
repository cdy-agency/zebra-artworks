import Image from "next/image";
import Navbar from "../NavBar";

export default function AboutPage() {
  return (
    <>
    <Navbar/>
    <main className="pt-28 px-6 bg-subtle min-h-screen">

      <div className="max-w-6xl mx-auto space-y-20">

        {/* 🟢 HEADER */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            About Us
          </h1>

          <p className="text-gray-mid max-w-3xl mx-auto leading-relaxed">
            Zebra Artworks Group – Building excellence in construction, interior
            design, and architecture since 2019.
          </p>
        </section>

        {/* 🏢 STORY */}
        <section className="bg-subtle border border-line p-8 rounded-2xl space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Our Story
          </h2>

          <div className="space-y-4 text-gray-mid leading-relaxed">
            <p>
              ZEBRA ARTWORKS GROUP embarked on its journey in May 2019, and by July
              2020, it was formally registered, marking a milestone in its pursuit
              of excellence within the construction industry.
            </p>

            <p>
              Founded by Eng. Jean Victor ISHIMWE in Rwanda, our company was built
              with passion to solve challenges in interior design and construction.
            </p>
          </div>
        </section>

        {/* 🎯 MISSION */}
        <section className="bg-primary text-white p-8 rounded-2xl space-y-4 shadow-md">
          <h2 className="text-2xl font-semibold">
            Mission Statement
          </h2>

          <p className="text-white/90 leading-relaxed">
            "At Zebra Artworks Group, we are dedicated to reshaping architectural
            concepts, construction, and interior design through sustainability,
            precision timing, and global standard finishing."
          </p>
        </section>

        {/* 🌍 VISION */}
        <section className="bg-subtle border border-line p-8 rounded-2xl space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Vision Statement
          </h2>

          <p className="text-gray-mid leading-relaxed">
            "Our vision is to be recognized globally, especially in Africa, as a
            leader in sustainable architectural and interior design, known for
            quality and innovation."
          </p>
        </section>

        {/* 👥 TEAM */}
        <section className="space-y-10">
          <h2 className="text-2xl font-semibold text-center text-foreground">
            Our Team
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Member 1 */}
            <div className="bg-subtle border border-line p-6 rounded-2xl text-center hover:shadow-md transition">
              <div className="w-24 h-24 mx-auto relative mb-4">
                <Image
                  src="/profile1.jpg"
                  alt="Founder"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-foreground">
                Eng. Jean Victor ISHIMWE
              </h3>
              <p className="text-gray-mid text-sm">Founder & CEO</p>
            </div>

            {/* Member 2 */}
            <div className="bg-subtle border border-line p-6 rounded-2xl text-center hover:shadow-md transition">
              <div className="w-24 h-24 mx-auto relative mb-4">
                <Image
                  src="/profile1.jpg"
                  alt="Architect"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-foreground">
                Project Architect
              </h3>
              <p className="text-gray-mid text-sm">Design Department</p>
            </div>

            {/* Member 3 */}
            <div className="bg-subtle border border-line p-6 rounded-2xl text-center hover:shadow-md transition">
              <div className="w-24 h-24 mx-auto relative mb-4">
                <Image
                  src="/profile1.jpg"
                  alt="Engineer"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-foreground">
                Site Engineer
              </h3>
              <p className="text-gray-mid text-sm">Construction Team</p>
            </div>

          </div>
        </section>

      </div>
    </main>
    </>
  );
}