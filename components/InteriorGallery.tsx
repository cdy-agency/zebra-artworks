// 📁 components/InteriorGallery.tsx

import Image from "next/image";

export default function InteriorGallery() {
  return (
    <section className="bg-[#f5f5f5] py-16 px-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        
        <div className="flex flex-col md:flex-row justify-between gap-6">
          
          <div>
            <p className="text-sm text-primary font-semibold tracking-wide uppercase">
              Gallery
            </p>

            {/* SAME text size as your first code */}
            <h2 className="text-2xl md:text-2xl font-bold text-gray-900">
              Interior Design Gallery
            </h2>
          </div>

          {/* SAME paragraph style */}
          <p className="text-gray-600 max-w-md text-sm leading-relaxed">
            Develop a concept or theme that will guide the design process. This
            could be inspired by the client’s preferences, the building’s
            architecture, or a specific design style.
          </p>

        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        
        {/* Left Large */}
        <div className="md:row-span-2 relative overflow-hidden rounded-xl group">
          <Image
            src="/interior1.jpg"
            alt="Bedroom"
            width={300}
            height={200}
            className="w-full h-[250px] md:h-[520px] object-cover "
          />
        </div>

        {/* Top Middle */}
        <div className="relative overflow-hidden rounded-xl group">
          <Image
            src="/interior2.jpg"
            alt="Dining"
            width={300}
            height={200}
            className="w-full h-[250px] object-cover "
          />
        </div>

        {/* Right Tall */}
        <div className="md:row-span-2 relative overflow-hidden rounded-xl group">
          <Image
            src="/interior3.jpg"
            alt="Living room"
            width={300}
            height={200}
            className="w-full h-[250px] md:h-[520px] object-cover "
          />
        </div>

        {/* Bottom Middle */}
        <div className="relative overflow-hidden rounded-xl group">
          <Image
            src="/interior4.jpg"
            alt="Modern interior"
            width={300}
            height={200}
            className="w-full h-[250px] object-cover "
          />
        </div>

      </div>
    </section>
  );
}