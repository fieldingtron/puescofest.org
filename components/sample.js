{
  /* // now the band info */
}
{
  props.pagez.bands.map((band, index) => (
    <div id={`#lineup-${index}`} className="mfp-hide line-up">
      <div className="cont">
        <div className="top">
          <figure>
            <img className="img-fluid" src={band.imgSrc} alt={band.name} />
          </figure>
        </div>
        <div className="bottom">
          <h3>{band.name}</h3>
          <ul>
            <li key={`bandyear-${index}`}>
              <strong>Año:</strong> {band.year}
            </li>
            <li key={`bandstyle-${index}`}>
              <strong>Género:</strong> Hip Hop, Indie, Otro
            </li>
            <li key={`bandorigin-${index}`}>
              <strong>Origen:</strong> Santiago, Chile
            </li>
          </ul>
          {/* <div className="text-center">
                <ul className="redes">
                  <li key={`soundcloud-${index}`}>
                    <a
                      href="https://soundcloud.com/ana-tijoux-official"
                      target="_blank"
                      className="sc_icon icon"
                    >
                      {" "}
                      <i
                        className="fa fa-soundcloud"
                        aria-hidden="true"
                      ></i>{" "}
                    </a>
                  </li>
                  <li key={`facebook-${index}`}>
                    <a
                      href="https://www.facebook.com/anatijoux/"
                      target="_blank"
                      className="sc_icon icon"
                    >
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li key={`instagram-${index}`}>
                    <a
                      href="https://www.instagram.com/anatijoux/"
                      target="_blank"
                      className="sc_icon icon"
                    >
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div> */}
        </div>
      </div>
    </div>
  ));
}
