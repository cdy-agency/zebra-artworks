export default function CompanyIntro() {
  return (
    <section className="bg-[#f6f7f9] py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">

        {/* Label */}
        <p className="text-type-meta text-primary font-semibold uppercase tracking-wide">
          Company Intro
        </p>

        {/* Title */}
        <h2 className="font-bold text-gray-900 mt-2">
          Zebra Artworks Group
        </h2>

        {/* Text */}
        <p className="text-gray-600 mt-6 text-type-prose leading-relaxed max-w-3xl mx-auto">
          Zebra Artworks Group began its journey in May 2019 and was formally
          registered in July 2020, marking a key milestone in its growth within
          the construction industry. Founded in Rwanda by Eng. Jean Victor
          Ishimwe, the company was created with a strong passion to improve
          interior design and construction standards.
        </p>

        <p className="text-gray-600 mt-4 text-type-prose leading-relaxed max-w-3xl mx-auto">
          We focus on delivering high-quality craftsmanship in construction
          finishing and interior design, combining innovation, precision, and
          customer satisfaction to create modern and functional spaces.
        </p>

      </div>
    </section>
  );
}