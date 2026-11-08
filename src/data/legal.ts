/**
 * Legal pages (AUDIT.md §3 /legal/*): the template's rich text, verbatim (D6).
 * Never deploy publicly.
 */

export type Run = string | { strong: string } | { link: string; href: string };

export type LegalBlock =
  | { type: "h"; text: string }
  | { type: "p"; runs: Run[] }
  | { type: "ul"; items: Run[][] };

export type LegalPage = { slug: string; title: string; date: string; blocks: LegalBlock[] };

export const legalPages: LegalPage[] = [
  {
    slug: "terms-conditions",
    title: "Terms & Conditions",
    date: "Wednesday, October 1, 2025",
    blocks: [
      { type: "h", text: "1. INTRODUCTION" },
      { type: "p", runs: ["Welcome to this website (the “Site”). By accessing or using this Site, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully before using the Site."] },
      { type: "h", text: "2. OWNERSHIP & INTELLECTUAL PROPERTY" },
      { type: "p", runs: ["All content on this Site, including text, visuals, design assets, and code, are owned by Martin (the “Designer”) unless otherwise stated. You may not copy, reproduce, or redistribute any material without written permission."] },
      { type: "h", text: "3. USE OF CONTENT" },
      { type: "p", runs: ["The Site is intended for showcasing design work and related information. Content may not be used for commercial or promotional purposes without explicit consent from the Designer."] },
      { type: "h", text: "4. PROJECTS & CLIENT WORK" },
      { type: "p", runs: ["All featured client projects are presented with permission or in compliance with confidentiality agreements. Any resemblance to other works is purely coincidental."] },
      { type: "h", text: "5. EXTERNAL LINKS" },
      { type: "p", runs: ["This Site may contain links to third-party websites. The Designer is not responsible for the content, accuracy, or privacy practices of these external sites."] },
      { type: "h", text: "6. LIMITATION OF LIABILITY" },
      { type: "p", runs: ["The Designer shall not be liable for any direct, indirect, or consequential damages resulting from the use or inability to use this Site."] },
      { type: "h", text: "7. UPDATES TO TERMS" },
      { type: "p", runs: ["These Terms may be updated periodically. Continued use of the Site after updates constitutes acceptance of the revised Terms."] },
      { type: "h", text: "8. CONTACT" },
      { type: "p", runs: ["For any questions or requests regarding these Terms, please reach out via the contact form on the Site or email ", { link: "hello@martin.design", href: "mailto:hello@martin.design" }, "."] },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    date: "Saturday, October 11, 2025",
    blocks: [
      { type: "h", text: "1. INTRODUCTION" },
      { type: "p", runs: ["This Privacy Policy explains how this website (“the Site”) collects, uses, and protects your personal information. By using this Site, you agree to the terms outlined below."] },
      { type: "h", text: "2. INFORMATION WE COLLECT" },
      { type: "p", runs: ["We may collect the following types of information:"] },
      {
        type: "ul",
        items: [
          [{ strong: "Personal details" }, ": such as your name, email address, or company name when you contact us through forms."],
          [{ strong: "Analytics data" }, ": including your browser type, IP address, and pages visited, collected via cookies or analytics tools to improve site performance."],
        ],
      },
      { type: "h", text: "3. HOW WE USE YOUR INFORMATION" },
      { type: "p", runs: ["Your information is used to:"] },
      {
        type: "ul",
        items: [
          ["Respond to inquiries or project requests"],
          ["Improve the content, design, and functionality of the Site"],
          ["Monitor and analyze usage for better user experience"],
        ],
      },
      { type: "h", text: "4. COOKIES" },
      { type: "p", runs: ["This Site may use cookies to enhance your browsing experience. You can disable cookies in your browser settings if you prefer not to share usage data."] },
      { type: "h", text: "5. DATA SECURITY" },
      { type: "p", runs: ["Reasonable technical and organizational measures are taken to protect your information from unauthorized access, alteration, or disclosure."] },
      { type: "h", text: "6. THIRD-PARTY SERVICES" },
      { type: "p", runs: ["We may use third-party tools (e.g., Google Analytics, Framer Analytics, or similar) to track performance and engagement. These services have their own privacy policies governing data use."] },
      { type: "h", text: "7. YOUR RIGHTS" },
      { type: "p", runs: ["You have the right to:"] },
      {
        type: "ul",
        items: [
          ["Request access to any personal data collected"],
          ["Request correction or deletion of your information"],
          ["Withdraw consent at any time"],
        ],
      },
      { type: "p", runs: ["To exercise these rights, please contact ", { link: "hello@martin.design", href: "mailto:hello@martin.design" }, "."] },
      { type: "h", text: "8. UPDATES TO THIS POLICY" },
      { type: "p", runs: ["This Privacy Policy may be updated periodically to reflect changes in practices or regulations. The date of the most recent revision will appear at the top of this page."] },
    ],
  },
];
