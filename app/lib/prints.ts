export type PrintItem = {
  id: string;
  title: string;
  tags: string[];
  description: string;
  images?: string[];
  image?: string;
  imageAlt?: string;
};

export const PRINTS: PrintItem[] = [
  {
    id: "license-plate-holder",
    title: "License Plate Holder",
    tags: ["prototype", "car", "abs"],
    description: "Snap-fit license plate holder.",
    images: ["/prints/license-plate-holder.jpg"],
    image: "/prints/license-plate-holder.jpg",
    imageAlt: "Two black 3D printed license plate holder brackets with the PIPO logo.",
  },
];

export function getPrintById(id: string) {
  return PRINTS.find((p) => p.id === id);
}

