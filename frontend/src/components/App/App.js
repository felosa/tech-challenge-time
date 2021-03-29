import { AuthProvider } from "../../context/auth/auth";
import { useAuth } from "../../hooks/useAuth";
import Routes from "../../routes/routes";
import "./App.css";

export function App() {
  const { user, login, loading, logout } = useAuth();

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user, login, logout }}>
        <Routes />
      </AuthProvider>
    </div>
  );
}
