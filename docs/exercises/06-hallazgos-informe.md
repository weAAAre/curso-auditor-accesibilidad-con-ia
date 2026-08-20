# Ejercicio 6 — Convertimos la evidencia en un entregable

**Tiempo de equipo:** 25 minutos.

## La situación

Ahora tenéis resultados de Axe, pruebas manuales y decisiones pendientes. El
cliente no necesita una carpeta llena de JSON: necesita hallazgos reproducibles
y un informe que puedan utilizar diseño, desarrollo y responsables de producto.

No todas las señales son hallazgos. Varias pruebas pueden describir el mismo
problema y un `cantTell` debe seguir visible como trabajo pendiente.

## Vuestra misión

Construid una skill que consolide la evidencia sin reinterpretarla. Debe leer
los resultados de Axe, `coverage.json` y `audits/class/evidence/`; eliminar
duplicados y generar:

- `audits/class/findings.json` como fuente canónica;
- `audits/class/report/index.html` como informe accesible;
- `audits/class/exports/findings.csv` para herramientas de ticketing.

Cada hallazgo debe incluir criterio, muestra y estado, impacto para las
personas, evidencia, pasos de reproducción, comportamiento esperado y
observado, fuente y estado de revisión. No publiquéis el informe ni creéis
tickets en servicios externos.

## Al terminar debéis poder enseñar

- La nueva skill de consolidación y entrega.
- Un hallazgo confirmado y reproducible.
- Un candidato descartado o pendiente, con su razón.
- Cómo se ha evitado duplicar el mismo problema.
- El informe HTML navegable con teclado.
- El mismo hallazgo representado en JSON, HTML y CSV.

## Preguntas para orientar la conversación

- ¿Qué evidencia permite confirmar el hallazgo?
- ¿Dos síntomas pertenecen a la misma causa o son problemas distintos?
- ¿La recomendación explica el objetivo sin imponer una única implementación?
- ¿Puede una persona localizar el problema sin conocer el código?
- ¿Qué criterios siguen `untested` o `cantTell` al cerrar el informe?

**Extra:** cread dos vistas del mismo informe: un resumen ejecutivo y un detalle
técnico, ambos derivados de `findings.json`.
