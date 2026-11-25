export const plans = [
    {
        id: "free",
        name: "Free Starter",
        price: 0,
        tagline: "Essential tools for independent mistris & solo fabricators",
        description: "Calculate window dimensions, estimate basic material needs, and store projects on your device without cost.",
        badge: "Free Forever",
        popular: false,
        features: [
            "Up to 5 active projects",
            "2-Track & 3-Track sliding window calculations",
            "Standard openable casement & fixed partition sizing",
            "Single-device offline local storage",
            "Basic material cost estimation sheet",
            "Standard community forum support",
        ],
        facilities: [
            "Basic window dimension calculator",
            "Local storage database",
            "Single user access",
            "Community support",
        ],
        idealFor: "Solo mistris and hobbyist fabricators starting their first aluminium jobs.",
    },
    {
        id: "pro",
        name: "Pro Fabricator",
        price: 499,
        tagline: "Everything you need to eliminate scrap and deliver client-ready quotes",
        description: "Our most popular plan. Packed with precision cutting optimization, PDF exports, and complete hardware BOM.",
        badge: "Most Popular · High ROI",
        popular: true,
        features: [
            "Unlimited projects & project history",
            "First-Fit-Decreasing (FFD) Bar Cutting Optimizer (saves 10-18% scrap)",
            "Professional branded Client Quotation PDFs with your logo & GST",
            "Mistri Workshop Cut-List PDF (without disclosing profit margins)",
            "Complete Glass area & Hardware BOM (Bill of Materials)",
            "Universal Profile Catalogs (Jindal, Hindalco, Euro, Domal)",
            "Offline-first mobile & tablet support with auto cloud sync",
            "Full project backup & restore",
            "Fast email & WhatsApp priority support",
        ],
        facilities: [
            "Bar optimization & scrap reduction algorithm",
            "1-Click branded Client & Mistri PDF generation",
            "Multi-brand aluminium profile catalogs",
            "Automatic hardware, gasket, and glass BOM",
            "Cloud synchronization & auto-backup",
        ],
        idealFor: "Established aluminium fabrication workshops, contractor-fabricators, and growing businesses.",
    },
    {
        id: "contractor",
        name: "Contractor Team",
        price: 999,
        tagline: "Multi-user management, site dispatch, and advanced business analytics",
        description: "Manage your entire fabrication workshop, site mistris, client billing, and job progress from one unified platform.",
        badge: "Best for Workshops & Teams",
        popular: false,
        features: [
            "Everything included in Pro Fabricator",
            "Multi-user team management (Owner, Contractor, Mistri roles)",
            "Field measurement logging & direct site-to-workshop handoff",
            "Live project progress & installation stage tracker",
            "Advanced Profitability & Material Wastage Analytics dashboard",
            "Custom profile weight (kg/m) & rate multiplier rules",
            "Audit trail & user activity history",
            "VIP WhatsApp & phone support with dedicated onboarding",
        ],
        facilities: [
            "Role-based team dispatch (Owner, Contractor, Mistri)",
            "On-site mobile measurement logging",
            "Profit margin & wastage analytics",
            "Custom section weight & pricing overrides",
            "VIP direct phone & WhatsApp support",
        ],
        idealFor: "High-volume contractors, multi-mistri workshops, and commercial glazing teams.",
    },
] as const;

