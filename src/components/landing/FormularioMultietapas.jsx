import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Check, Car, Home, TrendingUp, Bike, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

const WHATSAPP_NUMBER = "5571992764466";

const OBJETIVOS = [
  { value: "carro", label: "Carro", icon: Car },
  { value: "imovel", label: "Imóvel", icon: Home },
  { value: "investimento", label: "Investimento", icon: TrendingUp },
  { value: "moto", label: "Moto", icon: Bike }
];

const FAIXAS = [
  { value: "ate_80mil", label: "Até R$ 80 mil" },
  { value: "80_a_150mil", label: "R$ 80 mil a R$ 150 mil" },
  { value: "150_a_300mil", label: "R$ 150 mil a R$ 300 mil" },
  { value: "acima_300mil", label: "Acima de R$ 300 mil" }
];

const PRAZOS = [
  { value: "o_quanto_antes", label: "O quanto antes" },
  { value: "proximos_3_meses", label: "Próximos 3 meses" },
  { value: "proximos_6_meses", label: "Próximos 6 meses" },
  { value: "so_pesquisando", label: "Só pesquisando" }
];

const CONHECIMENTO = [
  { value: "ja_conheco", label: "Já conheço" },
  { value: "conheco_pouco", label: "Conheço pouco" },
  { value: "quero_entender", label: "Quero entender melhor" }
];

