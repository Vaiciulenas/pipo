"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <div className="home__container">
        <Image
          src="/assets/pipo.png"
          alt="PIPO logo"
          width={180}
          height={180}
          className="home__logo"
          priority
        />

        <h1 className="home__title">PIPO</h1>

        <p className="home__tagline">
          Pixel-perfect 3D printing from idea to reality.
        </p>

        {/* ✅ Pixel blinking animation */}
        <div className="home__pixels" aria-hidden="true">
          <span className="home__pixel" />
          <span className="home__pixel home__pixel--alt" />
          <span className="home__pixel" />
        </div>

        {/* ✅ Call-to-action button */}
        <div style={{ marginTop: 28 }}>
          <Button
            as={Link}
            href="/homepage"
            color="primary"
            variant="shadow"
            size="lg"
          >
            Get Started
          </Button>
        </div>

        <div className="home__footer">© {new Date().getFullYear()} PIPO</div>
      </div>
    </main>
  );
}
