"use client";

import { useState } from "react";
import Navbar from "../NavBar";
import Footer from "../Footer";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else {
        setSuccess(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="bg-subtle min-h-screen">

        {/* HERO */}
        <section className="relative w-full py-40 px-6 text-center overflow-hidden -mt-28">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/interior4.jpg')" }}
          />
          <div className="absolute inset-0 bg-gray-dark/60" />
          <div className="relative z-10 pt-28">
            <h1 className="text-4xl md:text-5xl font-extrabold text-background">
              Contact Us
            </h1>
          </div>
        </section>

        {/* CONTENT */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

            {/* FORM */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Get In Touch</h2>
              <p className="text-gray-mid text-sm">
                Have a project in mind? Reach out to us and let's build something amazing together.
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-3 rounded-xl border border-line bg-subtle focus:outline-none focus:border-primary"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full p-3 rounded-xl border border-line bg-subtle focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full p-3 rounded-xl border border-line bg-subtle focus:outline-none focus:border-primary"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="w-full p-3 rounded-xl border border-line bg-subtle focus:outline-none focus:border-primary"
                />

                {/* Feedback */}
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
                {success && (
                  <p className="text-green-500 text-sm">
                    ✅ Message sent successfully! We'll get back to you soon.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* CONTACT INFO */}
            <div className="space-y-6">
              <div className="bg-subtle border border-line p-6 rounded-2xl flex items-center gap-4 hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Phone / WhatsApp</p>
                  <p className="text-gray-mid text-sm">(250) 784 843 042</p>
                </div>
              </div>

              <div className="bg-subtle border border-line p-6 rounded-2xl flex items-center gap-4 hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email Address</p>
                  <p className="text-gray-mid text-sm">zagrwanda@yahoo.com</p>
                </div>
              </div>

              <div className="bg-subtle border border-line p-6 rounded-2xl flex items-center gap-4 hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Our Location</p>
                  <p className="text-gray-mid text-sm">1 KN 78 St, Kigali – Norssken House</p>
                </div>
              </div>

              <div className="bg-subtle border border-line p-6 rounded-2xl space-y-3">
                <p className="font-semibold text-foreground">Follow Us</p>
                <div className="flex gap-4 text-sm text-gray-mid">
                  <span className="hover:text-primary cursor-pointer">Twitter @zagrwanda</span>
                  <span className="hover:text-primary cursor-pointer">LinkedIn</span>
                  <span className="hover:text-primary cursor-pointer">Instagram</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAP */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-line">
            <iframe
              src="https://maps.google.com/maps?q=Kigali%20Norrsken%20House&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[400px] border-0"
              loading="lazy"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}