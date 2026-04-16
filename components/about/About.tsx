import Image from "next/image";
import Navbar from "../NavBar";
import Footer from "../Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-subtle">

        {/* 🔵 HEADER with background image - covers behind navbar */}
        <section className="relative text-center py-40 -mt-28">

          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/construction1.jpg"
              alt="about us background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 pt-28">
            <h1 className="text-5xl font-bold text-white mb-4">
              About Us
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              ZEBRA ARTWORKS GROUP embarked on its journey in May 2019, and by July 2020, it was formally registered, marking a significant milestone in its pursuit of excellence within the construction industry.
Our primary goal is to set new standards of craftsmanship,particularly focusing on 
the intricate details of Construction finishing and interior design. Founded by Eng.
 Jean Victor ISHIMWE in Rwanda, our inception was driven by a deep-seated passion to address 
 prevalent challenges in interior design and Construction. As our journey unfolded, we remained 
 steadfast in our commitment to innovation and customer satisfaction. With each passing year,
  our company has expanded in size, capacity, and expertise, continuously
 evolving to meet the dynamic demands of the modern market landscape.
            </p>
          </div>

        </section>

        {/* 🔵 MISSION */}
        <section className="bg-primary text-white py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <h2 className="text-2xl font-bold">OUR MISSION</h2>
            <p className="text-white/90 leading-relaxed">
             At Zebra Artworks Group, we are dedicated to reshaping the architectural 
             concepts, Construction and interior design landscape through our unwavering 
             commitment to sustainability, precision timing, and global standard finishing.
              Our mission is to create innovative, environmentally conscious spaces that not 
              only inspire but also enrich the lives of those who inhabit them. By integrating 
              sustainable practices into every face of our work, we strive to minimize our environmental
               footprint while maximizing the aesthetic and functional potential of each project. 
               Through collaborative partnerships, creative ingenuity, and meticulous attention to 
               detail, we aim to surpass industry norms and
              set new benchmarks for excellence in architectural, Construction and interior design.
            </p>
          </div>
        </section>

        {/* 🔵 VISION (with background image) */}
        <section className="relative py-20">
          <div className="absolute inset-0">
            <Image
              src="/interior1.jpg"
              alt="vision"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 text-white">
            <h2 className="text-2xl font-bold">OUR VISION</h2>
            <p className="leading-relaxed text-white/90">
              Our vision at Zebra Artworks Group is to be recognized globally 
              specifically in Africa as a trailblazer in sustainable architectural 
              and interior design, synonymous with uncompromising quality, impeccable
               timing, and cutting-edge innovation. We envision a future where every 
               structure and interior space we create serves as a testament to our 
               unwavering commitment to environmental stewardship, social responsibility,
                and superior craftsmanship. By harnessing the latest advancements in technology
                 and design, we aspire to transcend boundaries and elevate the human experience 
                 through transformative spaces that evoke emotion, inspire creativity, and foster a
                  sense of belonging. Our ultimate goal is to leave a lasting legacy of sustainable 
              beauty and functionality that resonates with clients, communities, and generations to come
            </p>
          </div>
        </section>

        {/* 🔵 VALUES */}
        {/* <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
            <h2 className="text-2xl font-bold text-foreground">OUR VALUES</h2>
            <ul className="space-y-3 text-gray-mid">
              <li>– Excellence in every project</li>
              <li>– Innovation in design</li>
              <li>– Commitment to quality</li>
              <li>– Customer satisfaction first</li>
            </ul>
          </div>
        </section> */}

        {/* 🔵 TEAM (image row style with hover overlay) */}
        <section className="grid md:grid-cols-4">

          {/* Member 1 */}
          {/* <div className="relative h-80 overflow-hidden group">
            <Image
              src="/profile1.jpg"
              alt="Jean Victor"
              fill
              className="object-cover object-top grayscale transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
              <div>
                <p className="text-white font-semibold text-sm">Mucyo Bruce</p>
                <p className="text-white font-semibold text-sm">Jean Victor</p>
                <p className="text-white/70 text-xs mt-1">CEO</p>
              </div>
            </div>
          </div> */}

          {/* Member 2 */}
          {/* <div className="relative h-80 overflow-hidden group">
            <Image
              src="/profile2.jpg"
              alt="Architect"
              fill
              className="object-cover object-top grayscale transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
              <div>
                <p className="text-white font-semibold text-sm">Mucyo Bruce</p>
                <p className="text-white font-semibold text-sm">Architect</p>
                <p className="text-white/70 text-xs mt-1">Design</p>
              </div>
            </div>
          </div> */}

          {/* Member 3 */}
          {/* <div className="relative h-80 overflow-hidden group">
            <Image
              src="/profile3.jpg"
              alt="Engineer"
              fill
              className="object-cover object-top grayscale transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
              <div>
                <p className="text-white font-semibold text-sm">Mucyo Bruce</p>
                <p className="text-white font-semibold text-sm">Engineer</p>
                <p className="text-white/70 text-xs mt-1">Construction</p>
              </div>
            </div>
          </div> */}

          {/* Member 4 */}
          {/* <div className="relative h-80 overflow-hidden group">
            <Image
              src="/profile6.jpg"
              alt="Manager"
              fill
              className="object-cover object-top grayscale transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
              <div>
                <p className="text-white font-semibold text-sm">Mucyo Bruce</p>
                <p className="text-white font-semibold text-sm">Manager</p>
                <p className="text-white/70 text-xs mt-1">Operations</p>
              </div>
            </div>
          </div> */}

        </section>

        {/* 🔽 SPACE BEFORE FOOTER - REMOVED */}
        {/* <div className="pb-20"></div> */}

      </main>

      <Footer />
    </>
  );
}