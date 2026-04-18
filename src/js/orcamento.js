/* ══════════════════════════════════════════════════
   VIRTO ELÉTRICA — Atendimento Page JS
   Nenhuma lógica complexa, apenas imports de CSS
   ══════════════════════════════════════════════════ */

import { inject } from '@vercel/analytics';

import '../css/variables.css';
import '../css/base.css';
import '../css/components.css';
import '../css/orcamento.css';

// Vercel Analytics
inject();

// ── A página de orçamento é uma LP simples,
//    toda a interatividade vem das animações CSS.
//    Futuras features (analytics, form, etc.) vão aqui.

document.addEventListener('DOMContentLoaded', () => {
  console.log(`Virto Elétrica — Página de Atendimento carregada`);
});
