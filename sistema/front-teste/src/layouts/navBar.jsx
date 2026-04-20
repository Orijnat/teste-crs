
export default function NavBar() {
    return(
        
    <nav className="bg-neutral-primary fixed w-full z-20 top-0 inset-s-0 border-b border-default bg-[#5C4B51]">
            <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="http://localhost:3000/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/WhatsApp.jpeg" className="w-50 h-20" alt="Flowbite Logo" />
                <span className="self-center text-xl text-heading font-semibold whitespace-nowrap text-black">Aiiii Pedro Polli</span>
            </a>
            <button 
                data-collapse-toggle="navbar-default" 
                type="button" 
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" 
                aria-controls="navbar-default" 
                aria-expanded="false"
            >
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
                </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                <li>
                    <a href="./teste/" className="block py-2 px-3 text-black bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">
                    Ver Tarefas
                    </a>
                </li>
                </ul>
            </div>
            </div>
        </nav>
    );
}