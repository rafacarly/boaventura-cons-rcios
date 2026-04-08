import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Check, Car, Home, TrendingUp, Bike, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

const WHATSAPP_NUMBER = "5511999999999";

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

const LANCE = [
  { value: "sim", label: "Sim" },
  { value: "talvez", label: "Talvez" },
  { value: "nao", label: "Não" }
];

const MOMENTO = [
  { value: "contratar_logo", label: "Quero contratar logo" },
  { value: "analisando", label: "Estou analisando" },
  { value: "so_pesquisando", label: "Só pesquisando" }
];

function SelectOption({ options, value, onChange, cols = 2 }) {
  return (
    <div className={`grid gap-3 ${cols === 4 ? "grid-cols-2 sm:grid-cols-4" : cols === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
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
          className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 font-body text-sm font-medium group ${
            value === opt.value
              ? "border-blue-accent bg-gradient-to-br from-blue-accent/20 to-blue-accent/5 text-brown-dark shadow-lg shadow-blue-accent/20"
              : "border-brown-caramel/20 hover:border-brown-caramel/50 text-brown-graphite hover:bg-brown-caramel/5"
          }`}
        >
          <div className="flex items-center gap-3">
            {opt.icon && (
              <motion.div
                animate={value === opt.value ? { scale: 1.1 } : { scale: 1 }}
              >
                <opt.icon className={`w-5 h-5 transition-colors ${value === opt.value ? "text-blue-accent" : "text-brown-medium group-hover:text-brown-caramel"}`} />
              </motion.div>
            )}
            <span>{opt.label}</span>
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
  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    objetivo: "",
    faixa_credito: "",
    prazo: "",
    conhecimento: "",
    lance: "",
    momento: ""
  });

  const totalSteps = 3;

  const canNext = () => {
    if (step === 0) return form.nome.trim() && form.whatsapp.trim();
    if (step === 1) return !!form.objetivo;
    if (step === 2) return form.faixa_credito && form.prazo && form.conhecimento && form.lance && form.momento;
    return false;
  };

  const getObjetivoLabel = (v) => OBJETIVOS.find(o => o.value === v)?.label || v;
  const getFaixaLabel = (v) => FAIXAS.find(o => o.value === v)?.label || v;
  const getPrazoLabel = (v) => PRAZOS.find(o => o.value === v)?.label || v;
  const getConhecimentoLabel = (v) => CONHECIMENTO.find(o => o.value === v)?.label || v;
  const getLanceLabel = (v) => LANCE.find(o => o.value === v)?.label || v;
  const getMomentoLabel = (v) => MOMENTO.find(o => o.value === v)?.label || v;

  const handleSubmit = async () => {
    setLoading(true);
    await base44.entities.Lead.create({
      nome: form.nome,
      whatsapp: form.whatsapp,
      objetivo: form.objetivo,
      faixa_credito: form.faixa_credito,
      prazo: form.prazo,
      conhecimento: form.conhecimento,
      lance: form.lance,
      momento: form.momento,
      status: "novo"
    });

    setDone(true);
    setLoading(false);

    const msg = encodeURIComponent(
      `Olá, meu nome é ${form.nome}. Acabei de preencher o formulário no site da Boaventura | Consórcios.\n\nMeu interesse é em: ${getObjetivoLabel(form.objetivo)}\nFaixa de crédito: ${getFaixaLabel(form.faixa_credito)}\nPrazo: ${getPrazoLabel(form.prazo)}\nConhecimento sobre consórcio: ${getConhecimentoLabel(form.conhecimento)}\nInteresse em lance: ${getLanceLabel(form.lance)}\nMomento: ${getMomentoLabel(form.momento)}\n\nQuero falar com um atendente.`
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
    <section id="formulario" className="py-20 md:py-28 bg-gradient-to-br from-brown-sand via-brown-sand to-blue-accent/5 relative overflow-hidden">
      {/* Decorative blobs */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute top-20 right-10 w-40 h-40 rounded-full bg-blue-accent/8 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, delay: 1 }}
        className="absolute bottom-32 left-10 w-32 h-32 rounded-full bg-brown-caramel/8 blur-3xl"
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-heading font-bold text-brown-caramel tracking-widest uppercase mb-3"
          >
            ✨ Simulação em 2 minutos
          </motion.p>
          <h2 className="text-3xl md:text-5xl font-heading text-brown-dark mb-4 leading-tight">
            Descubra seu melhor <span className="text-transparent bg-clip-text bg-gradient-to-r from-brown-caramel to-blue-accent">consórcio</span>.
          </h2>
          <p className="text-brown-medium font-body text-lg">Sem compromisso, 100% gratuito.</p>
        </motion.div>

        {/* Enhanced Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  animate={{
                    scale: i === step ? 1.15 : 1,
                    boxShadow: i === step ? "0 0 20px rgba(249, 130, 39, 0.4)" : "0 0 0px rgba(0,0,0,0)"
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-heading font-bold transition-all ${
                    i <= step ? "bg-gradient-to-br from-brown-caramel to-orange-500 text-white" : "bg-brown-caramel/10 text-brown-medium"
                  }`}
                >
                  {i < step ? <Check className="w-5 h-5" /> : i + 1}
                </motion.div>
                {i < totalSteps - 1 && (
                  <motion.div
                    className={`h-1 rounded transition-all ${i < step ? "bg-brown-caramel" : "bg-brown-caramel/15"}`}
                    animate={{
                      width: i < step ? 80 : 48,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
          <motion.p 
            key={`step-${step}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-brown-medium font-body mt-4"
          >
            {step === 0 && "Primeiramente, seus dados de contato"}
            {step === 1 && "Agora, qual é seu objetivo?"}
            {step === 2 && "Quase lá! Últimas informações para personalizar"}
          </motion.p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-blue-accent/15 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-accent/10 to-transparent rounded-full -mr-20 -mt-20" />
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-6">
                  <div className="mb-8">
                    <h3 className="text-2xl font-heading text-brown-dark mb-2">Vamos começar! 👋</h3>
                    <p className="text-brown-medium font-body">Nos diga como podemos encontrá-lo.</p>
                  </div>
                  <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                    <div>
                      <Label className="text-brown-graphite font-heading font-semibold text-sm mb-2 block">Seu nome completo</Label>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          value={form.nome}
                          onChange={(e) => setForm({ ...form, nome: e.target.value })}
                          placeholder="Ex: João Silva"
                          className="h-12 rounded-xl border-2 border-brown-caramel/20 focus:border-blue-accent focus:bg-blue-accent/5 font-body text-base"
                        />
                      </motion.div>
                    </div>
                    <div>
                      <Label className="text-brown-graphite font-heading font-semibold text-sm mb-2 block">WhatsApp</Label>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          value={form.whatsapp}
                          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                          placeholder="(11) 99999-9999"
                          className="h-12 rounded-xl border-2 border-brown-caramel/20 focus:border-blue-accent focus:bg-blue-accent/5 font-body text-base"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-6">
                  <div className="mb-8">
                    <h3 className="text-2xl font-heading text-brown-dark mb-2">Qual é seu objetivo? 🎯</h3>
                    <p className="text-brown-medium font-body">Escolha o tipo de consórcio que te interessa.</p>
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
                <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-6">
                  <div className="mb-8">
                    <h3 className="text-2xl font-heading text-brown-dark mb-2">Quase lá! 🚀</h3>
                    <p className="text-brown-medium font-body">Alguns detalhes para personalizar o melhor plano.</p>
                  </div>

                  <div>
                    <Label className="text-brown-graphite font-heading font-semibold text-sm mb-3 block">Faixa de crédito desejada</Label>
                    <SelectOption options={FAIXAS} value={form.faixa_credito} onChange={(v) => setForm({ ...form, faixa_credito: v })} />
                  </div>

                  <div>
                    <Label className="text-brown-graphite font-heading font-semibold text-sm mb-3 block">Para quando você precisa?</Label>
                    <SelectOption options={PRAZOS} value={form.prazo} onChange={(v) => setForm({ ...form, prazo: v })} />
                  </div>

                  <div>
                    <Label className="text-brown-graphite font-heading font-semibold text-sm mb-3 block">Você conhece consórcio?</Label>
                    <SelectOption options={CONHECIMENTO} value={form.conhecimento} onChange={(v) => setForm({ ...form, conhecimento: v })} cols={3} />
                  </div>

                  <div>
                    <Label className="text-brown-graphite font-heading font-semibold text-sm mb-3 block">Pretende dar lance?</Label>
                    <SelectOption options={LANCE} value={form.lance} onChange={(v) => setForm({ ...form, lance: v })} cols={3} />
                  </div>

                  <div>
                    <Label className="text-brown-graphite font-heading font-semibold text-sm mb-3 block">Seu momento?</Label>
                    <SelectOption options={MOMENTO} value={form.momento} onChange={(v) => setForm({ ...form, momento: v })} cols={3} />
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
                    className="bg-gradient-to-r from-brown-caramel to-orange-500 hover:shadow-lg hover:shadow-brown-caramel/30 text-white rounded-full px-8 py-5 font-heading font-bold gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuar
                    <ArrowRight className="w-5 h-5" />
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
                    className="bg-gradient-to-r from-brown-caramel via-orange-500 to-brown-caramel hover:shadow-lg hover:shadow-brown-caramel/30 text-white rounded-full px-8 py-5 font-heading font-bold gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        ✓ Enviar & WhatsApp
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}