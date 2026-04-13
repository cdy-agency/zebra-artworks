import {
  Car,
  Users,
  CalendarCheck,
  TrendingUp,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
} from "lucide-react";

// ─── Mock Data (replace with real DB queries when endpoints are ready) ───────

const stats = [
  {
    label: "Total Vehicles",
    value: "124",
    sub: "+8 this month",
    trend: "up",
    icon: Car,
    color: "#005f75",
    bg: "rgba(0,95,117,0.08)",
  },
  {
    label: "Total Inquiries",
    value: "319",
    sub: "+19 this week",
    trend: "up",
    icon: Users,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
  },
  {
    label: "Test Drive Bookings",
    value: "37",
    sub: "+4 this week",
    trend: "up",
    icon: CalendarCheck,
    color: "#0369a1",
    bg: "rgba(3,105,161,0.08)",
  },
  {
    label: "Vehicles Sold",
    value: "28",
    sub: "+3 this month",
    trend: "up",
    icon: TrendingUp,
    color: "#15803d",
    bg: "rgba(21,128,61,0.08)",
  },
];

const recentListings = [
  {
    id: "VH-001",
    name: "Toyota Prado 2022",
    price: "$42,500",
    status: "Available",
    views: 142,
    added: "Dec 10, 2024",
  },
  {
    id: "VH-002",
    name: "Subaru Forester 2020",
    price: "$21,000",
    status: "Available",
    views: 98,
    added: "Dec 9, 2024",
  },
  {
    id: "VH-003",
    name: "Mercedes C200 2021",
    price: "$38,000",
    status: "Sold",
    views: 203,
    added: "Dec 8, 2024",
  },
  {
    id: "VH-004",
    name: "Honda CRV 2023",
    price: "$29,500",
    status: "Available",
    views: 77,
    added: "Dec 7, 2024",
  },
  {
    id: "VH-005",
    name: "BMW X5 2022",
    price: "$55,000",
    status: "Reserved",
    views: 165,
    added: "Dec 6, 2024",
  },
];

