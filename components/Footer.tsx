
import Link from "next/link";
// import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">ZAG Rwanda</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Transforming spaces into beautiful, functional homes. We bring
            creativity and precision to every interior design project.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide">
            Company
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-white transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
               Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide">
            Services
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>interior design department</li>
<li>architecture and construction departments</li>
           
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide">
            Contact
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Office Location Norrsken House KN 78 Streets, Kigali - Nyarugenge</li>
            <li>+250784843042</li>
            <li>office@zagrwanda.rw</li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white text-gray-400">
              {/* <Facebook size={18} /> */}
            </a>
            <a href="#" className="hover:text-white text-gray-400">
              {/* <Instagram size={18} /> */}
            </a>
            <a href="#" className="hover:text-white text-gray-400">
              {/* <Twitter size={18} /> */}
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ZAG Rwanda. All rights reserved.
      </div>
    </footer>
  );
}