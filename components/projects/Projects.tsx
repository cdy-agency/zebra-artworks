// FILE: src/app/projects/page.tsx
import Link from "next/link";
import Navbar from "../NavBar";
import Footer from "../Footer";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/supabase";

function groupProjects(projects: Project[]) {
  const grouped: Record<string, Record<string, Project[]>> = {};
  for (const p of projects) {
    if (!grouped[p.category]) grouped[p.category] = {};
    if (!grouped[p.category][p.subcategory]) grouped[p.category][p.subcategory] = [];
    grouped[p.category][p.subcategory].push(p);
  }
  return grouped;
}

export const revalidate = 60;

export default async function ProjectsPage() {
  // ✅ Query Supabase directly — works at build time
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  const projects: Project[] = data ?? [];
  const grouped = groupProjects(projects);
  const clients = [...new Set(projects.map((p) => p.client).filter(Boolean))];

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">

        {/* HERO */}
        <section className="relative w-full py-40 text-center -mt-28">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/interior2.jpg')" }} />
          <div className="absolute inset-0 bg-gray-900/60" />
          <div className="relative z-10 pt-28">
            <h1 className="text-5xl font-extrabold text-white">OUR PROJECTS</h1>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 pt-20 pb-32 space-y-16">

          {Object.entries(grouped).map(([category, subcategories], catIdx) => (
            <section key={category} className="space-y-10">
              <div className="flex items-center gap-4">
                <span className="text-blue-600 font-mono text-xs tracking-widest uppercase">
                  {String(catIdx + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl font-extrabold text-gray-900 uppercase">{category}</h2>
              </div>

              {Object.entries(subcategories).map(([subcategory, items]) => (
                <div key={subcategory} className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2">
                    {subcategory}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((project) => (
                      <Link key={project.id} href={`/projects/${project.id}`} className="group block">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-200">
                          {project.images[0]
                            ? <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                            : <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
                          }
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="mt-3 space-y-1">
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{project.title}</p>
                          <p className="text-xs text-gray-500">{project.subcategory}</p>
                          {project.client && <p className="text-xs text-gray-400">Client: {project.client}</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}

          {clients.length > 0 && (
            <section className="space-y-6 pt-6">
              <span className="text-xs text-gray-400 uppercase tracking-widest">Recent Clients</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {clients.map((client, i) => (
                  <div key={i} className="border border-gray-200 rounded-md py-3 text-center text-xs text-gray-500 hover:text-blue-600 hover:border-blue-400 transition">
                    {client}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}