// 📁 components/InteriorGallery.tsx

import Image from "next/image";

const gallery = [
  {
    src: "/interior1.jpg",
    title: "Modern Bedroom",
    desc: "A calm and elegant bedroom designed for comfort and relaxation.",
  },
  {
    src: "/interior2.jpg",
    title: "Dining Space",
    desc: "A stylish dining area perfect for family and social gatherings.",
  },
  {
    src: "/interior3.jpg",
    title: "Living Room",
    desc: "A spacious and modern living room with a luxurious touch.",
  },
  {
    src: "/interior4.jpg",
    title: "Minimal Interior",
    desc: "Clean and minimal design focused on simplicity and beauty.",
  },
];

export default function InteriorGallery() {
  return (
    <section className="bg-[#f5f5f5] py-16 px-6">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          
         <div>
  <p className="text-sm text-primary font-semibold tracking-wide uppercase">
    Highlights
  </p>

  <h2 className="text-2xl md:text-2xl font-bold text-gray-900">
    Our Interior Design Highlights
  </h2>
</div>

<p className="text-gray-600 max-w-md text-sm leading-relaxed">
  Explore some of our finest interior design works, showcasing creativity,
  elegance, and attention to detail in every space we transform.
</p>

        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

        {/* Left Large */}
        <div className="md:row-span-2 relative overflow-hidden rounded-xl group">
          <Image
            src={gallery[0].src}
            alt={gallery[0].title}
            width={300}
            height={200}
            className="w-full h-[250px] md:h-[520px] object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
            <div>
              <h3 className="text-white font-semibold text-sm">
                {gallery[0].title}
              </h3>
              <p className="text-white/70 text-xs mt-1">
                {gallery[0].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Top Middle */}
        <div className="relative overflow-hidden rounded-xl group">
          <Image
            src={gallery[1].src}
            alt={gallery[1].title}
            width={300}
            height={200}
            className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
            <div>
              <h3 className="text-white font-semibold text-sm">
                {gallery[1].title}
              </h3>
              <p className="text-white/70 text-xs mt-1">
                {gallery[1].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Right Tall */}
        <div className="md:row-span-2 relative overflow-hidden rounded-xl group">
          <Image
            src={gallery[2].src}
            alt={gallery[2].title}
            width={300}
            height={200}
            className="w-full h-[250px] md:h-[520px] object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
            <div>
              <h3 className="text-white font-semibold text-sm">
                {gallery[2].title}
              </h3>
              <p className="text-white/70 text-xs mt-1">
                {gallery[2].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Middle */}
        <div className="relative overflow-hidden rounded-xl group">
          <Image
            src={gallery[3].src}
            alt={gallery[3].title}
            width={300}
            height={200}
            className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
            <div>
              <h3 className="text-white font-semibold text-sm">
                {gallery[3].title}
              </h3>
              <p className="text-white/70 text-xs mt-1">
                {gallery[3].desc}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}