# Instrucciones del curso

Este repositorio es un laboratorio didáctico para construir un **copiloto de
auditoría**, no un certificador automático de conformidad.

## Cómo trabajar

- Responde en español claro y evita jerga innecesaria.
- Cuando te pidan un ejercicio, lee primero su ficha en `docs/exercises/`.
- Explica el resultado en términos de decisiones de auditoría; no obligues a la
  persona a editar JSON o código a mano.
- Usa como fuentes metodológicas los documentos enlazados desde
  `docs/reference/sources.md`. No inventes requisitos WCAG.
- Crea las skills del alumnado en `skills/<nombre>/SKILL.md`. Los enlaces
  preparados durante `pnpm setup` las exponen a Codex y Claude Code; una skill
  nueva se prueba en una conversación limpia para comprobar su descubrimiento.
- No ejecutes `pnpm skills:sync` dentro de una sesión de agente: los directorios
  de descubrimiento están protegidos. Ese comando pertenece únicamente al setup
  previo realizado por la persona.
- Guarda cada auditoría en `audits/<audit-id>/`; nunca mezcles evidencias entre
  auditorías.
- Valida los artefactos con `pnpm audit:validate audits/<audit-id>`.
- Ejecuta Axe únicamente mediante `pnpm audit:axe audits/<audit-id>`.
- Conserva los resultados brutos. No conviertas automáticamente una violación
  de Axe en un hallazgo confirmado.
- `passes` no significa conformidad y `incomplete` requiere revisión humana.
- Alcance, muestra y hallazgos finales requieren una decisión humana explícita.

## Límites

- No declares que un producto cumple WCAG basándote en una muestra o en Axe.
- No generes puntuaciones agregadas de accesibilidad.
- No publiques tickets ni escribas en servicios externos sin aprobación.
- No modifiques retrospectivamente estas reglas de manera automática: propón
  cambios y explica la evidencia que los justifica.

## Comprobación final

Antes de dar una tarea por terminada, ejecuta `pnpm check` y la comprobación del
ejercicio correspondiente.
