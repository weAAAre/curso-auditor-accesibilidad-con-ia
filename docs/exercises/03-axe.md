# Ejercicio 3 — Pasamos el primer radar automático

**Tiempo de equipo:** 25 minutos.

## La situación

Tenéis un alcance y una selección aprobados. Ahora vais a pasar Axe por cada
vista y estado elegido. Axe es un radar: detecta parte de los posibles problemas,
pero no decide por sí solo si el producto cumple WCAG.

## Vuestra misión

Construid una skill que prepare y ejecute la primera inspección automática de
forma reproducible. Debe usar el comando existente, que navega con
`agent-browser` y ejecuta su Axe Core integrado, conservar los resultados brutos
y explicar qué necesita revisión humana.

## Al terminar debéis poder enseñar

- La nueva skill en `skills/`.
- Una ejecución dentro de `audits/class/runs/`.
- El manifiesto que identifica `agent-browser`, Axe Core, navegador, versiones,
  vistas y hora.
- La diferencia entre `violations`, `incomplete`, `passes` e `inapplicable`.
- Al menos una limitación concreta de la ejecución automática.

## Preguntas para orientar la conversación

- ¿Se ha analizado también el menú cuando está abierto?
- ¿Qué resultados son hechos brutos y cuáles son interpretaciones?
- ¿Qué debería revisar después una persona?
- ¿Podríamos repetir mañana la misma ejecución y saber qué cambió?

## Ejecución y comprobación

```bash
pnpm audit:axe audits/class
pnpm exercise:check 3 audits/class
```

**Extra:** elegid un resultado `incomplete` y redactad la pregunta de revisión
humana, sin declarar todavía que existe un fallo.
