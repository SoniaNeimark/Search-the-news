function Preloader(props) {
  return (
    <section className={`preloader${props.preloader ? " preloader_hidden" : ""}`}>
      <div className="preloader__animation"></div>
      <p className="paragraph paragraph_place_main">Searching for news...</p>
    </section>
  );
}
export default Preloader;
