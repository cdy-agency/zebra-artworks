"use client";

import { useState, useEffect } from "react";
import {
  Plus, Search, Edit2, Trash2,
  Layers, Home, Hammer, Store, Trees, Building2,
  HardHat, Package,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────

type ServiceStatus = "Active" | "Draft" | "Archived";

type Service = {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  icon: string;
  status: ServiceStatus;
  featured: boolean;
  order: number;
  updatedAt: string;
};

// ─── Constants ─────────────────────────────────────

const STORAGE_KEY = "zag_services_data";

// ─── Helpers ───────────────────────────────────────

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function saveServices(services: Service[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
}

function ServiceIcon({ name }: { name: string }) {
  const props = { size: 16 };
  switch (name) {
    case "home": return <Home {...props} />;
    case "hammer": return <Hammer {...props} />;
    case "store": return <Store {...props} />;
    case "trees": return <Trees {...props} />;
    case "building": return <Building2 {...props} />;
    case "hardhat": return <HardHat {...props} />;
    case "package": return <Package {...props} />;
    default: return <Layers {...props} />;
  }
}

// ─── Modal ─────────────────────────────────────────

function ServiceModal({
  service,
  onSave,
  onClose,
}: any) {
  const [title, setTitle] = useState(service?.title || "");

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      ...service,
      title,
      slug: slugify(title),
      category: "Other",
      description: "",
      icon: "home",
      status: "Active",
      featured: false,
      order: Date.now(),
      updatedAt: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-background p-6 rounded-lg border  w-full max-w-md">
        <h2 className="text-foreground font-bold mb-4">
          {service ? "Edit Service" : "Add Service"}
        </h2>

        {/* ✅ FIXED INPUT (ONLY CHANGE HERE) */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-line/20 bg-background text-foreground p-2 rounded-md mb-4 outline-none focus:border-primary focus:ring-0"
          placeholder="Service name"
        />

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-line text-foreground rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-background rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────

export default function ManageServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Service | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    setServices(raw ? JSON.parse(raw) : []);
  }, []);

  useEffect(() => {
    saveServices(services);
  }, [services]);

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditTarget(null);
    setModalOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditTarget(s);
    setModalOpen(true);
  };

  const handleSave = (data: Service) => {
    if (editTarget) {
      setServices((prev) =>
        prev.map((s) => (s.id === editTarget.id ? data : s))
      );
    } else {
      setServices((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Manage Services
            </h1>
            <p className="text-sm text-gray-mid">
              Control your services
            </p>
          </div>

          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-background rounded-md"
          >
            <Plus size={14} />
            Add Service
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center border-black/20 bg-background rounded-md px-3 py-2 border border-line/20">
          <Search size={14} className="text-gray-mid" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent outline-none px-2 text-foreground placeholder:text-gray-mid border-none focus:ring-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="bg-background border border-line/20 rounded-lg">
          <table className="w-full">
            <thead className="border-b border-line/20 text-gray-mid text-sm">
              <tr>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-line/10 hover:bg-primary/5"
                >
                  <td className="p-3 flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-md">
                      <ServiceIcon name={service.icon} />
                    </div>
                    <span className="text-foreground">
                      {service.title}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(service)}
                        className="p-2 hover:bg-primary/10 rounded-md text-gray-mid"
                      >
                        <Edit2 size={14} />
                      </button>

                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-2 hover:bg-primary/10 rounded-md text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Modal */}
      {modalOpen && (
        <ServiceModal
          service={editTarget}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}