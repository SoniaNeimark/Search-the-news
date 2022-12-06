function Preloader(props) {
  return (
    <section className={`preloader${props.preloader ? " preloader_hidden" : ""}`}>
      <div className="preloader__animation"></div>
      <p className="paragraph paragraph_place_preloader">Searching for news...</p>
    </section>
  );
}
export default Preloader;