export const facilitiesDetailed = [
    {
        id: "cutting-optimizer",
        title: "Precision Bar Cutting & Scrap Optimizer",
        icon: "scissors",
        tag: "Material Efficiency",
        description: "AluMaster's First-Fit-Decreasing (FFD) linear algorithm organizes every window and door cut length into standard 12ft, 14ft, or 16ft stock bars, reducing scrap offcuts by 10% to 18% on every project.",
        benefits: [
            "Minimizes wasted aluminium offcuts and saves thousands in raw material costs",
            "Generates visual cutting diagrams with exact cut sequences and blade kerf allowance",
            "Tracks reusable balance pieces for future projects",
        ],
    },
    {
        id: "dual-pdfs",
        title: "1-Click Client & Workshop Dual PDFs",
        icon: "file",
        tag: "Professional Documentation",
        description: "Generate two distinct PDF documents instantly: a branded commercial quotation for your client, and a precision cut-list for your workshop mistri.",
        benefits: [
            "Client Quotations: Custom logo, GSTIN, payment terms, and clear window schedule",
            "Mistri Cut-Sheets: Exact profile lengths, 45°/90° cut angles, and glass sizes without margin leaks",
            "Share directly to WhatsApp or download in print-ready vector PDF format",
        ],
    },
    {
        id: "team-dispatch",
        title: "Role-Based Team Dispatch & Field Sync",
        icon: "users",
        tag: "Collaboration & Roles",
        description: "Seamlessly coordinate Owners, Contractors, and Mistris. Mistris record site measurements on mobile, contractors approve rates, and owners monitor profitability.",
        benefits: [
            "Dedicated role permissions: prevent mistris from seeing cost prices or total profit",
            "Site mistris log window dimensions straight into AluMaster from mobile phones",
            "Real-time status updates: Draft → Quoted → In Production → Completed",
        ],
    },
    {
        id: "universal-catalogs",
        title: "Universal Profile Catalogs & Weight Calibrator",
        icon: "layers",
        tag: "Catalog Support",
        description: "Support for popular aluminium systems including 2-Track & 3-Track Sliders, Casement Windows, Domal, Euro Series, Louvers, and Fixed Partitions.",
        benefits: [
            "Pre-loaded with Jindal, Hindalco, and generic architectural section weights",
            "Custom kg/meter weight overrides to match your local supplier's dies exactly",
            "Calculate accurate total aluminium weight in kilograms before ordering from extruders",
        ],
    },
    {
        id: "smart-bom",
        title: "Automated Hardware & Glass BOM",
        icon: "calculator",
        tag: "Bill of Materials",
        description: "Eliminate manual counting errors. AluMaster automatically tallies every accessory required for production based on window configuration.",
        benefits: [
            "Instant counts for nylon rollers, star locks, friction stays, and corner brackets",
            "Accurate glass square-footage and perimeter EPDM gasket / wool pile meterage",
            "Prevents mid-job workshop halts caused by missing hardware parts",
        ],
    },
    {
        id: "offline-cloud",
        title: "Offline-First Workshop Reliability + Cloud Backup",
        icon: "wifi",
        tag: "Anywhere Access",
        description: "Designed specifically for fabrication workshops with corrugated metal roofs and construction basements where cellular reception is weak.",
        benefits: [
            "Create estimates, calculate cuts, and access projects with zero internet connection",
            "Automatic end-to-end encrypted backup to the cloud as soon as you reconnect",
            "Zero data loss with continuous local storage caching",
        ],
    },
] as const;

export const howItWorksSteps = [
    {
        step: "01",
        title: "Setup Workshop & Rates",
        description: "Enter your standard aluminium rate per kg, glass sq.ft price, and workshop logo once in your profile.",
        icon: "building",
    },
    {
        step: "02",
        title: "Input Window Dimensions",
        description: "Add window openings (width × height), choose track styles (2-track, 3-track, casement), and select glass thickness.",
        icon: "calculator",
    },
    {
        step: "03",
        title: "Auto-Optimize & Calculate",
        description: "The engine computes section weights, hardware BOM, and arranges cut lengths into stock bars to minimize scrap.",
        icon: "scissors",
    },
    {
        step: "04",
        title: "Dispatch & Win Clients",
        description: "Export a polished branded quotation for your customer and send the cutting list directly to workshop mistris.",
        icon: "file",
    },
] as const;

export const comparisonFeatures = [
    {
        category: "Projects & Catalog Management",
        items: [
            { name: "Active Projects", free: "Up to 5", pro: "Unlimited", contractor: "Unlimited" },
            { name: "Window & Door Types", free: "Sliding & Casement", pro: "All Series (Sliding, Casement, Domal, Partition, Louver)", contractor: "All Series + Custom Templates" },
            { name: "Profile Catalog (Jindal, Hindalco, Euro)", free: "Standard defaults", pro: "Full library + Custom weights", contractor: "Full library + Custom weights & dies" },
            { name: "Custom Section Rates (₹/kg)", free: "Fixed rate", pro: "Per-project overrides", contractor: "Per-project & Client tier overrides" },
            { name: "Project History & Search", free: "Last 5 projects", pro: "Unlimited full history", contractor: "Unlimited full history + Tags" },
        ],
    },
    {
        category: "Cutting Optimization & Material BOM",
        items: [
            { name: "Aluminium Section Weight Calculation", free: "Basic", pro: "Precision (kg & meter)", contractor: "Precision (kg & meter)" },
            { name: "Bar Cutting Optimization (Scrap Saver)", free: "—", pro: "Included (FFD Algorithm)", contractor: "Included (FFD + Multi-stock lengths)" },
            { name: "Glass Area & Thickness Sizing", free: "Basic area", pro: "Precise cut sizes + Costing", contractor: "Precise cut sizes + Costing" },
            { name: "Hardware & Accessories BOM", free: "—", pro: "Full automated list", contractor: "Full automated list + Custom items" },
            { name: "Scrap & Wastage Reduction Report", free: "—", pro: "Included", contractor: "Advanced breakdown + Cost analytics" },
        ],
    },
    {
        category: "Quotations & Professional Documentation",
        items: [
            { name: "Client Quotation PDF", free: "Standard watermark", pro: "Branded with logo & GST", contractor: "Branded with logo & GST" },
            { name: "Workshop Mistri Cut-List PDF", free: "—", pro: "Included (No profit leak)", contractor: "Included (No profit leak)" },
            { name: "Custom Terms & Bank Details", free: "—", pro: "Included", contractor: "Included" },
            { name: "1-Click WhatsApp Quote Sharing", free: "—", pro: "Included", contractor: "Included" },
            { name: "Invoice & Payment Tracking", free: "—", pro: "Basic", contractor: "Advanced stage-wise tracking" },
        ],
    },
    {
        category: "Team, Roles & Multi-Device Access",
        items: [
            { name: "User Seats", free: "1 User", pro: "1 User (Multi-device)", contractor: "Multi-user (Owner + Mistris + Staff)" },
            { name: "Role Permissions (Owner, Contractor, Mistri)", free: "—", pro: "—", contractor: "Included (Granular permissions)" },
            { name: "Site Measurement Logging via Mobile", free: "—", pro: "Single user", contractor: "All assigned mistris" },
            { name: "Offline-First Workshop Mode", free: "Included", pro: "Included", contractor: "Included" },
            { name: "Cloud Auto-Sync & Backup", free: "—", pro: "Automated real-time", contractor: "Automated real-time + Versioning" },
        ],
    },
    {
        category: "Support & SLA",
        items: [
            { name: "Support Channels", free: "Community forum", pro: "Priority Email & WhatsApp", contractor: "VIP Direct Phone & WhatsApp" },
            { name: "Onboarding & Workshop Training", free: "Self-guided videos", pro: "Video walkthroughs", contractor: "1-on-1 Dedicated onboarding call" },
            { name: "SLA & Uptime", free: "Standard", pro: "99.9% Uptime", contractor: "99.9% Uptime + Priority queue" },
        ],
    },
] as const;

