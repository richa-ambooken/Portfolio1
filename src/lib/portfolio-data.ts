export interface GalleryImage {
  src: string;
  caption: string;
}
export type CaseStudy = {
  overview: string;
  problem: string;
  process: string;
  solution: string;
  iterations: string;
  takeaways: string;
  role: string;
  timeline: string;
  tools: string[];
  projectType: string;
  defaultGallery: string[];
  gallery?: GalleryImage[];
};

export type Project = { 
  id: string; 
  title: string; 
  tag: string; 
  color: string; 
  coverImage: string;
  summary: string; 
  study: CaseStudy; };

const baseGallery = [
  "Cover Image",
  "Inspiration / Research",
  "Initial Concept",
  "Design Iteration 1",
  "Design Iteration 2",
  "Design Iteration 3",
  "Refinement",
  "Final Design",
  "Final Mockup",
];

export const PROJECTS: Project[] = [
  {
    id: "whisper",
    title: "Whisper Premium Packaging Redesign",
    tag: "Packaging · Brand",
    color: "#EAD7F5",
    coverImage: "/portfolio_pic/26.jpeg",
    summary:
      "Reimagining feminine care packaging into a premium confidence-first brand experience.",
    study: {
      role: "Brand & Packaging Designer",
      timeline: "Concept Project · 4 Weeks",
      tools: ["Canva", "Adobe Photoshop"],
      projectType: "Branding / Packaging",
      overview:
        "A concept redesign that reframes a familiar personal-care brand as a premium confidence-first ritual — softer geometry, tactile inner wrappers, and a discreet luxury language.",
      problem:
        "Existing packaging in the category feels clinical and generic. The premium tier needed a distinct visual language communicating comfort, care and quiet confidence — without medicalising the product.",
      process:
        "Studied premium personal-care packaging across skincare and wellness, mapped how texture, colour and negative space signal trust, and interviewed six users on shelf perception and unboxing.",
      solution:
        "A soft-touch matte pack in muted lavender with an embossed monogram. Every detail — from seal to inner wrapper — reinforces one idea: quiet care.",
      iterations:
        "Twelve directions across colour, typography and structural form. Tested foil vs matte, edge radius, and modular window cuts before landing on a debossed sleeve + drawer box.",
        gallery: [
      { src: "/portfolio_pic/29.jpeg", caption: "Whisper Package-Front" },
      { src: "/portfolio_pic/28.jpeg", caption: "Whisper Package-Back" },
      { src: "/portfolio_pic/30.jpeg", caption: "Whisper Package-Opening Flap" },
      { src: "/portfolio_pic/27.png", caption: "Individual Wrapper" },
      { src: "/portfolio_pic/26.jpeg", caption: "Final Mock" },
    ],
      takeaways:
        "Restraint reads as premium. When every element earns its place, the product feels considered — not decorated.",
      defaultGallery: baseGallery,
    },
  },
  {
    id: "placewise",
    title: "Placewise",
    tag: "Product · Mobile",
    color: "#D6E9FA",
    coverImage: "/portfolio_pic/g.png",
    summary:
      "An AI-powered placement companion helping students manage opportunities and career readiness.",
    study: {
      role: "UI/UX Designer",
      timeline: "Concept Project · 6 Weeks",
      tools: ["Figma", "FigJam", "Framer"],
      projectType: "Mobile App / Product Design",
      overview:
        "A single mobile companion that plans your placement week, drills weak areas with AI-generated practice, and rehearses interviews with voice feedback.",
      problem:
        "Students juggle aptitude prep, resume iterations, mock interviews and company research across a dozen tools — resulting in anxiety and missed opportunities.",
      process:
        "Ran eight student interviews, mapped the placement journey, prototyped in Figma and iterated across three rounds of usability testing.",
      solution:
        "A calm, focused interface with a dashboard-first structure. Each screen answers exactly one question: what do I do next?",
         gallery: [
      { src: "/portfolio_pic/9.jpeg", caption: "Login Page" },
      { src: "/portfolio_pic/8.jpeg", caption: "Home Page" },
      { src: "/portfolio_pic/10.jpeg", caption: "Notification Page" },
      { src: "/portfolio_pic/11.jpeg", caption: "Placement Feed" },
      { src: "/portfolio_pic/12.jpeg", caption: "Profile" },
      { src: "/portfolio_pic/13.jpeg", caption: "Resume Analyser" },
    ],
      iterations:
        "Moved from a tab-heavy IA to a single scrollable dashboard, then introduced an AI mock-interview flow with real-time feedback pills.",
      takeaways:
        "Designing for anxious users taught me that clarity beats cleverness. The best microcopy is the one you don't notice.",
      defaultGallery: baseGallery,
    },
  },
  {
    id: "artisan",
    title: "Artisan by Nikhita",
    tag: "Brand · Social",
    color: "#F5E6D3",
    coverImage: "/portfolio_pic/1.jpeg",
    summary:
      "Brand communication through social media creatives and promotional branding.",
    study: {
      role: "Graphic Designer",
      timeline: "Live Project · 3 Weeks",
      tools: ["Adobe Illustrator", "Adobe Photoshop", "Canva"],
      projectType: "Branding / Social Media",
      overview:
        "Brand identity and social system for a handcrafted jewellery label — warm earth tones, a signature serif, and layouts that feel torn from a coffee-table book.",
      problem:
        "The label had beautiful product but no consistent visual voice — every post looked like it belonged to a different brand.",
      process:
        "Audited the existing feed, defined a tight palette and type system, and built a modular grid the founder could reuse without a designer.",
      solution:
        "A restrained identity system with reusable poster, banner and carousel templates — plus a mini brand guide.",
      iterations:
        "Explored six directions ranging from editorial to boutique-luxury before landing on a warm-earth editorial system.",
         gallery: [
      { src: "/portfolio_pic/3.jpeg", caption: "Website Sale" },
      { src: "/portfolio_pic/2.jpeg", caption: "Instagram Poster 1" },
      { src: "/portfolio_pic/1.jpeg", caption: "Instagram Poster 2" },
      { src: "/portfolio_pic/4.jpeg", caption: "Flea Market Hording" },
      
    ],
      takeaways:
        "A small brand grows faster with a small system — not a big one.",
      defaultGallery: baseGallery,
    },
  },
  {
    id: "seaberry",
    title: "Seaberry",
    tag: "Branding · Vehicle",
    color: "#DDF0E4",
    coverImage: "/portfolio_pic/15.jpeg",
    summary: "Visual identity and vehicle branding for a fresh seafood delivery service.",
    study: {
      role: "Brand Designer",
      timeline: "Concept Project · 2 Weeks",
      tools: ["Adobe Illustrator", "Adobe Photoshop"],
      projectType: "Branding / Vehicle Wrap",
      overview:
        "A vibrant truck-side identity for a beverage-and-seafood delivery brand — moving billboards done right.",
      problem:
        "A delivery vehicle passes thousands of eyes per day, but most fleet wraps read as noise. Seaberry needed a wrap that works at 60 kmph and holds up at 6 feet.",
      process:
        "Sketched wrap compositions against real vehicle proportions, then tested against brand clarity, product hero shots and regulatory space.",
      solution:
        "A wraparound composition anchored by a confident wordmark, hero product photography and generous brand colour.",
         gallery: [
      { src: "/portfolio_pic/15.jpeg", caption: "right view" },
      { src: "/portfolio_pic/14.jpeg", caption: "Back View" },
      { src: "/portfolio_pic/17.jpeg", caption: "Model Truck" },
      { src: "/portfolio_pic/18.jpeg", caption: "Final Mock Up" },
      { src: "/portfolio_pic/16.jpeg", caption: "Final Product" },
    ],
      iterations:
        "Six iterations balancing brand clarity, product photography and regulatory margins.",
      takeaways:
        "On a moving surface, hierarchy is everything. Two things read; three things blur.",
      defaultGallery: baseGallery,
    },
  },
  {
    id: "lyric",
    title: "Lyric Sheet",
    tag: "Editorial",
    color: "#F0E6EF",
    coverImage: "/portfolio_pic/6.jpeg",
    summary:
      "Editorial design exploring typography, storytelling and visual composition.",
    study: {
      role: "Editorial Designer",
      timeline: "Concept Project · 1 Week",
      tools: ["Figma", "Adobe Illustrator"],
      projectType: "Editorial Design",
      overview:
        "A minimal editorial layout for a lyric sheet — typography as the entire interface.",
      problem:
        "How much can be stripped away before a lyric loses its rhythm on the page?",
      process:
        "Set the song in a dozen type systems, then removed everything that wasn't doing structural work.",
      solution:
        "One typeface, three weights, generous leading. The layout is the song.",
      iterations:
        "Iterated on leading, measure and stanza spacing until the page could be read at conversation pace.",
         gallery: [
      { src: "/portfolio_pic/6.jpeg", caption: "Sakhi Lyric Sheet Cover" },
      { src: "/portfolio_pic/5.jpeg", caption: "Sakhi Lyric Sheet" },
      
    ],
      takeaways:
        "In editorial, whitespace is punctuation.",
      defaultGallery: baseGallery,
    },
  },
  {
    id: "unhinged",
    title: "Unhinged Mix Tape — Brand Identity",
    tag: "Brand · Music",
    color: "#E8E0F5",
    coverImage: "/portfolio_pic/19.jpeg",
    summary:
      "Creating a bold visual identity and social media campaign for a modern music brand.",
    study: {
      role: "Graphic Designer",
      timeline: "Internship · 2 Months",
      tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
      projectType: "Brand Identity / Social Campaign",
      overview:
        "A rebellious, high-contrast identity system for an indie music label — built to travel across posters, album art and short-form video.",
      problem:
        "The label's identity was inconsistent across releases, diluting each artist's launch instead of amplifying it.",
      process:
        "Studied ten years of independent-label branding, defined a flexible identity spine, and built templates that scale from artist EP to festival billboard.",
      solution:
        "A bold monogram system, a modular poster grid and a social-first motion language that keeps every release recognisably 'Unhinged.'",
      iterations:
        "Explored typographic, sticker-collage and brutalist directions before merging into a modular brutalist-editorial system.",
         gallery: [
      { src: "/portfolio_pic/19.jpeg", caption: "Carousel 1" },
      { src: "/portfolio_pic/20.jpeg", caption: "Carousel 2" },
      { src: "/portfolio_pic/21.jpeg", caption: "Carousel 3" },
      { src: "/portfolio_pic/22.jpeg", caption: "Carousel 4" },
      { src: "/portfolio_pic/23.jpeg", caption: "Carousel 5" },
      { src: "/portfolio_pic/24.jpeg", caption: "Carousel 6" },
      { src: "/portfolio_pic/25.jpeg", caption: " Full Carousel" },
    ],
      takeaways:
        "For a music brand, the identity has to survive being screenshot, cropped and re-shared. Build for the crop.",
      defaultGallery: baseGallery,
    },
  },
];

