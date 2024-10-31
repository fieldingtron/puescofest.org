export default function ButtonTicket({ text }) {
  return (
    <div className="mt-6 flex justify-center ">
      <a
        href="https://goldenpass.cl/puesco-fest-2024-roots-kayak/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-md p-6 text-2xl font-extrabold text-white bg-green-500 rounded-lg shadow-md border-2 border-green-500 hover:bg-green-600 hover:text-white uppercase tracking-widest text-center"
      >
        &gt;&gt; {text} &lt;&lt;
      </a>
    </div>
  );
}
