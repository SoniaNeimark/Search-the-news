import gitIcon from "../../images/github_no_frame.svg";
import fbIcon from "../../images/fb_no_frame.svg";
function Footer(props) {
  const git = gitIcon;
  const fb = fbIcon;
  return (
    <footer className="footer">
      <nav className="footer__nav">
        <div className="footer__text-links">
          <a className="footer__link" href={props.location.pathname === "/" ? "#nav" : "/"}>
            Home
          </a>
          <a
            className="footer__link"
            href="https://practicum.com/en-isr/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Practicum
          </a>
        </div>
        <div className="footer__icons">
          <a
            className="footer__link"
            href="https://github.com/SoniaNeimark"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img className="footer__icon" src={git} alt="Link to Git" />
          </a>
          <a
            className="footer__link"
            href="https://www.facebook.com/profile.php?id=100004256807753"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img className="footer__icon" src={fb}  alt="Link to FaceBook"/>
          </a>
        </div>
      </nav>
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Supersite, Powered by News API
      </p>
    </footer>
  );
}

export default Footer;
