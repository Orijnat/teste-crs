"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const AuthMiddleware = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const lastCheckedPath = useRef(null);

  useEffect(() => {
    if (lastCheckedPath.current === pathname) return;
    lastCheckedPath.current = pathname;

    const checkPermission = () => {
      setLoading(true);
      const token = localStorage.getItem("hospital-token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userProfile = decodedToken.idperfil;

        const profileRoutes = {
          1: "/menu/admin",
          2: "/menu/medicos",
          3: "/menu/enfermeiros",
          4: "/menu/pacientes",
        };

        const baseRouteForProfile = profileRoutes[userProfile];

        if (baseRouteForProfile && pathname.startsWith(baseRouteForProfile)) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
          toast.error("Acesso negado para esta área.");
          router.push(baseRouteForProfile || "/login");
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        toast.error("Sessão inválida. Por favor, faça login novamente.");
        localStorage.removeItem("hospital-token");
        setAuthorized(false);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkPermission();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return authorized ? children : null;
};

export default AuthMiddleware;