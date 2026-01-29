export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main className="home">
      <section className="home__container">
        <img
          src="/assets/pipo.png"
          alt="PIPO logo"
          className="home__logo"
        />

        <h1 className="home__title">PIPO</h1>

        <p className="home__tagline">
          PIXEL-PERFECT
          <br />
          3D PRINTING
          <br />
          FROM IDEA TO REALITY
        </p>

        <div className="home__pixels" aria-hidden="true">
          <span className="home__pixel" />
          <span className="home__pixel home__pixel--alt" />
          <span className="home__pixel" />
        </div>

        <footer className="home__footer">{year} PIPO</footer>
      </section>
    </main>
  );
}