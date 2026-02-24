import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Heading from "./Heading";

export default function Contact() {
  const [response, setResponse] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  // Destructure functions and states from useForm
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  // Submit handler
  async function submitForm(data) {
    setSubmitError(null);

    // 1. Time-based bot check (submitted too quickly)
    if (startTimeRef.current) {
      const timeElapsed = Date.now() - startTimeRef.current;
      if (timeElapsed < 3000) {
        setSubmitError("Form submitted too quickly. Please try again.");
        return;
      }
    }

    // 2. Honeypot check (client-side)
    if (data.website && data.website.trim() !== "") {
      console.warn("[Contact Form] Spam detected by honeypot field.");
      setResponse(true);
      return;
    }

    // 3. Math challenge check
    if (parseInt(data.mathChallenge, 10) !== 7) {
      setSubmitError("Incorrect answer to the security question.");
      return;
    }

    // 4. URL pattern check in name
    const urlRegex = /(http:\/\/|https:\/\/|www\.)/i;
    if (urlRegex.test(data["your-name"])) {
      setSubmitError("Invalid characters detected in name field.");
      return;
    }

    console.log("[Contact Form] Starting form submission with data:", {
      name: data["your-name"],
      email: data["your-email"],
      messageLength: data["your-message"]?.length,
    });

    try {
      console.log("[Contact Form] Sending request to Netlify function...");
      const response = await axios.post("/.netlify/functions/send-email", {
        "your-name": data["your-name"],
        "your-email": data["your-email"],
        "your-message": data["your-message"],
        website: data.website || "",
        mathChallenge: data.mathChallenge,
      });

      console.log("[Contact Form] Response received:", {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      });
      setResponse(true); // Show "ENVIADO" message
    } catch (error) {
      console.error("[Contact Form] Error details:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        stack: error.stack,
      });
      setSubmitError("Error sending message. Please try again.");
    }
  }

  return (
    <section
      className="dark:bg-darkBlue3 bg-alt2 bg-no-repeat bg-right-bottom bg-araucaria"
      id="contacto"
    >
      <Heading text="Contacto" />
      <div className="container mx-auto my-1 py-1">
        <div className="w-full max-w-2xl mx-auto my-2">
          <div className="p-6 border rounded-md">
            {response ? (
              <h2 className="p-6 text-5xl text-red-600 text-center font-extrabold">
                ENVIADO
              </h2>
            ) : (
              <form onSubmit={handleSubmit(submitForm)}>
                {/* Honeypot field - hidden from real users, filled by bots */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    autoComplete="off"
                    {...register("website")}
                  />
                </div>
                <label className="block mb-6">
                  <span>Tu Nombre</span>
                  <input
                    type="text"
                    placeholder="Pedro RiosLibres"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm p-2 px-3 dark:text-white dark:bg-darkGrayishBlue"
                    {...register("your-name", { required: true, minLength: 3 })}
                  />
                </label>
                <label className="block mb-6">
                  <span>Correo</span>
                  <input
                    type="email"
                    placeholder="juan.pedro@gmail.com"
                    className="p-2 px-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm dark:text-white dark:bg-darkGrayishBlue"
                    {...register("your-email", {
                      required: "Please enter your email",
                    })}
                  />
                </label>
                <label className="block mb-6">
                  <span>Mensaje</span>
                  <textarea
                    rows="3"
                    placeholder="Cuenta nos que estas pensando..."
                    className="dark:text-white dark:bg-darkGrayishBlue p-2 px-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                    {...register("your-message", {
                      required: true,
                      minLength: 5,
                    })}
                  ></textarea>
                </label>
                <label className="block mb-6">
                  <span>¿Cuánto es 3 + 4? (verificación de seguridad)</span>
                  <input
                    type="number"
                    placeholder="7"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm p-2 px-3 dark:text-white dark:bg-darkGrayishBlue"
                    {...register("mathChallenge", { required: true })}
                  />
                </label>
                {submitError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                    {submitError}
                  </div>
                )}
                <div className="mb-2">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg hover:bg-indigo-800 transition ease-in-out duration-150"
                  >
                    {isSubmitting && (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    Manda Correo
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
