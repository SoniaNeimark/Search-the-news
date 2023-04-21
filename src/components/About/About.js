function About() {
  //const url = "../../images/me.jpeg";
  return (
    <section className="about">
      <div
        className="about__image"
        //src="../../images/me.jpeg"
        //alt="Meet the author"
      ></div>
      <div className="about__article">
        <h2 className="about__title">About the author</h2>
        <p className="paragraph">
          Hello there! I'm Sonia Neimark. I'm a begginer in MERN stack
          developent, and this is my graduate project for{" "}
          <a
            className="about__link"
            href="https://practicum.com/en-isr/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <b>Practicum</b>
          </a>{" "}
          in Israel. To learn new things and to develop new skills is the best
          pleasure for me! I've now just started my way and feel very excited of
          what's waiting for me on the road.
        </p>
        <p className="paragraph">
          My experience with{" "}
          <a
            className="about__link"
            href="https://practicum.com/en-isr/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <b>Practicum</b>
          </a>{" "}
          was unforgettable! I got a really good start!
        </p>
      </div>
    </section>
  );
}

export default About;
