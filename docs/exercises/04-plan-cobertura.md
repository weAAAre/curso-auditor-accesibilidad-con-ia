# Ejercicio 4 — Decidimos cómo revisar cada criterio

**Tiempo de equipo:** 25 minutos.

## La situación

Axe ha encontrado posibles problemas, pero solo cubre una parte de la
accesibilidad. Antes de seguir lanzando pruebas necesitáis saber qué criterios
de WCAG 2.2 aplican, qué se ha revisado parcialmente y qué sigue pendiente.

Una señal automática no convierte un criterio en aprobado. Tampoco debéis
buscar problemas de elementos que no existen en el producto.

## Vuestra misión

Construid una skill que prepare el plan de cobertura de la auditoría. Debe leer
el alcance, la muestra y la última ejecución de Axe; investigar las fuentes
oficiales necesarias y guardar el resultado en `audits/class/coverage.json`.

Para cada criterio A y AA debe indicar:

- si es aplicable, no aplicable o todavía no puede determinarse;
- qué vistas, estados o procesos están relacionados;
- qué parte ha cubierto Axe;
- qué skill o revisión humana debe completar la evaluación;
- qué evidencia existe y qué sigue sin probarse.

Usad únicamente estos resultados: `passed`, `failed`, `inapplicable`,
`cantTell` y `untested`. En este ejercicio la mayoría deberían permanecer como
`untested`: estáis diseñando el plan, no inventando conclusiones.

## Al terminar debéis poder enseñar

- La nueva skill en `skills/`.
- La matriz `coverage.json`.
- Un criterio cubierto parcialmente por Axe.
- Un criterio que necesite una prueba manual.
- Un criterio no aplicable, con su justificación.
- Un caso `cantTell` que necesite una persona o una capacidad adicional.

## Preguntas para orientar la conversación

- ¿Axe ha comprobado el criterio completo o solo una condición?
- ¿Cómo sabremos qué criterios aún no hemos revisado?
- ¿Qué pruebas deben repetirse en todas las vistas?
- ¿Qué criterios dependen de un proceso o estado interactivo?
- ¿Qué evidencia permitiría a otro equipo repetir la decisión?

**Extra:** buscad un criterio marcado inicialmente como no aplicable e intentad
demostrar, navegando el producto, si esa decisión era correcta.
