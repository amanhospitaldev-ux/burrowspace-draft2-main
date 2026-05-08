// import { Link } from "@tanstack/react-router";
// import logo from "@/assets/logo-full.png";

// const navSections = [
//   // {
//   //   heading: "EXPLORE",
//   //   links: [
//   //     { label: "Home", to: "/" as const },
//   //     { label: "About Us", to: "/about" as const },
//   //     { label: "FAQs", to: "/faqs" as const },
//   //   ],
//   // },
//   // {
//   //   heading: "COMPANY",
//   //   links: [
//   //     //{ label: "Career", href: "#" },
//   //     { label: "Contact Us", to: "/contactus" as const },
//   //     { label: "Press", href: "#" },
//   //     { label: "Blog", href: "#" },
//   //   ],
//   // },
//   {
//     heading: "COMMUNITY",
//     links: [
//       { label: "Cybersec Community", href: "#" },
//       { label: "Discord", href: "#" },
//       { label: "GitHub", href: "#" },
//       { label: "Twitter / X", href: "#" },
//     ],
//   },
//   {
//     heading: "LEGAL",
//     links: [
//       { label: "Privacy Policy", href: "#" },
//       { label: "Terms of Service", href: "#" },
//       { label: "Cookie Policy", href: "#" },
//       { label: "Security", href: "#" },
//     ],
//   },
// ];

// export default function Footer() {
//   return (
//     <footer className="border-t border-white/10 bg-[oklch(0.08_0.02_260)] px-6 py-16 backdrop-blur-md lg:px-16">
//       <div className="mx-auto max-w-6xl">
//         <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
//           {/* Brand */}
//           <div className="lg:col-span-2">
//             <Link to="/" className="inline-flex items-center gap-3">
//               <img src={logo} alt="BurrowSpace" className="h-8 w-auto" />
//             </Link>
//             <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
//               Sovereign, decentralized storage — built for a world that values privacy.
//             </p>
//           </div>

//           {/* Sections */}
//           {navSections.map((section) => (
//             <div key={section.heading}>
//               <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-white/50">
//                 {section.heading}
//               </p>
//               <ul className="space-y-3">
//                 {section.links.map((link) =>
//                   "to" in link ? (
//                     <li key={link.label}>
//                       {/* <Link
//                         //to ={link.to}
//                         className="text-sm text-white/70 transition-colors hover:text-white"
//                       >
//                         {link.label}
//                       </Link> */}
//                     </li>
//                   ) : (
//                     <li key={link.label}>
//                       <a
//                         href={link.href}
//                         className="text-sm text-white/70 transition-colors hover:text-white"
//                       >
//                         {link.label}
//                       </a>
//                     </li>
//                   )
//                 )}
//               </ul>
//             </div>
//           ))}
//         </div>

//         <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
//           <p className="text-xs text-white/40">
//             ©️ {new Date().getFullYear()} BurrowSpace · All rights reserved.
//           </p>
//           <p className="text-xs text-white/40">Made in India 🇮🇳</p>
//         </div>
//       </div>
//     </footer>
//   );
// }


import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-full.png";

type FooterLink =
  | { label: string; to: "/cybersec-community" }
  | { label: string; href: string };

const navSections: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "COMMUNITY",
    links: [
      { label: "Cybersec Community", to: "/cybersec-community" },
      { label: "Discord", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Twitter / X", href: "#" },
    ],
  },
  {
    heading: "LEGAL",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[oklch(0.08_0.02_260)] px-6 py-16 backdrop-blur-md lg:px-16">
      <div className="mx-auto max-w-6xl">
        
        {/* Top Footer */}
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start">
          
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={logo} alt="BurrowSpace" className="h-8 w-auto" />
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Sovereign, decentralized storage — built for a world that values privacy.
            </p>
          </div>

          {/* Right Side Sections */}
          <div className="grid gap-12 sm:grid-cols-2">
            {navSections.map((section) => (
              <div key={section.heading}>
                <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-white/50">
                  {section.heading}
                </p>

                <ul className="space-y-3">
                  {section.links.map((link) =>
                    "to" in link ? (
                      <li key={link.label}>
                        <Link
                          to={link.to}
                          className="text-sm text-white/70 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-white/70 transition-colors hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/40">
            ©️ {new Date().getFullYear()} BurrowSpace · All rights reserved.
          </p>

          <p className="text-xs text-white/40">
            Made in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}