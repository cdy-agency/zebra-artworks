// 📁 components/FeedbackSection.tsx

import Image from "next/image";

type Feedback = {
  id: number;
  image: string;
  message: string;
  name: string;
};

export default function FeedbackSection() {
  const feedbacks: Feedback[] = [
    {
      id: 1,
      image: "/interior1.jpg",
      message:
        "Absolutely thrilled with my experience! They were professional, creative, and incredibly talented. My home feels like a work of art now!",
      name: "John Doe",
    },
    {
      id: 2,
      image: "/interior2.jpg",
      message:
        "They were fantastic to work with! Their design ideas were fresh and innovative, and they were always willing to accommodate my preferences.",
      name: "Michael Smith",
    },
    {
      id: 3,
      image: "/interior3.jpg",
      message:
        "The transformation was beyond my expectations. Every detail was carefully thought out, making the space both beautiful and functional.",
      name: "David Johnson",
    },
  ];

  return (
    <section className="bg-[#f5f5f5] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 max-w-lg leading-snug">
            Explore client feedback on our latest project
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {feedbacks.map((item) => (
            <div key={item.id} className="space-y-4">
              
              {/* Image */}
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={600}
                  height={400}
                  className="w-full h-[250px] object-cover"
                />
              </div>

              {/* Message */}
              <p className="text-gray-600 text-sm leading-relaxed">
                “{item.message}”
              </p>

              {/* Name */}
              <p className="text-gray-900 text-sm font-semibold">
                {item.name}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}