export const features = [
    ["Smart estimation", "Keep multiple windows in one project and calculate with confidence.", "calculator"],
    ["Material calculator", "Plan aluminium profiles, glass, and hardware in one place.", "layers"],
    ["Waste optimization", "Plan bar cuts with First Fit Decreasing optimization.", "scissors"],
    ["Professional PDFs", "Create dedicated client, mistri, and contractor documents.", "file"],
    ["Offline first", "Designed for the workshop, including places with limited connectivity.", "wifi"],
    ["Your business, your brand", "Add your company branding, GST details, and contact information.", "building"],
] as const;

export const faqs = [
    ["What is AluMaster?", "AluMaster is a specialised software platform designed for aluminium window & door fabricators, contractors, and mistris to calculate materials, optimize cutting offcuts, generate quotations, and manage projects."],
    ["How does the Bar Cutting Optimizer save me money?", "The optimizer uses a First-Fit-Decreasing linear algorithm to pack all required window profile cuts into standard 12ft/14ft/16ft aluminium bars with minimum leftover waste. Fabricators typically save 10% to 18% in aluminium scrap, translating to thousands of rupees saved on every project."],
    ["How does annual billing work?", "When you choose yearly billing, you receive a 20% discount on the total price — equivalent to getting more than 2 full months completely free."],
    ["Can I upgrade, downgrade, or cancel at any time?", "Yes! You can switch between Free, Pro, and Contractor plans at any time with no lock-in contracts. Your projects and estimates remain safely stored in your account."],
    ["Can my mistris use AluMaster on their mobile phones at the job site?", "Yes! AluMaster is 100% mobile-friendly and built offline-first. Mistris can log on-site window measurements directly into the app even in basements without network coverage. When on the Contractor plan, site measurements sync directly to the workshop dashboard."],
    ["What is the difference between the Client Quote and Mistri Cut-Sheet?", "The Client Quote is a polished, professional PDF containing your branding, GSTIN, window elevations, glass specifications, and commercial price breakdown. The Mistri Cut-Sheet is a technical workshop document showing exact cutting lengths, 45°/90° angles, and hardware lists without revealing your cost margins or profits."],
    ["What aluminium profile sections are supported?", "AluMaster supports all major systems including 2-Track and 3-Track Sliders, Openable Casement Windows, Top-Hung Ventilators, Domal Series, Euro Groove, Louvers, and Fixed Partitions. You can also calibrate custom weights (kg/m) to match your local suppliers."],
    ["Is my workshop data and pricing confidential?", "Absolutely. Your customer list, section rates, and project details are encrypted and strictly private to your workshop. AluMaster never shares your business data with third parties."],
    ["Are payment cards required for the demo / free plan?", "No credit card or payment details are required to start using the Free plan or explore the interactive demo."],
    ["How do I get priority support?", "Pro and Contractor subscribers receive priority email and dedicated WhatsApp support. Contractor plan members also get direct phone assistance and 1-on-1 workshop onboarding."],
];

export const publicRoutes = [
    "/", "/pricing", "/about", "/contact", "/support",
    "/privacy-policy", "/terms",
];
