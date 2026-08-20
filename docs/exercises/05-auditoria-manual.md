# Ejercicio 5 — Auditamos por familias de pruebas

**Tiempo de equipo:** 25 minutos.

## La situación

El plan de cobertura muestra qué no puede resolver Axe. Ahora vais a convertir
una familia de criterios en un procedimiento manual que otro equipo pueda
repetir sin conocer vuestra conversación.

El profesorado asignará o el equipo elegirá una de estas familias:

- teclado, trampas, orden y visibilidad del foco;
- estructura, encabezados, regiones y orden de lectura;
- nombres accesibles, roles, estados y componentes ARIA;
- formularios, instrucciones, errores y mensajes de estado;
- contraste, color, zoom, reflow, espaciado y tamaño de objetivos.

## Vuestra misión

Construid una skill especializada para la familia asignada y ejecutadla sobre
la muestra. La skill debe utilizar `agent-browser`, seguir un procedimiento
reproducible y actualizar en `coverage.json` solo los criterios que realmente
haya evaluado.

Antes de decidir, debe consultar en este orden:

1. El criterio normativo en WCAG 2.2.
2. Su documento Understanding.
3. Técnicas, fallos y ACT Rules aplicables.
4. ARIA APG cuando exista un patrón de interfaz concreto.

Guardad snapshots, capturas o notas reproducibles dentro de
`audits/class/evidence/<familia>/`. Si el agente no puede realizar una prueba o
la evidencia necesita interpretación, el resultado correcto es `cantTell`.

Siempre que el problema sea visualizable, la skill debe guardar también una
captura con la zona afectada enmarcada en rojo. Si una imagen no puede demostrar
el problema, debe registrar la razón como `not-capturable`; no debe inventar una
captura ni utilizar una imagen irrelevante para cumplir el requisito.

## Al terminar debéis poder enseñar

- La nueva skill especializada en `skills/`.
- Los criterios y condiciones de aplicabilidad que declara.
- El recorrido realizado sobre la muestra.
- La evidencia de al menos una decisión, incluida su captura anotada cuando sea
  visualizable.
- Los cambios realizados en `coverage.json`.
- Una limitación que la skill no intente ocultar.

## Preguntas para orientar la conversación

- ¿Qué experiencia de una persona estamos intentando reproducir?
- ¿Cuál es la diferencia entre observar algo y declarar un incumplimiento?
- ¿Se ha repetido la prueba en las vistas y estados relevantes?
- ¿La expectativa procede de WCAG, de una técnica o de APG?
- ¿Otra persona podría repetir exactamente el procedimiento?

**Extra:** intercambiad la skill con otro equipo y comprobad si obtiene una
evidencia equivalente sin recibir explicaciones adicionales.
