import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { loginAdmin } from "@/lib/adminAuth";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const role = loginAdmin(password);
    if (role) {
      navigate("/admin");
    } else {
      setError("Senha incorreta");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-dark to-brown-graphite flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brown-caramel/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-brown-caramel" />
          </div>
          <h1 className="text-2xl font-heading text-brown-dark mb-2">Painel Admin</h1>
          <p className="text-sm font-body text-brown-medium">Boaventura | Consórcios</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-body font-semibold text-brown-dark mb-2">
              Senha
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Digite sua senha"
              className="h-11 border-brown-caramel/20 font-body"
              autoFocus
            />
          </div>

          {error && <p className="text-sm text-red-600 font-body">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-brown-caramel hover:bg-brown-medium text-white rounded-lg py-2 font-heading font-semibold"
          >
            Acessar
          </Button>
        </form>
      </div>
    </div>
  );
}