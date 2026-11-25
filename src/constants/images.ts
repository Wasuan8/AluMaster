export const IMAGES = {
    logo: "/assets/images/logo.png",
    icon: "/icon.svg",
} as const;

export type ImageKey = keyof typeof IMAGES;
