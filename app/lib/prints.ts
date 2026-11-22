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
    images: [
      "/prints/license-plate-holder.jpg",
      "/prints/example.jpg"
    ],
    image: "/prints/license-plate-holder.jpg",
    imageAlt: "3D printed license plate holder mounted on a car.",
  },
  {
    id: "Example",
    title: "Example",
    tags: ["Example", "Example", "Example"],
    description: "Example Description",
  },
  {
    id: "Example",
    title: "Example",
    tags: ["Example", "Example", "Example"],
    description: "Example Description",
  },
];

export function getPrintById(id: string) {
  return PRINTS.find((p) => p.id === id);
}

