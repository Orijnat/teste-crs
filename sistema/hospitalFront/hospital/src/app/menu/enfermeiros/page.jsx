import NavBar from "../../../layouts/NavBar";
import Image from "next/image";

export default function MenuPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overf
    w-hidden bg-slate-200 px-4 text-slate-900">
      
      <div className="absolute inset-0 bg-white/20 z-0" />

      
      <div className="z-10 w-full max-w-7xl">
        <NavBar
          itensMenu={[
            { label: "Home", href: "/menu/enfermeiros", ativo: true },
            { label: "Triagem", href: "/menu/enfermeiros/triagem", ativo: false },
            { label: "Procedimentos", href: "/menu/enfermeiros/procedimentos", ativo: false}, 
            { label: "Kits", href: "/menu/enfermeiros/kits", ativo: false},
            { label: "Medicamentos", href: "/menu/enfermeiros/medicamentos", ativo: false},
          ]}
        />
        

        <div className="text-center mt-10">
            <h1 className="text-3xl font-bold">Bem-vindo selecione no menu a operacao que deseja realizar</h1>
        </div>
      </div>
    </main>
  );
}