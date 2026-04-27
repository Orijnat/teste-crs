import Image from "next/image";
import NavBar from "../layouts/navBar";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-fundo-pagina">
      <NavBar
        itensMenu={[
          { href: "/tarefas", label: "Tarefas", ativo: true },
          ]}
      />

      <section className="mx-auto flex w-full max-w-7xl px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl rounded-3xl bg-fundo-tabela p-8 text-textos shadow-xl">
          <h1 className="text-2xl font-bold">Bem-vindo</h1>

          <div className="mt-8 flex w-full flex-col items-start gap-4 sm:w-auto">
            <a
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-botao-confirmar px-5 font-semibold text-white transition-colors hover:bg-[#BD4B4B]"
              href="https://www.youtube.com/watch?v=Wu3Y_v8JeE8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Como conservar seu ps2
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}