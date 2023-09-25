import React from "react";

export default function Contact() {
  //console.log(process.env.NEXT_PUBLIC_EMAIL_REST_API);
  //console.log("hello");
  return (
    <section className="contact-section dark-back" id="contact">
      <div className="container mx-auto">
        <h1 className="main-title">Contacto</h1>

        <form
          name="sentMessage"
          id="contactForm"
          noValidate="novalidate"
          action={process.env.NEXT_PUBLIC_EMAIL_REST_API}
        >
          <div className="control-group">
            <div className="form-group floating-label-form-group controls mb-0 pb-2">
              <label>Nombre</label>
              <input
                className="form-control"
                id="name"
                type="text"
                placeholder="Nombre"
                required="required"
                data-validation-required-message="Ponga tu Nombre"
              />
              <p className="help-block text-danger"></p>
            </div>
          </div>
          <div className="control-group">
            <div className="form-group floating-label-form-group controls mb-0 pb-2">
              <label>Correo</label>
              <input
                className="form-control"
                id="email"
                type="email"
                placeholder="Email / Correo "
                required="required"
                data-validation-required-message="Ponga tu correo"
              />
              <p className="help-block text-danger"></p>
            </div>
          </div>
          <div className="control-group">
            <div className="form-group floating-label-form-group controls mb-0 pb-2">
              <label>Numero Telefono</label>
              <input
                className="form-control"
                id="phone"
                type="tel"
                placeholder="Numero Telefono"
                required="required"
                data-validation-required-message="Ponga tu numero cellular."
              />
              <p className="help-block text-danger"></p>
            </div>
          </div>
          <div className="control-group">
            <div className="form-group floating-label-form-group controls mb-0 pb-2">
              <label>Mensaje</label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                placeholder="Mensaje"
                required="required"
                data-validation-required-message="Escriba un Mensaje."
              ></textarea>
              <p className="help-block text-danger"></p>
            </div>
          </div>
          <br />
          <div id="success"></div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary btn-xl"
              id="sendMessageButton"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
