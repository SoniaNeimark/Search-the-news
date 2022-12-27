function About() {
  const url =
    "https://scontent.ftlv1-1.fna.fbcdn.net/v/t1.18169-9/13494896_664374407047780_5639984127943742659_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_ohc=sYZ867W5zzQAX84VRCZ&_nc_ht=scontent.ftlv1-1.fna&oh=00_AfBer9grFpFjpQ98dOcUUEmWy9VkdN88tEpdAFxxn1yJKQ&oe=63BFCF34";
  return (
    <section className="about">
      <img className="about__image" src={url} alt="Meet the author" />
      <div className="about__article">
        <h2 className="about__title">About the author</h2>
        <p className="paragraph">
          Hello there! I'm Sonia Neimark. I'm a begginer in MERN stack developent, and this is my graduate project for{" "}
          <a
            className="about__link"
            href="https://practicum.com/en-isr/"
            target="_blank"
            rel="noreferrer noopener"
          ><b>Practicum</b>
          </a> in Israel. To learn new things and to develop new skills is the best pleasure for me! I've now just started my way and feel very excited of what's waiting for me on the road. 
        </p>
        <p className="paragraph">
          My experience with <a
            className="about__link"
            href="https://practicum.com/en-isr/"
            target="_blank"
            rel="noreferrer noopener"
          ><b>Practicum</b>
          </a> was unforgettable! I got a really good start! 
        </p>
      </div>
    </section>
  );
}

export default About;
