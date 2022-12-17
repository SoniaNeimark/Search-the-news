import nothingFoundAtAll from "../../images/not-found_v1.svg";
function NotFound(props) {
  const nothingFound = nothingFoundAtAll;
  return (
    <section className="notfound">
      <img className="notfound__image" src={nothingFound} alt="Sorry!" />
      <h2 className="notfound__title">Nothing found</h2>
      <p className="paragraph paragraph_place_main">
        {props.searchError
          ? "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
          : "Sorry, but nothing matched your search terms."}
      </p>
    </section>
  );
}

export default NotFound;
