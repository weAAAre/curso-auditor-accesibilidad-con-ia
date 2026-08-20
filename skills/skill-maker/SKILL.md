---
name: skill-maker
description: Crea o mejora una skill pequeña y evaluable para los ejercicios de este curso cuando el equipo necesita convertir una fase de auditoría en un procedimiento reutilizable.
---

# Crear una skill del curso

## Objetivo

Convertir una decisión repetible de auditoría en una guía breve que otro equipo
pueda aplicar sin conocer la conversación que la originó.

## Antes de escribir

1. Lee la ficha del ejercicio y la metodología enlazada desde ella.
2. Identifica una sola responsabilidad para la skill.
3. Separa lo que razona el agente, lo que ejecuta un script y lo que debe aprobar
   una persona.
4. Define el documento o evidencia observable que dejará la skill.

## Estructura mínima

Crea `skills/<nombre>/SKILL.md` con frontmatter `name` y `description`. En el
cuerpo incluye:

- Cuándo usarla y cuándo no.
- Entradas que debe leer.
- Pasos numerados y fuentes que debe consultar.
- Resultado esperado y su ubicación.
- Límites, detenciones y decisiones humanas.
- Comandos existentes que debe usar, sin reimplementar sus funciones.

Si la skill evalúa criterios o produce hallazgos, debe aplicar el protocolo de
evidencia visual de `docs/reference/agent-browser.md`: captura con rectángulo
rojo siempre que el problema sea visualizable o justificación `not-capturable`
cuando una imagen no pueda demostrarlo.

Escribe para una persona no programadora. Prefiere “ficha de alcance” a
“instancia del esquema”, pero conserva el nombre técnico del archivo para que el
resultado sea verificable.

## Evaluación

1. Termina la conversación en la que la has creado y abre una limpia para
   comprobar que Codex o Claude Code la descubre mediante los enlaces ya
   preparados por `pnpm setup`.
2. Pruébala con el encargo de clase y con un encargo incompleto.
3. Revisa el resultado con `evals/rubric.md`.
4. Corrige solamente el fallo observado; no añadas instrucciones especulativas.

No ocultes preguntas abiertas, no inventes evidencia y no declares conformidad.
