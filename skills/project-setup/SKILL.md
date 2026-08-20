---
name: project-setup
description: Inicializa y repara el entorno de este laboratorio cuando la persona pide “inicializa el proyecto”, “prepara el proyecto” o todavía no tiene Node.js, pnpm, dependencias, agent-browser o su navegador listos.
---

# Inicializar el proyecto

Deja el laboratorio preparado para empezar el primer ejercicio sin pedir a la
persona que resuelva detalles técnicos.

## Procedimiento

1. Trabaja desde la raíz del repositorio y lee `package.json` para obtener las
   versiones requeridas de Node.js, pnpm y `agent-browser`.
2. Comprueba el sistema operativo y las herramientas ya disponibles. Si falta
   una versión compatible de Node.js, instálala con un gestor de versiones o de
   paquetes que ya exista en el equipo. Si una instalación del sistema requiere
   autorización, solicita permiso para esa operación concreta.
3. Activa la versión de pnpm declarada en `packageManager` mediante Corepack. Si
   Corepack no está disponible, instala esa misma versión de pnpm con npm.
4. Ejecuta `pnpm install --frozen-lockfile` y después `pnpm setup`. Esto instala
   las dependencias fijadas, prepara Chrome para `agent-browser` y enlaza las
   skills de Codex y Claude Code.
5. Ejecuta `pnpm check` y `pnpm test:axe`. La inicialización termina únicamente
   cuando ambas operaciones funcionan.

## Si algo falla

- Lee el error real y corrige su causa ambiental; vuelve a ejecutar desde el
  paso que falló.
- Resuelve automáticamente problemas recuperables de PATH, versiones,
  Corepack, instalación de paquetes y descarga del navegador.
- No borres el lockfile, no actualices dependencias y no modifiques el código o
  la documentación del curso para hacer que una instalación local pase.
- No desactives certificados, controles de seguridad ni verificaciones. No uses
  privilegios administrativos sin una autorización específica.
- Detente solo ante un bloqueo externo que no puedas resolver, como la falta de
  permisos del sistema o de conexión, e indica la causa exacta y la única acción
  necesaria por parte de la persona.

## Resultado

Confirma de forma breve que el proyecto está listo e indica las versiones
activas de Node.js, pnpm, `agent-browser` y Axe Core. Si no está listo, no lo
presentes como una inicialización completada.
