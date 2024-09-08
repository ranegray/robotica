export default function Footer() {
  return (
    <footer className="bg-slate-800 p-4 text-white">
      <div className="mx-auto flex max-w-screen-lg gap-5">
        <p>
          Built by{" "}
          <a
            className="underline hover:text-zinc-300"
            target="_blank"
            href="https://ranegray.dev"
          >
            ranegray.dev
          </a>
        </p>
      </div>
    </footer>
  );
}
