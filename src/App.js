import AppRouter from "components/routing/routers/AppRouter";
import { useEffect } from "react";
/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  useEffect(() => {
    const handleUnload = (event) => {
      event.preventDefault();
      localStorage.removeItem("token");
    };

    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  return (
    <div>
      <AppRouter />
    </div>
  );
};

export default App;
