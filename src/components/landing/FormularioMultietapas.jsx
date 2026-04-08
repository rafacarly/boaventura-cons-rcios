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
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 font-body text-sm ${
            value === opt.value
              ? "border-brown-caramel bg-brown-caramel/10 text-brown-dark"
              : "border-brown-caramel/20 hover:border-brown-caramel/40 text-brown-graphite"
          }`}
        >
          <div className="flex items-center gap-3">
            {opt.icon && <opt.icon className={`w-5 h-5 ${value === opt.value ? "text-brown-caramel" : "text-brown-medium"}`} />}
            <span className="font-medium">{opt.label}</span>
          </div>
        </button>
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

    // Build WhatsApp message
    const msg = encodeURIComponent(
      `Olá, meu nome é ${form.nome}. Acabei de preencher o formulário no site da Boaventura | Consórcios.\n\nMeu interesse é em: ${getObjetivoLabel(form.objetivo)}\nFaixa de crédito: ${getFaixaLabel(form.faixa_credito)}\nPrazo: ${getPrazoLabel(form.prazo)}\nConhecimento sobre consórcio: ${getConhecimentoLabel(form.conhecimento)}\nInteresse em lance: ${getLanceLabel(form.lance)}\nMomento: ${getMomentoLabel(form.momento)}\n\nQuero falar com um atendente.`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    }, 1500);
  };

  if (done) {
    return (
      <section id="formulario" className="py-16 md:py-24 bg-brown-sand">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 rounded-full bg-brown-caramel/20 flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-brown-caramel" />
          </motion.div>
          <h3 className="text-2xl font-heading text-brown-dark mb-3">Pronto! Seus dados foram enviados.</h3>
          <p className="text-brown-medium font-body mb-6">
            Você será redirecionado para o WhatsApp da Boaventura. Caso não abra automaticamente, clique abaixo.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-brown-caramel hover:bg-brown-medium text-white rounded-full px-8 py-6 font-body">
              Abrir WhatsApp
            </Button>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="py-16 md:py-24 bg-brown-sand">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm font-body text-brown-caramel font-semibold tracking-widest uppercase mb-2">
            Simulação gratuita
          </p>
          <h2 className="text-3xl md:text-4xl font-heading text-brown-dark">
            Descubra o plano ideal pra você.
          </h2>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-body font-bold transition-all ${
                i <= step ? "bg-brown-caramel text-white" : "bg-brown-caramel/15 text-brown-medium"
              }`}>
                {i < step ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`w-12 sm:w-20 h-1 rounded transition-all ${i < step ? "bg-brown-caramel" : "bg-brown-caramel/15"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-brown-caramel/10">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
                <div>
                  <h3 className="text-xl font-heading text-brown-dark mb-1">Vamos começar</h3>
                  <p className="text-sm font-body text-brown-medium">Como podemos te chamar?</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-brown-graphite font-body font-medium">Seu nome</Label>
                    <Input
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                      placeholder="Digite seu nome completo"
                      className="mt-1 h-12 rounded-xl border-brown-caramel/20 focus:border-brown-caramel font-body"
                    />
                  </div>
                  <div>
                    <Label className="text-brown-graphite font-body font-medium">WhatsApp</Label>
                    <Input
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      placeholder="(00) 00000-0000"
                      className="mt-1 h-12 rounded-xl border-brown-caramel/20 focus:border-brown-caramel font-body"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
                <div>
                  <h3 className="text-xl font-heading text-brown-dark mb-1">Qual seu objetivo?</h3>
                  <p className="text-sm font-body text-brown-medium">Selecione o tipo de consórcio que te interessa.</p>
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
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
                <div>
                  <h3 className="text-xl font-heading text-brown-dark mb-1">Quase lá!</h3>
                  <p className="text-sm font-body text-brown-medium">Nos ajude a encontrar o melhor plano.</p>
                </div>

                <div>
                  <Label className="text-brown-graphite font-body font-medium text-sm mb-2 block">Faixa de crédito</Label>
                  <SelectOption options={FAIXAS} value={form.faixa_credito} onChange={(v) => setForm({ ...form, faixa_credito: v })} />
                </div>

                <div>
                  <Label className="text-brown-graphite font-body font-medium text-sm mb-2 block">Para quando?</Label>
                  <SelectOption options={PRAZOS} value={form.prazo} onChange={(v) => setForm({ ...form, prazo: v })} />
                </div>

                <div>
                  <Label className="text-brown-graphite font-body font-medium text-sm mb-2 block">Conhece consórcio?</Label>
                  <SelectOption options={CONHECIMENTO} value={form.conhecimento} onChange={(v) => setForm({ ...form, conhecimento: v })} cols={3} />
                </div>

                <div>
                  <Label className="text-brown-graphite font-body font-medium text-sm mb-2 block">Pretende dar lance?</Label>
                  <SelectOption options={LANCE} value={form.lance} onChange={(v) => setForm({ ...form, lance: v })} cols={3} />
                </div>

                <div>
                  <Label className="text-brown-graphite font-body font-medium text-sm mb-2 block">Seu momento</Label>
                  <SelectOption options={MOMENTO} value={form.momento} onChange={(v) => setForm({ ...form, momento: v })} cols={3} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-brown-caramel/10">
            {step > 0 ? (
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                className="text-brown-medium hover:text-brown-dark font-body gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            ) : <div />}

            {step < totalSteps - 1 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canNext()}
                className="bg-brown-caramel hover:bg-brown-medium text-white rounded-full px-8 py-5 font-body font-semibold gap-2"
              >
                Continuar
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canNext() || loading}
                className="bg-brown-caramel hover:bg-brown-medium text-white rounded-full px-8 py-5 font-body font-semibold gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Enviar e falar no WhatsApp
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}