import Image from "next/image";

export default function ArchitectureSection() {
  const designs = [
    { title: "Classic", image: "/interior1.jpg" },
    { title: "Modern", image: "/interior2.jpg" },
    { title: "Minimalist", image: "/interior3.jpg" },
    { title: "Contemporary", image: "/interior4.jpg" },
  ];

  return (
    <section className="bg-[#f5f5f5] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Text */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
          
          <div>
            <p className="text-sm text-primary font-semibold tracking-wide uppercase">
              Categories
            </p>
            <h2 className="text-1xl md:text-2xl font-bold text-gray-900">
              Architecture Interior.
            </h2>
          </div>

          <p className="text-gray-600 max-w-md text-sm leading-relaxed">
            Designing an architectural interior involves integrating
            functionality, aesthetics, and user experience to create spaces that
            are both visually appealing and practical.
          </p>

        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {designs.map((item) => (
            <div key={item.title} className="relative group overflow-hidden">
              
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={300}
                className="w-full h-[250px] object-cover"
              />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 text-center py-2 text-xs font-semibold tracking-wide">
                {item.title.toUpperCase()}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}