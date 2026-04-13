export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">

      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back 
        </h1>
        <p className="text-gray-mid text-sm">
          Manage your projects, services, and clients here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: "Projects", value: "24" },
          { title: "Services", value: "8" },
          { title: "Clients", value: "16+" },
        ].map((item, i) => (
          <div
            key={i}
            className="p-5 border border-line/20 bg-background rounded-lg"
          >
            <p className="text-sm text-gray-mid">{item.title}</p>
            <h2 className="text-2xl font-bold text-foreground">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-5 border border-line/20 bg-background rounded-lg">
        <h3 className="font-semibold text-foreground mb-4">
          Quick Actions
        </h3>

        <div className="flex gap-3 flex-wrap">
          <a
            href="/admin/manageProjects"
            className="px-4 py-2 bg-primary text-background rounded-md text-sm"
          >
            Manage Projects
          </a>

          <a
            href="/admin/manageservices"
            className="px-4 py-2 border border-line text-foreground rounded-md text-sm"
          >
            Manage Services
          </a>

          <a
            href="/admin/messages"
            className="px-4 py-2 border border-line text-foreground rounded-md text-sm"
          >
            View Messages
          </a>
        </div>
      </div>
    </div>
  );
}