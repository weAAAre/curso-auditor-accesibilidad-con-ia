# Ejercicio 2 — Dibujamos el mapa y elegimos qué mirar

**Tiempo de equipo:** 25 minutos.

## La situación

Ya sabéis qué producto vais a evaluar. Ahora necesitáis comprender la
experiencia: sus pantallas, estados y recorridos. Una URL no siempre equivale a
una única vista; un menú abierto o un formulario con errores también son estados
que alguien puede experimentar.

El producto de práctica está en `fixtures/demo-site/`. Recorred también las
vistas anidadas dentro de `checkout/`; un listado resumido por la terminal puede
ocultarlas.

## Vuestra misión

Construid una skill que explore el producto y ayude a decidir, con WCAG-EM, qué
se debe revisar. Aplicadla a la auditoría `demo`.

No busquéis “la muestra más pequeña”. Buscad una selección defendible. Si el
producto es suficientemente pequeño, decidid honestamente revisarlo entero.

## Al terminar debéis poder enseñar

- La nueva skill en `skills/`.
- Un mapa comprensible de vistas, estados y recorridos en `inventory.json`.
- La decisión de selección en `sample.json`.
- Por qué están representadas las funciones esenciales y los procesos completos.

## Preguntas para orientar la conversación

- ¿Qué se repite y qué es realmente diferente?
- ¿Qué necesita hacer una persona para completar la compra?
- ¿Qué estados solo aparecen después de interactuar?
- ¿El producto es lo bastante grande como para que una muestra tenga sentido?
- ¿Qué podría haber quedado fuera accidentalmente?

## Comprobación

```bash
pnpm exercise:check 2 audits/demo
```

**Extra:** pedid a otro equipo que critique vuestra selección sin ver cómo la
construisteis. Si no puede entenderla, falta trazabilidad.
