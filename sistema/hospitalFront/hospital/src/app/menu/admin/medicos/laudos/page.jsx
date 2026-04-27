"use client";

import { useState } from "react";
import NavBar from "../../../../layouts/NavBar";

const initialForm = {
  tipoLaudo: "",
  descricao: "",
  idPaciente: "",
  idMedico: "",
  dataLaudo: "",
};

export default function LaudosPage() {
  const [form, setForm] = useState(initialForm);
  const [laudos, setLaudos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const camposObrigatorios = Object.values(form).some(
      (valor) => !valor.trim(),
    );

    if (camposObrigatorios) {
      setMensagem("Preencha todos os campos para criar o laudo.");
      return;
    }

    setLaudos((currentLaudos) => [
      {
        id: crypto.randomUUID(),
        ...form,
      },
      ...currentLaudos,
    ]);

    setForm(initialForm);
    setMensagem("Laudo criado com sucesso.");
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#e2e8f0_0%,#f8fafc_46%,#dbeafe_100%)] px-4 py-8 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <NavBar
          itensMenu={[
            { href: "/menu/medicos", label: "Home", ativo: false },
            {
              href: "/menu/medicos/consultas",
              label: "Consultas",
              ativo: false,
            },
            {
              href: "/menu/medicos/procedimentos",
              label: "Procedimentos",
              ativo: false,
            },
            { href: "/menu/medicos/kits", label: "Kits", ativo: false },
          ]}
        />

        <section className="flex justify-center">
          <div className="w-full max-w-2xl rounded-[28px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur mt-10">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
              Documentação médica
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Criar laudo
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Registre um novo laudo médico com as informações necessárias para
              documentação e consultas futuras.
            </p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="tipoLaudo"
                  className="mb-1 block text-sm font-medium"
                >
                  Tipo de laudo
                </label>
                <input
                  id="tipoLaudo"
                  name="tipoLaudo"
                  type="text"
                  value={form.tipoLaudo}
                  onChange={handleChange}
                  placeholder="Ex: Radiografia, Ultrassom, Análise clínica"
                  autoComplete="off"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="descricao"
                  className="mb-1 block text-sm font-medium"
                >
                  Descrição do laudo
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={form.descricao}
                  onChange={handleChange}
                  placeholder="Descreva os achados e conclusões do laudo"
                  autoComplete="off"
                  rows="4"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900 resize-none"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="idPaciente"
                    className="mb-1 block text-sm font-medium"
                  >
                    ID do paciente
                  </label>
                  <input
                    id="idPaciente"
                    name="idPaciente"
                    type="text"
                    value={form.idPaciente}
                    onChange={handleChange}
                    placeholder="Id do paciente"
                    autoComplete="off"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="idMedico"
                    className="mb-1 block text-sm font-medium"
                  >
                    ID do médico responsável
                  </label>
                  <input
                    id="idMedico"
                    name="idMedico"
                    type="text"
                    value={form.idMedico}
                    onChange={handleChange}
                    placeholder="Id do médico responsável"
                    autoComplete="off"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="dataLaudo"
                  className="mb-1 block text-sm font-medium"
                >
                  Data do laudo
                </label>
                <input
                  id="dataLaudo"
                  name="dataLaudo"
                  type="date"
                  value={form.dataLaudo}
                  onChange={handleChange}
                  autoComplete="off"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </div>

              {mensagem ? (
                <p className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
                  {mensagem}
                </p>
              ) : null}

              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-700"
              >
                Criar laudo
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
