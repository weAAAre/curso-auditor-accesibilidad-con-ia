# Validación del harness antes de clase

**Fecha:** 20 de agosto de 2026.

Se simuló el recorrido completo en conversaciones limpias y con instrucciones
breves, equivalentes a las que recibiría el alumnado:

1. `Haz el ejercicio 1 para la auditoría demo.`
2. `Haz ahora el ejercicio 2 para demo.`
3. `Haz el ejercicio 3 y pasa Axe a demo.`

## Resultado observado

- El ejercicio 1 produjo un alcance en borrador y se detuvo hasta recibir una
  aprobación humana explícita.
- El ejercicio 2 identificó seis páginas, tres estados interactivos y el proceso
  completo de compra. Al ser un producto pequeño, justificó revisar los nueve
  casos en lugar de fabricar una muestra artificial.
- El ejercicio 3 repitió los nueve casos con `agent-browser 0.34.0` y su Axe Core
  integrado, conservó un JSON bruto por caso y creó un manifiesto trazable.
- Las skills creadas durante la simulación fueron descubiertas desde una
  conversación nueva tanto por la ruta de Codex como por la de Claude Code.

## Cambios derivados de la prueba

- `skills/` pasó a ser la fuente escribible y canónica; `.agents/skills` y
  `.claude/skills` son enlaces preparados antes de abrir el agente.
- El campo ambiguo `state` se sustituyó por `stateId` y se valida contra el
  inventario.
- La fixture usa rutas relativas y `file://`, por lo que la clase no depende de
  arrancar ni coordinar un servidor local.
- Playwright y `@axe-core/playwright` se retiraron. Navegación y Axe comparten
  ahora una única herramienta fijada y su skill oficial.
- La preparación incluye una prueba real del navegador. Si el agente solicita
  permiso, se concede solo al comando concreto de auditoría.

## Límite pendiente

La validación cubre el producto local, sin autenticación ni datos sensibles. Una
auditoría futura de un producto real deberá definir por separado dominios
permitidos, gestión de sesión y tratamiento de credenciales.
