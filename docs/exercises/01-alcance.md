# Ejercicio 1 — Ponemos límites al encargo

**Tiempo de equipo:** 25 minutos.

## La situación

Una persona os ha pedido “auditar la web”. Antes de lanzar herramientas tenéis
que convertir esa frase ambigua en un encargo que todo el equipo entienda igual.

El cliente ficticio ha dejado su petición en
[`audits/demo/brief.md`](../../audits/demo/brief.md).

## Vuestra misión

Construid una skill que ayude a un equipo a acordar el alcance de una auditoría
siguiendo el primer paso de WCAG-EM. Después utilizadla con el encargo demo.

No se evalúa vuestra capacidad para programar. Se evalúa si la skill ayuda a
tomar buenas decisiones y reconoce la información que todavía falta.

## Al terminar debéis poder enseñar

- La nueva skill en `skills/`.
- Una ficha de alcance para `demo`, guardada por el agente como `scope.json`.
- Las dudas y suposiciones que no deberían ocultarse.
- Una explicación de qué decisiones ha tomado una persona y cuáles propuso la IA.

## Preguntas para orientar la conversación

- ¿Qué entra y qué queda fuera?
- ¿Contra qué versión y nivel de WCAG se evaluará?
- ¿Qué dispositivos o formas de uso importan?
- ¿Qué información no tenemos todavía?
- ¿Puede la ficha considerarse aprobada o debe seguir como borrador?

## Comprobación

```bash
pnpm exercise:check -- 1 audits/demo
```

El comando comprueba la forma del trabajo, no si las decisiones humanas son
buenas. Para eso utilizad la rúbrica de `evals/rubric.md`.

**Extra:** probad la skill con un encargo de una sola frase. Una buena skill no
debería rellenar los huecos inventando datos.