const recentInquiries = [
  {
    initials: "JM",
    name: "James Mukama",
    vehicle: "Toyota Prado 2022",
    type: "Contact",
    date: "Dec 10",
    status: "Pending",
  },
  {
    initials: "AC",
    name: "Aisha Cyusa",
    vehicle: "Subaru Forester 2020",
    type: "Test Drive",
    date: "Dec 9",
    status: "Confirmed",
  },
  {
    initials: "BN",
    name: "Bernard Nkusi",
    vehicle: "Mercedes C200 2021",
    type: "Contact",
    date: "Dec 8",
    status: "Resolved",
  },
  {
    initials: "GU",
    name: "Grace Umutoni",
    vehicle: "Honda CRV 2023",
    type: "Test Drive",
    date: "Dec 8",
    status: "Confirmed",
  },
  {
    initials: "PM",
    name: "Patrick Mugabo",
    vehicle: "BMW X5 2022",
    type: "Contact",
    date: "Dec 7",
    status: "Pending",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusStyle: Record<string, { bg: string; color: string }> = {
  Available: { bg: "#dcfce7", color: "#15803d" },
  Sold: { bg: "#fee2e2", color: "#dc2626" },
  Reserved: { bg: "#fef9c3", color: "#92400e" },
  Confirmed: { bg: "#dcfce7", color: "#15803d" },
  Pending: { bg: "#fef9c3", color: "#92400e" },
  Resolved: { bg: "#e0f2fe", color: "#0369a1" },
};

const avatarColors = [
  { bg: "#e0f2fe", color: "#0369a1" },
  { bg: "#dcfce7", color: "#15803d" },
  { bg: "#fee2e2", color: "#dc2626" },
  { bg: "#f3e8ff", color: "#7c3aed" },
  { bg: "rgba(0,95,117,0.1)", color: "#005f75" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  return (
    <div
      className="space-y-6"
      style={{ fontFamily: "'Century Gothic','AppleGothic',Arial,sans-serif" }}
    >
      {/* ── Welcome ── */}
      <div>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#000",
            marginBottom: 2,
          }}
        >
          Good morning 👋
        </h2>
        <p style={{ fontSize: 13, color: "#737373" }}>
          Here's what's happening at Kason Motors today.
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12,
        }}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              style={{
                background: "#fff",
                borderRadius: 10,
                border: "0.5px solid rgba(0,0,0,0.08)",
                padding: "16px 18px",
              }}
            >
              <div
                className="flex items-center justify-between"
                style={{ marginBottom: 12 }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#737373",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {stat.label}
                </p>
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{ width: 32, height: 32, background: stat.bg }}
                >
                  <Icon size={15} style={{ color: stat.color }} />
                </div>
              </div>
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#000",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: "#16a34a",
                  marginTop: 6,
                  fontWeight: 600,
                }}
              >
                ↑ {stat.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Two-column: Listings + Inquiries ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          alignItems: "start",
        }}
      >
        {/* Recent Listings */}
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            border: "0.5px solid rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between"
            style={{
              padding: "14px 16px",
              borderBottom: "0.5px solid rgba(0,0,0,0.06)",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 700, color: "#000" }}>
              Recent Listings
            </p>
            <a
              href="/admin/listings"
              className="flex items-center gap-0.5"
              style={{
                fontSize: 11,
                color: "#005f75",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              View all <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Rows */}
          {recentListings.map((v, i) => {
            const s = statusStyle[v.status] ?? {
              bg: "#f5f5f5",
              color: "#737373",
            };
            return (
              <div
                key={v.id}
                className="flex items-center gap-3"
                style={{
                  padding: "10px 16px",
                  borderBottom:
                    i < recentListings.length - 1
                      ? "0.5px solid rgba(0,0,0,0.04)"
                      : "none",
                }}
              >
                {/* Car icon bubble */}
                <div
                  className="flex items-center justify-center rounded-lg shrink-0"
                  style={{
                    width: 30,
                    height: 30,
                    background: "rgba(0,95,117,0.08)",
                  }}
                >
                  <Car size={13} style={{ color: "#005f75" }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#000",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {v.name}
                  </p>
                  <p style={{ fontSize: 10, color: "#737373", marginTop: 1 }}>
                    {v.id} · {v.added}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#000" }}>
                    {v.price}
                  </p>
                  <div
                    className="flex items-center justify-end gap-1"
                    style={{ marginTop: 2 }}
                  >
                    <Eye size={9} style={{ color: "#737373" }} />
                    <span style={{ fontSize: 10, color: "#737373" }}>
                      {v.views}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        padding: "1px 6px",
                        borderRadius: 99,
                        marginLeft: 4,
                        background: s.bg,
                        color: s.color,
                      }}
                    >
                      {v.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Inquiries */}
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            border: "0.5px solid rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between"
            style={{
              padding: "14px 16px",
              borderBottom: "0.5px solid rgba(0,0,0,0.06)",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 700, color: "#000" }}>
              Recent Inquiries
            </p>
            <a
              href="/admin/notification"
              className="flex items-center gap-0.5"
              style={{
                fontSize: 11,
                color: "#005f75",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              View all <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Rows */}
          {recentInquiries.map((inq, i) => {
            const av = avatarColors[i % avatarColors.length];
            const s = statusStyle[inq.status] ?? {
              bg: "#f5f5f5",
              color: "#737373",
            };
            return (
              <div
                key={i}
                className="flex items-center gap-3"
                style={{
                  padding: "10px 16px",
                  borderBottom:
                    i < recentInquiries.length - 1
                      ? "0.5px solid rgba(0,0,0,0.04)"
                      : "none",
                }}
              >
                {/* Avatar */}
                <div
                  className="flex items-center justify-center rounded-full shrink-0 font-bold"
                  style={{
                    width: 30,
                    height: 30,
                    background: av.bg,
                    color: av.color,
                    fontSize: 10,
                  }}
                >
                  {inq.initials}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#000" }}>
                    {inq.name}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      color: "#737373",
                      marginTop: 1,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {inq.vehicle}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className="flex items-center gap-1 justify-end"
                    style={{ marginBottom: 3 }}
                  >
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 600,
                        padding: "1px 6px",
                        borderRadius: 99,
                        background:
                          inq.type === "Test Drive"
                            ? "rgba(0,95,117,0.1)"
                            : "rgba(124,58,237,0.08)",
                        color:
                          inq.type === "Test Drive" ? "#005f75" : "#7c3aed",
                      }}
                    >
                      {inq.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <Clock size={9} style={{ color: "#737373" }} />
                    <span style={{ fontSize: 10, color: "#737373" }}>
                      {inq.date}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        padding: "1px 6px",
                        borderRadius: 99,
                        marginLeft: 2,
                        background: s.bg,
                        color: s.color,
                      }}
                    >
                      {inq.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          border: "0.5px solid rgba(0,0,0,0.08)",
          padding: "16px 18px",
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#000",
            marginBottom: 12,
          }}
        >
          Quick Actions
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            {
              label: "Upload New Vehicle",
              href: "/admin/listings/upload",
              primary: true,
            },
            {
              label: "View All Listings",
              href: "/admin/listings",
              primary: false,
            },
            {
              label: "Check Notifications",
              href: "/admin/notification",
              primary: false,
            },
            { label: "Settings", href: "/admin/settings", primary: false },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                textDecoration: "none",
                background: action.primary ? "#005f75" : "#f5f5f5",
                color: action.primary ? "#fff" : "#000",
                border: action.primary
                  ? "none"
                  : "0.5px solid rgba(0,0,0,0.08)",
                transition: "background 0.15s",
              }}
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
