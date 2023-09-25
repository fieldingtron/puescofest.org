import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { FormData } from "formdata-node";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Contact() {
  //console.log(process.env.NEXT_PUBLIC_EMAIL_REST_API);
  //console.log("hello");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [response, setResponse] = useState(false);

  const { handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  return (
    <section
      className="dark:bg-darkBlue3
    bg-teal-500/50   bg-no-repeat bg-right-bottom"
      style={{ backgroundImage: `url("/images/araucarias1_bckgr.png")` }}
      id="contact"
    >
      <div className="container mx-auto my-4 py-5">
        <div className="w-full max-w-2xl mx-auto my-5">
          <div className="p-6 border  rounded-md">
            <form method="POST" action="https://herotofu.com/start">
              <label className="block mb-6">
                <span className="">Tu Nombre</span>
                <input
                  type="text"
                  name="name"
                  className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                  placeholder="Pedro RiosLibres"
                />
              </label>
              <label className="block mb-6">
                <span className=" ">Correo</span>
                <input
                  name="email"
                  type="email"
                  className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                  placeholder="juan.pedro@gmail.com"
                  required
                />
              </label>
              <label className="block mb-6">
                <span className=" ">Mensaje</span>
                <textarea
                  name="message"
                  className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                  rows="3"
                  placeholder="Cuenta nos que estas pensando..."
                ></textarea>
              </label>
              <div className="mb-6">
                <button
                  type="submit"
                  className="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
                >
                  Manda Correo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
