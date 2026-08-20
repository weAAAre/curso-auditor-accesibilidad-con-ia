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

Necesitas Node.js 24 o posterior y pnpm. El setup instala la versión fijada de
`agent-browser`, descarga Chrome for Testing y enlaza las skills para ambos
agentes.

```bash
pnpm install
pnpm setup
```

Ejecuta esta preparación en tu terminal antes de abrir el agente. Codex o
Claude Code pueden pedir después permiso para lanzar el navegador: aprueba solo
el comando concreto del ejercicio, no una sesión con acceso total.

Después abre esta carpeta con Codex o Claude Code y comienza por
[`docs/exercises/01-alcance.md`](docs/exercises/01-alcance.md).

## Mapa del repositorio

```text
docs/        fichas del curso y referencias
skills/      fuente canónica de las skills
scripts/     operaciones repetibles del harness
schemas/     contratos de los documentos de auditoría
audits/      un expediente independiente por auditoría
evals/       casos y rúbrica para probar las skills
```

El producto común de la clase es la web pública de
[CityLights](https://weaaare.github.io/curso-auditor-accesibilidad-con-ia/).
No hay que arrancar servidores ni abrir una web incluida en el repositorio.

`skills/agent-browser/` contiene la skill oficial de descubrimiento. Sus
instrucciones operativas se cargan desde la propia CLI para que siempre
coincidan con la versión instalada.

## Licencia

[MIT](LICENSE).