function SelectOption({ options, value, onChange, cols = 2 }) {
  return (
    <div className={`grid gap-3 ${cols === 4 ? "grid-cols-2" : cols === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
      {options.map((opt, idx) => (
        <motion.button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`p-3 rounded-2xl border-2 text-center transition-all duration-200 font-body text-sm font-medium group ${
            value === opt.value
              ? "border-blue-accent bg-gradient-to-br from-blue-accent/20 to-blue-accent/5 text-brown-dark shadow-lg shadow-blue-accent/20"
              : "border-brown-caramel/20 hover:border-brown-caramel/50 text-brown-graphite hover:bg-brown-caramel/5"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            {opt.icon && (
              <motion.div
                animate={value === opt.value ? { scale: 1.1 } : { scale: 1 }}
              >
                <opt.icon className={`w-5 h-5 transition-colors ${value === opt.value ? "text-blue-accent" : "text-brown-medium group-hover:text-brown-caramel"}`} />
              </motion.div>
            )}
            <span className="leading-tight">{opt.label}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

export default function FormularioMultietapas() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    objetivo: "",
    faixa_credito: "",
    prazo: "",
    conhecimento: ""
  });

  const [whatsappError, setWhatsappError] = useState("");

  const { data: imagens = [] } = useQuery({
    queryKey: ["imagensCarrossel"],
    queryFn: () => base44.entities.ImagemCarrossel.list("ordem", 100),
  });

  useEffect(() => {
    if (imagens.length > 0) {
      const interval = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % imagens.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [imagens.length]);

  const totalSteps = 3;

  const validateWhatsapp = (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length === 13 && cleaned.startsWith("55");
  };

  const handleWhatsappChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    
    if (value.length > 13) {
      value = value.slice(0, 13);
    }
    
    if (value.length > 0 && !value.startsWith("55")) {
      value = "55" + value.slice(0, 11);
    }
    
    const formatted = value.length > 0 ? "+55 " + value.slice(2) : "";
    setForm({ ...form, whatsapp: formatted });
    
    if (formatted.trim() && formatted.length > 5) {
      setWhatsappError(validateWhatsapp(formatted) ? "" : "Número inválido. Digite DDD + 9 dígitos");
    } else {
      setWhatsappError("");
    }
  };

  const canNext = () => {
    if (step === 0) return form.nome.trim() && form.whatsapp.trim() && validateWhatsapp(form.whatsapp);
    if (step === 1) return !!form.objetivo;
    if (step === 2) return form.faixa_credito && form.prazo && form.conhecimento;
    return false;
  };

  const getObjetivoLabel = (v) => OBJETIVOS.find(o => o.value === v)?.label || v;
  const getFaixaLabel = (v) => FAIXAS.find(o => o.value === v)?.label || v;
  const getPrazoLabel = (v) => PRAZOS.find(o => o.value === v)?.label || v;
  const getConhecimentoLabel = (v) => CONHECIMENTO.find(o => o.value === v)?.label || v;

  const handleSubmit = async () => {
    setLoading(true);
    const isComplete = form.nome && form.whatsapp && form.objetivo && form.faixa_credito && form.prazo && form.conhecimento;
    await base44.entities.Lead.create({
      nome: form.nome,
      whatsapp: form.whatsapp,
      objetivo: form.objetivo,
      faixa_credito: form.faixa_credito,
      prazo: form.prazo,
      conhecimento: form.conhecimento,
      status: "novo",
      completude: isComplete ? "completo" : "incompleto"
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'form_sucesso' });

    setDone(true);
    setLoading(false);

    const msg = encodeURIComponent(
      `Olá, meu nome é ${form.nome}. Acabei de preencher o formulário no site da Boaventura | Consórcios.\n\nMeu interesse é em: ${getObjetivoLabel(form.objetivo)}\nFaixa de crédito: ${getFaixaLabel(form.faixa_credito)}\nPrazo: ${getPrazoLabel(form.prazo)}\nConhecimento sobre consórcio: ${getConhecimentoLabel(form.conhecimento)}\n\nQuero falar com um atendente.`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    }, 1500);
  };

  if (done) {
    return (
      <section id="formulario" className="py-20 md:py-28 bg-gradient-to-br from-brown-sand via-brown-sand to-blue-accent/5 relative overflow-hidden">
        <div className="max-w-xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-brown-caramel/30 to-blue-accent/20 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brown-caramel/20"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Check className="w-12 h-12 text-brown-caramel" strokeWidth={3} />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-3xl md:text-4xl font-heading text-brown-dark mb-4">Perfeito! Dados enviados.</h3>
            <p className="text-brown-medium font-body mb-8 text-lg leading-relaxed max-w-md mx-auto">
              Você será redirecionado para conversar com nosso time no WhatsApp.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-brown-caramel to-orange-500 hover:shadow-lg hover:shadow-brown-caramel/30 text-white rounded-full px-10 py-6 font-heading font-bold text-lg">
                    Abrir WhatsApp →
                  </Button>
                </motion.div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="py-8 md:py-12 bg-gradient-to-br from-brown-sand via-brown-sand to-blue-accent/5 relative overflow-hidden">
      {/* Decorative blobs */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute top-10 -right-20 w-40 h-40 rounded-full bg-blue-accent/8 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, delay: 1 }}
        className="absolute -bottom-10 -left-20 w-32 h-32 rounded-full bg-brown-caramel/8 blur-3xl"
      />

      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-heading font-bold text-brown-caramel tracking-widest uppercase mb-4"
          >
            ✨ Simulação em 2 minutos
          </motion.p>
          <h2 className="text-3xl md:text-5xl font-heading text-brown-dark mb-6 leading-tight">
            Descubra seu melhor <span className="text-transparent bg-clip-text bg-gradient-to-r from-brown-caramel to-blue-accent">consórcio</span>.
          </h2>
          <p className="text-brown-medium font-body text-lg">Sem compromisso, 100% gratuito.</p>
        </motion.div>

        {/* Main Container with Image + Form */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 lg:gap-10 items-stretch md:items-center"
        >
          {/* Left Side - Image Carousel */}
          <div className="hidden md:block relative">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="aspect-square bg-brown-sand/50">
                {imagens.length > 0 ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imageIndex}
                      src={imagens[imageIndex]?.url}
                      alt={imagens[imageIndex]?.tipo}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brown-medium font-body">
                    Carregando imagens...
                  </div>
                )}
              </div>

              {/* Carousel Controls */}
              {imagens.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                  <motion.button
                    onClick={() => setImageIndex((prev) => (prev - 1 + imagens.length) % imagens.length)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-brown-dark" />
                  </motion.button>
                  <motion.button
                    onClick={() => setImageIndex((prev) => (prev + 1) % imagens.length)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-brown-dark" />
                  </motion.button>
                </div>
              )}

              {/* Dots Indicator */}
              {imagens.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {imagens.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === imageIndex ? "bg-white w-8" : "bg-white/50"
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>
              )}
              
              {/* Overlay Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl p-5 shadow-xl border border-blue-accent/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brown-caramel to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-heading font-bold text-brown-dark text-sm">Análise em tempo real</p>
                    <p className="text-xs text-brown-medium font-body">Melhores opções para seu perfil</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Stats Side */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-brown-caramel/20"
            >
              <p className="text-2xl font-heading font-bold text-brown-dark">+2k</p>
              <p className="text-xs text-brown-medium font-body">Clientes satisfeitos</p>
            </motion.div>
          </div>

          {/* Right Side - Form */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-blue-accent/15 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-accent/10 to-transparent rounded-full -mr-20 -mt-20" />
              <div className="relative z-10">
                
                {/* Progress Bar */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <motion.p 
                      key={`step-label-${step}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm font-heading font-bold text-brown-dark"
                    >
                      {step === 0 && "📝 Seus dados"}
                      {step === 1 && "🎯 Seu objetivo"}
                      {step === 2 && "🚀 Detalhes finais"}
                    </motion.p>
                    <span className="text-xs font-heading font-bold px-3 py-1 bg-brown-caramel/10 text-brown-caramel rounded-full">
                      {step + 1}/{totalSteps}
                    </span>
                  </div>
                  <motion.div className="h-2 bg-brown-caramel/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brown-caramel via-blue-accent to-brown-caramel rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </motion.div>
                </motion.div>

                {/* Form Content */}
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div key="step0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-5">
                      <div>
                        <h3 className="text-2xl font-heading text-brown-dark mb-1">Vamos começar! 👋</h3>
                        <p className="text-brown-medium font-body text-sm">Como podemos encontrá-lo?</p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-brown-graphite font-heading font-semibold text-sm mb-2 block">Nome completo</Label>
                          <Input
                            value={form.nome}
                            onChange={(e) => setForm({ ...form, nome: e.target.value })}
                            placeholder="João Silva"
                            className="h-11 rounded-xl border-2 border-brown-caramel/20 focus:border-blue-accent focus:bg-blue-accent/5 font-body"
                          />
                        </div>
                        <div>
                          <Label className="text-brown-graphite font-heading font-semibold text-sm mb-2 block">WhatsApp</Label>
                          <Input
                            value={form.whatsapp}
                            onChange={handleWhatsappChange}
                            placeholder="+55 11 99999-9999"
                            className={`h-11 rounded-xl border-2 font-body transition-colors ${
                              whatsappError
                                ? "border-red-400 focus:border-red-500 focus:bg-red-50"
                                : "border-brown-caramel/20 focus:border-blue-accent focus:bg-blue-accent/5"
                            }`}
                          />
                          {whatsappError && <p className="text-xs text-red-500 mt-1">{whatsappError}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-5">
                      <div>
                        <h3 className="text-2xl font-heading text-brown-dark mb-1">Qual é seu objetivo?</h3>
                        <p className="text-brown-medium font-body text-sm">Escolha o tipo de consórcio.</p>
                      </div>
                      <SelectOption
                        options={OBJETIVOS}
                        value={form.objetivo}
                        onChange={(v) => setForm({ ...form, objetivo: v })}
                        cols={4}
                      />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-5">
                      <div>
                        <h3 className="text-2xl font-heading text-brown-dark mb-1">Quase lá! 🚀</h3>
                        <p className="text-brown-medium font-body text-sm">Últimas informações para personalizar.</p>
                      </div>

                      <div>
                        <Label className="text-brown-graphite font-heading font-semibold text-sm mb-2 block">Faixa de crédito</Label>
                        <SelectOption options={FAIXAS} value={form.faixa_credito} onChange={(v) => setForm({ ...form, faixa_credito: v })} />
                      </div>

                      <div>
                        <Label className="text-brown-graphite font-heading font-semibold text-sm mb-2 block">Para quando?</Label>
                        <SelectOption options={PRAZOS} value={form.prazo} onChange={(v) => setForm({ ...form, prazo: v })} />
                      </div>

                      <div>
                        <Label className="text-brown-graphite font-heading font-semibold text-sm mb-2 block">Conhece consórcio?</Label>
                        <SelectOption options={CONHECIMENTO} value={form.conhecimento} onChange={(v) => setForm({ ...form, conhecimento: v })} cols={3} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-10 pt-8 border-t border-brown-caramel/10">
                  {step > 0 ? (
                    <motion.button
                      onClick={() => setStep(step - 1)}
                      whileHover={{ x: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-brown-medium hover:text-brown-dark font-heading font-semibold transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Voltar
                    </motion.button>
                  ) : <div />}

                  {step < totalSteps - 1 ? (
                    <motion.div
                      whileHover={canNext() ? { scale: 1.05 } : {}}
                      whileTap={canNext() ? { scale: 0.95 } : {}}
                    >
                      <Button
                        onClick={() => setStep(step + 1)}
                        disabled={!canNext()}
                        className="bg-gradient-to-r from-brown-caramel to-orange-500 hover:shadow-lg hover:shadow-brown-caramel/30 text-white rounded-full px-6 py-4 font-heading font-bold gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        Continuar
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={canNext() ? { scale: 1.05 } : {}}
                      whileTap={canNext() ? { scale: 0.95 } : {}}
                    >
                      <Button
                        onClick={handleSubmit}
                        disabled={!canNext() || loading}
                        className="bg-gradient-to-r from-brown-caramel via-orange-500 to-brown-caramel hover:shadow-lg hover:shadow-brown-caramel/30 text-white rounded-full px-6 py-4 font-heading font-bold gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Enviando
                          </>
                        ) : (
                          <>
                            ✓ Enviar
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}