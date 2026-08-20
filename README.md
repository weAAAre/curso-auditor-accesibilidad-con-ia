# Auditor de accesibilidad con IA

Repositorio base del curso en directo para construir, paso a paso, un copiloto
de auditoría basado en WCAG-EM 2.0.

No necesitas programar para realizar los ejercicios. Trabajarás conversando con
Codex o Claude Code; el repositorio se ocupa de validar documentos y ejecutar
las herramientas técnicas.

## Qué construirás

En la primera sesión tu equipo conseguirá:

1. Acordar qué producto y qué partes se van a revisar.
2. Dibujar el mapa de la experiencia y decidir qué vistas revisar.
3. Ejecutar una primera inspección automática con Axe y conservar la evidencia.

El resultado no certifica conformidad WCAG. Es el comienzo trazable y
reproducible de una auditoría profesional.

## Preparación

Necesitas Node.js 22 o posterior y pnpm.

```bash
pnpm install
pnpm setup
pnpm check
```

Después abre esta carpeta con Codex o Claude Code y comienza por
[`docs/exercises/01-alcance.md`](docs/exercises/01-alcance.md).

## Comandos de apoyo

```bash
pnpm exercise:check -- 1 audits/demo
pnpm exercise:check -- 2 audits/demo
pnpm audit:axe -- audits/demo
pnpm exercise:check -- 3 audits/demo
```

Si algo falla, el mensaje explica qué pieza falta. No hace falta abrir ni
modificar los scripts.

## Mapa del repositorio

```text
docs/        fichas del curso y referencias
skills/      fuente canónica de las skills
scripts/     operaciones repetibles del harness
schemas/     contratos de los documentos de auditoría
fixtures/    producto local común para practicar
audits/      un expediente independiente por auditoría
evals/       escenarios y rúbrica para probar las skills
```

## Licencia

[MIT](LICENSE).
