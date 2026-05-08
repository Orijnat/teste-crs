import AuthMiddleware from "@/middlewares/Auth";


export default function MenuLayout({ children }) {
  return (
    <AuthMiddleware>
        <main>
          {children}
        </main>
    </AuthMiddleware>
  );
}