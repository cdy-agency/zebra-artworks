import { getSupabaseServiceRoleClient } from "../lib/supabase-server";
import type { User } from "@supabase/supabase-js";
import type { Database } from "../types/database";
import "dotenv/config";

const getRequiredEnv = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const adminEmail = getRequiredEnv("SUPABASE_ADMIN_EMAIL");
const adminPassword = getRequiredEnv("SUPABASE_ADMIN_PASSWORD");
const adminFullName = getRequiredEnv("SUPABASE_ADMIN_FULL_NAME");
const adminRole: Database["public"]["Tables"]["profiles"]["Row"]["role"] = "admin";

const buildAdminAuthAttributes = () => ({
  email: adminEmail,
  email_confirm: true,
  password: adminPassword,
  app_metadata: {
    provider: "email",
    providers: ["email"],
    role: adminRole,
  },
  user_metadata: {
    email: adminEmail,
    full_name: adminFullName,
    name: adminFullName,
    role: adminRole,
  },
});

const getCreateUserErrorMessage = (message: string) => {
  if (message !== "Database error creating new user") {
    return `Unable to create admin user: ${message}`;
  }

  return [
    "Unable to create admin user: Supabase Auth rejected the insert with a database-side failure.",
    "This usually means an auth.users trigger or a constraint on public.profiles is broken.",
    "The seed now sends email/full_name/name/role metadata automatically, so if this still fails, fix the database trigger or constraint in Supabase before rerunning the seed.",
  ].join(" ");
};

const seedAdmin = async () => {
  const supabase = getSupabaseServiceRoleClient();
  const { data: usersData, error: usersError } =
    await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

  if (usersError) {
    throw new Error(`Unable to list auth users: ${usersError.message}`);
  }

  let authUser = usersData.users.find((user: User) => user.email === adminEmail);

  if (!authUser) {
    const { data: createdUser, error: createError } =
      await supabase.auth.admin.createUser(buildAdminAuthAttributes());

    if (createError || !createdUser.user) {
      throw new Error(
        getCreateUserErrorMessage(createError?.message ?? "Unknown error"),
      );
    }

    authUser = createdUser.user;
  } else {
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      authUser.id,
      buildAdminAuthAttributes(),
    );

    if (updateError) {
      throw new Error(`Unable to update admin user: ${updateError.message}`);
    }
  }

  const profile: Database["public"]["Tables"]["profiles"]["Insert"] = {
    email: adminEmail,
    full_name: adminFullName,
    id: authUser.id,
    role: adminRole,
  };

  const { error: profileError } = await supabase
    .from("profiles")
    .upsert(profile, { onConflict: "id" });

  if (profileError) {
    throw new Error(`Unable to upsert admin profile: ${profileError.message}`);
  }

  console.log(`Seeded admin account for ${adminEmail}`);
};

seedAdmin().catch((error: unknown) => {
  const message =
    error instanceof Error ? error.message : "Unknown seed failure";

  console.error(message);
  process.exit(1);
});
