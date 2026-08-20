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

En la segunda sesión continuará hasta:

4. Planificar cómo se evaluará cada criterio aplicable.
5. Ejecutar pruebas manuales especializadas con skills reutilizables.
6. Consolidar hallazgos y producir un informe accesible y exportable.

El resultado no certifica conformidad WCAG. Es el comienzo trazable y
reproducible de una auditoría profesional.

## Preparación

Abre esta carpeta con Codex o Claude Code y escribe:

```text
Inicializa el proyecto
```

El agente instalará lo que falte, preparará `agent-browser`, descargará el
navegador y verificará que el laboratorio funciona. Si el sistema solicita
permiso para instalar una herramienta, aprueba únicamente esa operación.

Cuando termine, comienza por
[`docs/exercises/01-alcance.md`](docs/exercises/01-alcance.md).

## Presentación de clase

Abre [`slides.html`](slides.html) en el navegador. Avanza y vuelve
con las flechas del teclado; pulsa `F` para entrar o salir de pantalla completa.

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
