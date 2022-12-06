import nothingFoundAtAll from "../../images/not-found_v1.svg";
function NotFound() {
  const nothingFound = nothingFoundAtAll;
  return (
    <section className="notfound">
      <img className="notfound__image" src={nothingFound} alt="Sorry!" />
      <h2 className="notfound__title">Nothing found</h2>
      <p className="paragraph paragraph_place_main">
        Sorry, but nothing matched your search terms.
      </p>
    </section>
  );
}

export default NotFound;