export type Experience = {
  company: string;
  role: string;
  duration: string;
  description: string;
  mark: string;
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Narrate.in",
    role: "Graphic Designer & Brand Manager",
    duration: "2 Months",
    mark: "N",
    description:
      "Designed visual assets for multiple brands, maintained brand consistency, collaborated with clients, and created marketing creatives that strengthened digital brand presence across platforms.",
  },
  {
    company: "Unhinged Mix Tape",
    role: "Graphic Designer",
    duration: "2 Months",
    mark: "U",
    description:
      "Designed branding assets, promotional graphics, social media creatives, carousel campaigns, and visual identities while maintaining a cohesive brand experience.",
  },
];

export type ToolItem = {
  name: string;
  group: "Design Tools" | "UX Skills" | "Code";
  icon:
    | "figma" | "figjam" | "framer" | "canva" | "photoshop" | "illustrator"
    | "wireframe" | "prototype" | "research" | "flows" | "ia" | "system"
    | "responsive" | "a11y" | "interaction" | "visual"
    | "html" | "css" | "js" | "vscode";
  hue: string;
};

export const TOOLKIT: ToolItem[] = [
  { name: "Figma",             group: "Design Tools", icon: "figma",       hue: "#A259FF" },
  { name: "FigJam",            group: "Design Tools", icon: "figjam",      hue: "#FF7262" },
  { name: "Framer",            group: "Design Tools", icon: "framer",      hue: "#0055FF" },
  { name: "Canva",             group: "Design Tools", icon: "canva",       hue: "#00C4CC" },
  { name: "Adobe Photoshop",   group: "Design Tools", icon: "photoshop",   hue: "#31A8FF" },
  { name: "Adobe Illustrator", group: "Design Tools", icon: "illustrator", hue: "#FF9A00" },

  { name: "Wireframing",           group: "UX Skills", icon: "wireframe",   hue: "#8A8F98" },
  { name: "Prototyping",           group: "UX Skills", icon: "prototype",   hue: "#7C3AED" },
  { name: "User Research",         group: "UX Skills", icon: "research",    hue: "#0EA5E9" },
  { name: "User Flows",            group: "UX Skills", icon: "flows",       hue: "#10B981" },
  { name: "Information Architecture", group: "UX Skills", icon: "ia",       hue: "#6366F1" },
  { name: "Design Systems",        group: "UX Skills", icon: "system",      hue: "#EC4899" },
  { name: "Responsive Design",     group: "UX Skills", icon: "responsive",  hue: "#F59E0B" },
  { name: "Accessibility",         group: "UX Skills", icon: "a11y",        hue: "#22C55E" },
  { name: "Interaction Design",    group: "UX Skills", icon: "interaction", hue: "#EF4444" },
  { name: "Visual Design",         group: "UX Skills", icon: "visual",      hue: "#A855F7" },

  { name: "HTML",       group: "Code", icon: "html",   hue: "#E44D26" },
  { name: "CSS",        group: "Code", icon: "css",    hue: "#264DE4" },
  { name: "JavaScript", group: "Code", icon: "js",     hue: "#F7DF1E" },
  { name: "VS Code",    group: "Code", icon: "vscode", hue: "#007ACC" },
];
