# Instruções do Agente — VIRTO ELÉTRICA

## Encoding (OBRIGATÓRIO em todo código gerado)

- Todo HTML deve ter `<meta charset="UTF-8">` como PRIMEIRO elemento do `<head>`
- Usar caracteres UTF-8 diretamente (á, ã, ç, é) — nunca entidades HTML (&atilde; etc.)
- Strings JavaScript com acentos sempre em template literals (``) ou constantes — nunca concatenação solta
- Nunca omitir charset em nenhum arquivo gerado

## Stack do projeto

- Frontend: HTML/CSS/JS single-page, hospedado no Vercel
- Backend: Supabase (PostgreSQL + Auth + RLS)
- Linguagem dos textos: Português brasileiro