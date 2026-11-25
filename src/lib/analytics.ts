export type AnalyticsEvent =
    | "trial_started"
    | "pricing_viewed"
    | "checkout_started"
    | "demo_plan_selected";

// Attach a production analytics provider after defining consent and event policy.
export function track(_event: AnalyticsEvent, _properties?: Record<string, string | number>) {
    // Intentionally no network requests in this prototype.
}
