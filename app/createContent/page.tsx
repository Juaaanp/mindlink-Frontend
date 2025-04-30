import CreateContentForm from "@/components/ContentComponents/CreateContentForm";
import NavBarAuth from "@/components/NavBarAuth";


export default function createContentPage() {
  return (
    <div>
      <header>
        <NavBarAuth />
      </header>
      <main className="flex-grow flex items-center justify-center pt-20">
        {/* Contenedor que alinea el formulario y el logo */}
        <div className="flex w-full max-w-5xl items-center justify-between">
          {/* Formulario a la izquierda */}
          <div className="w-1/2">
            <CreateContentForm />
          </div>

          {/* Logo del libro abierto a la derecha */}
          <div className="w-1/2 flex justify-end">
          </div>
        </div>
      </main>
    </div>
  );
}
