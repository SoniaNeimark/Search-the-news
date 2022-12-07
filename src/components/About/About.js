import authorImage from "../../images/header_background.png";
function About() {
  const url = authorImage
  return (
    <section className="about">
      <img className="about__image" src={url} alt="Meet the author" />
      <div className="about__article">
        <h2 className="about__title">About the author</h2>
        <p className="paragraph">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>
        <p className="paragraph">
          You can also talk about your experience with Practicum, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}

export default About;
