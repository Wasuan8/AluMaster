// ─── Enums / Unions ────────────────────────────────────────────────────────
export type Role = "owner_contractor" | "mistry" | "client" | "admin";
export type PlanId = "free" | "pro" | "contractor";
export type PlanTier = "free" | "pro" | "business" | "enterprise";
export type SubscriptionStatus = "free" | "active" | "expired" | "cancelled";
export type Cycle = "monthly" | "yearly";

// ─── Auth Providers map ───────────────────────────────────────────────────
export interface AuthProviders {
    phone: boolean;
    google: boolean;
    apple: boolean;
    facebook: boolean;
}

// ─── Business profile ─────────────────────────────────────────────────────
export interface BusinessProfile {
    companyName: string;
    gstin: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    whatsappNumber: string;
    website: string;
}

// ─── Real User from AluMaster Server ─────────────────────────────────────
export interface User {
    _id: string;
    userCode: string;
    name: string | null;
    email: string | null;
    phoneNumber: string | null;
    profileImage: string | null;
    role: Role;
    permissions: Record<string, boolean>;
    businessProfile: BusinessProfile;
    authProviders: AuthProviders;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    subscriptionStatus: SubscriptionStatus;
    planTier: PlanTier;
    subscriptionExpireDate: string | null;
    referralCode: string | null;
    maxSubUsersAllowed: number;
    isActive: boolean;
    lastLoginAt: string | null;
    createdAt: string;
    // Populated subscription (optional)
    subscriptionId?: {
        planId?: {
            planName: string;
            projectLimit: number;
            pdfLimit: number;
            duration: number;
            features: string[];
        };
        status: string;
        startDate: string;
        endDate: string;
        usage: Record<string, number>;
    } | null;
}

// ─── OTP session stored in sessionStorage ────────────────────────────────
export interface OtpSession {
    phone: string;
    verificationId: string;
    expiresInMinutes: number;
    sentAt: number; // Date.now()
}

// ─── Auth API response shapes ─────────────────────────────────────────────
export interface AuthResponse {
    success: boolean;
    token: string;
    user: User;
}

export interface SendOtpResponse {
    success: boolean;
    message: string;
    data: {
        verificationId: string;
        expiresInMinutes: number;
    };
}

// ─── Legacy demo types (still used by mock services) ─────────────────────
export type LegacyRole = "Owner" | "Contractor" | "Mistri";

export interface Project {
    id: string;
    name: string;
    client: string;
    windows: number;
    status: "Draft" | "In progress" | "Completed";
}

export interface Member {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: LegacyRole;
    status: "Active" | "Invited";
}

export interface Subscription {
    plan: PlanId;
    cycle: Cycle;
    renewal: string | null;
}

export interface Invoice {
    id: string;
    created: string;
    description: string;
    amount: number;
    status: "Demo";
}

export interface Database {
    user: User | null;
    projects: Project[];
    members: Member[];
    subscription: Subscription;
    invoices: Invoice[];
    profile: { company: string; gst: string; email: string };
}
