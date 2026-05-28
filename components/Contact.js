import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Heading from "./Heading";

export default function Contact() {
  const [response, setResponse] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [renderTimestamp, setRenderTimestamp] = useState(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // Destructure functions and states from useForm
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  // Record when the form was rendered (used for timing-based spam detection)
  useEffect(() => {
    setRenderTimestamp(Date.now());
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey) return;

    const renderWidget = () => {
      if (
        typeof window === "undefined" ||
        !window.turnstile ||
        !turnstileContainerRef.current ||
        turnstileWidgetIdRef.current !== null
      ) {
        return;
      }

      turnstileWidgetIdRef.current = window.turnstile.render(
        turnstileContainerRef.current,
        {
          sitekey: turnstileSiteKey,
          callback: (token) => {
            setValue("turnstileToken", token, { shouldValidate: true });
          },
          "expired-callback": () => {
            setValue("turnstileToken", "", { shouldValidate: true });
          },
          "error-callback": () => {
            setValue("turnstileToken", "", { shouldValidate: true });
          },
        }
      );

      setTurnstileReady(true);
    };

    if (window.turnstile) {
      renderWidget();
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", renderWidget, { once: true });
      return () => {
        existingScript.removeEventListener("load", renderWidget);
      };
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", renderWidget, { once: true });
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", renderWidget);
    };
  }, [setValue, turnstileSiteKey]);

  // Submit handler
  async function submitForm(data) {
    setSubmitError(null);

    // Client-side honeypot check — silently "succeed" to fool bots
    if (data.website && data.website.trim() !== "") {
      console.warn("[Contact Form] Spam detected by honeypot field.");
      setResponse(true);
      return;
    }

    // Client-side math challenge check
    if (parseInt(data.mathChallenge, 10) !== 7) {
      setSubmitError("Incorrect answer to the security question.");
      return;
    }

    // Client-side URL pattern check in name
    const urlRegex = /(http:\/\/|https:\/\/|www\.)/i;
    if (urlRegex.test(data["your-name"])) {
      setSubmitError("Invalid characters detected in name field.");
      return;
    }

    if (turnstileSiteKey && !data.turnstileToken) {
      setSubmitError("Please complete the anti-spam verification.");
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
        honeypot: data.website || "",
        mathChallenge: data.mathChallenge,
        turnstileToken: data.turnstileToken || "",
        renderTimestamp, // form render time for server-side timing check
      });

      console.log("[Contact Form] Response received:", {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      });
      setResponse(true); // Show "ENVIADO" message
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      console.error("[Contact Form] Error details:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        stack: error.stack,
      });
      if (backendMessage === "Anti-spam verification failed") {
        setSubmitError(
          "Anti-spam verification failed. Please retry the verification and submit again."
        );
      } else {
        setSubmitError("Error sending message. Please try again.");
      }
      if (window.turnstile && turnstileWidgetIdRef.current !== null) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
      setValue("turnstileToken", "", { shouldValidate: true });
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
                <input type="hidden" {...register("turnstileToken")} />
                {/* Honeypot field — hidden from real users, bots will fill it */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    top: "-9999px",
                    opacity: 0,
                    height: 0,
                    overflow: "hidden",
                    tabIndex: -1,
                  }}
                >
                  <label>
                    Website
                    <input
                      type="text"
                      autoComplete="off"
                      tabIndex={-1}
                      {...register("website")}
                    />
                  </label>
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
                {turnstileSiteKey && (
                  <div className="block mb-6">
                    <span className="block mb-2 text-sm">
                      Verificacion anti-spam
                    </span>
                    <div ref={turnstileContainerRef} />
                    {!turnstileReady && (
                      <p className="mt-2 text-sm text-gray-500">
                        Cargando verificacion...
                      </p>
                    )}
                  </div>
                )}
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
