'use client';
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

export default function NavBar({ itensMenu = [] }) {
  const [sidebarAberta, setSidebarAberta] = useState(false);

  return (
    <div className="block">
      <nav className="fixed inset-x-0 top-0 z-20 border-b border-black/10 bg-azul-unochapeco">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="http://localhost:3000/" className="flex items-center gap-3">
            <Image src="/WhatsApp.jpeg" width={50} height={20} alt="Logo" />
            <span className="whitespace-nowrap text-xl font-semibold text-black">Aiiii Pedro Polli</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSidebarAberta(true)}
              className="rounded-md border bg-orange-600 border-black/20 px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-orange-400"
              aria-label="Abrir menu"
            >
              Menu
            </button>

          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-30 bg-slate-900/35 transition-opacity duration-300 ${
          sidebarAberta ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarAberta(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white p-5 transition-transform duration-300 ease-in-out ${
          sidebarAberta ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Menu lateral"
      >
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <p className="text-lg font-semibold text-slate-900">Menu</p>
          <button
            type="button"
            onClick={() => setSidebarAberta(false)}
            className="rounded-md border border-slate-200 p-2 text-slate-700 transition duration-150 hover:bg-slate-50"
            aria-label="Fechar menu"
          >
            <IoMdClose className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-1 text-sm font-medium">
          {itensMenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarAberta(false)}
              className={`flex items-center rounded-lg px-3 py-2 transition-colors ${
                item.ativo ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}



