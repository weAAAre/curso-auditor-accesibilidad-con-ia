# Investigación: auditoría manual asistida por skills

Fecha: 20 de agosto de 2026.

## Conclusión

La segunda parte del curso no debería crear una skill por cada criterio WCAG ni
una única skill que pretenda “auditarlo todo”. La opción más mantenible es un
orquestador ligero y varias skills por familia de prueba, todas escribiendo en
un contrato común de cobertura y evidencia.

La cadena propuesta es:

```text
Axe
→ candidatos automáticos
→ plan de cobertura
→ skills manuales por familia
→ resultados revisables
→ hallazgos confirmados
→ informe y exportaciones
```

## Jerarquía de fuentes

1. [WCAG 2.2](https://www.w3.org/TR/WCAG22/) es la referencia normativa para
   determinar conformidad.
2. [WCAG-EM 2.0](https://www.w3.org/TR/wcag-em-2/) es la metodología de
   evaluación. Fue publicada el 23 de julio de 2026 como W3C Group Note; es
   oficial e informativa, no una W3C Recommendation.
3. [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/) explica
   intención, beneficios y ejemplos, pero no es normativa.
4. [Techniques for WCAG 2.2](https://www.w3.org/WAI/WCAG22/Techniques/) aporta
   técnicas y fallos conocidos. No aplicar una técnica concreta no demuestra un
   incumplimiento.
5. [ACT Rules](https://www.w3.org/WAI/standards-guidelines/act/rules/) ofrece
   procedimientos de prueba consistentes, pero cada regla es informativa,
   tecnológica y parcial.
6. [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) aporta
   expectativas de semántica y teclado para widgets. Es orientación informativa.
7. [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) es la referencia normativa
   para roles, estados y propiedades ARIA.

La formulación correcta para el curso es: “Aplicamos WCAG-EM 2.0 como
metodología y evaluamos respecto a los requisitos normativos de WCAG 2.2”.

## Límite de la automatización

W3C indica que ninguna herramienta puede determinar por sí sola si un producto
cumple los estándares y que se necesita evaluación humana. Una ACT Rule suele
comprobar solo una parte de un criterio: fallar aporta evidencia sobre esa
condición; pasar no demuestra que se satisfaga el criterio completo.

Fuentes:

- [Evaluating Web Accessibility](https://www.w3.org/WAI/test-evaluate/)
- [About ACT Rules](https://www.w3.org/WAI/standards-guidelines/act/rules/about/)
- [Easy Checks](https://www.w3.org/WAI/test-evaluate/easy-checks/)

Por ello, Axe debe producir candidatos y evidencia bruta, no hallazgos
confirmados ni declaraciones automáticas de conformidad.

## Contrato común

Cada evaluación de un criterio, muestra y estado debe terminar en uno de estos
resultados, alineados con ACT Rules Format 1.1:

- `passed`: la condición concreta evaluada pasa.
- `failed`: existe evidencia reproducible de fallo.
- `inapplicable`: la condición no aparece en la muestra.
- `cantTell`: hace falta juicio o una capacidad que el agente no tiene.
- `untested`: todavía no se ha ejecutado el procedimiento.

La cobertura y los hallazgos deben permanecer separados. Un resultado `failed`
puede originar un hallazgo; `passed` nunca debe convertirse en “el producto
cumple”.

Cada registro necesita como mínimo:

- criterio WCAG y nivel;
- muestra, vista y estado;
- método y versión;
- aplicabilidad;
- resultado;
- evidencia y pasos de reproducción;
- resultado esperado y observado;
- impacto para las personas;
- fuentes consultadas;
- limitaciones y asuntos pendientes de revisión.

## Familias de skills

1. `audit-keyboard-focus`: teclado, trampas, orden, foco visible y foco no
   oculto. Referencia adicional: [Developing a Keyboard
   Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/).
2. `audit-structure-semantics`: títulos, encabezados, regiones, orden de lectura,
   tablas y relaciones semánticas.
3. `audit-names-roles-values`: nombre accesible, rol, estado, valor y patrones
   ARIA encontrados en el producto.
4. `audit-forms-feedback`: etiquetas, instrucciones, errores, mensajes de estado,
   entrada redundante y autenticación accesible.
5. `audit-visual-adaptation`: contraste, uso del color, zoom, reflow, espaciado
   de texto, contenido en hover/focus, foco no oculto y tamaño de objetivos.
6. `audit-non-text-media`: imágenes, gráficos, audio, vídeo, subtítulos,
   transcripciones y audiodescripción.
7. `audit-motion-time-input`: animación, destellos, límites de tiempo, arrastre,
   gestos y alternativas de entrada.
8. `audit-complete-processes`: camino principal, ramas críticas, formularios,
   diálogos y cambios dinámicos a lo largo de procesos completos.

No todas las familias serán aplicables a CityLights. Registrar
`inapplicable` forma parte del trabajo y evita fabricar resultados.

## Forma de cada skill

Cada skill debe declarar:

- criterios incluidos y nivel;
- condiciones de aplicabilidad;
- entradas que lee de la auditoría;
- preparación del navegador;
- procedimiento reproducible;
- evidencia mínima;
- qué puede automatizar y qué necesita juicio humano;
- resultados permitidos;
- fuentes normativas e informativas;
- límites y condición de parada.

Las skills no deben copiar el texto completo de WCAG. Deben enlazar la fuente
actual y convertirla en un protocolo práctico.

## Propuesta pedagógica

### Clase 1

1. Definir alcance.
2. Explorar el producto y seleccionar la muestra.
3. Ejecutar Axe y conservar evidencia bruta.

### Clase 2

4. Construir el plan de cobertura: asignar criterios a Axe, una skill manual o
   revisión humana, y registrar aplicabilidad.
5. Crear y ejecutar un pack manual mínimo sobre CityLights: teclado/foco,
   estructura/semántica y adaptación visual/formularios.
6. Consolidar candidatos, confirmar hallazgos y generar el informe accesible y
   las exportaciones.

### Reserva o ampliación

7. Componentes complejos y cambios dinámicos con APG.
8. Multimedia, movimiento, tiempo y métodos de entrada.
9. Comparar muestra estructurada y aleatoria y ampliar la muestra si aparecen
   nuevos tipos de contenido o hallazgos.
10. Exportar el mismo modelo canónico a HTML, CSV/Jira y
    [EARL](https://www.w3.org/TR/EARL10-Schema/).

## Correspondencia con WCAG-EM 2.0

WCAG-EM 2.0 exige evaluar en detalle la muestra seleccionada, recorrer los
procesos completos y comparar la muestra estructurada con la aleatoria. Si la
muestra aleatoria descubre nuevos tipos de contenido o hallazgos, se vuelve a
la selección y se amplía.

La metodología también pide documentar los resultados durante la evaluación.
Para resolver incidencias son especialmente útiles la descripción clara, los
pasos de reproducción, la gravedad y las capturas o vídeos. El informe final
debe ser accesible y no debería reducirse a una puntuación global, que puede ser
engañosa.

Fuente: [WCAG-EM 2.0, pasos 4 y
5](https://www.w3.org/TR/wcag-em-2/#evaluation-procedure).
