---
planStatus:
  planId: plan-lead-capture-cta
  title: Lead capture CTA after assessment
  status: draft
  planType: improvement
  priority: high
  owner: rbnfdez
  stakeholders: []
  tags: [cta, leads, conversion]
  created: "2026-03-20"
  updated: "2026-03-20T00:00:00.000Z"
  progress: 0
---

# Lead Capture — Invertir el punto de contacto

## Problema actual

El CTA actual dice "Book your Full Assessment" + un link + un email. Eso deja la acción 100% en manos del usuario. Después de ver sus resultados, tiene que:
1. Ir a la web
2. Buscar cómo contactar
3. Escribir un email o rellenar un formulario

Cada paso es un punto de fuga. El usuario tiene la intención en caliente pero se enfría al primer obstáculo.

## Objetivo

Que el siguiente paso dependa de nosotros (qevolution), no del usuario. Capturar un dato de contacto en el mismo momento del assessment para poder hacer follow-up.

---

## Opciones evaluadas

### Opción A — Pedir email/teléfono directamente en el chat (RECOMENDADA)

Después de mostrar los resultados y las recomendaciones, el agente pregunta:

```
¿Quieres que un experto de nuestro equipo te contacte para analizar
cómo mejorar estos resultados? Solo necesito tu email o teléfono.

(Sin compromiso — es una conversación de 15 minutos)
```

**Pros:**
- Fricción mínima — el usuario solo escribe un dato en el mismo chat
- El momento es perfecto — acaba de ver sus debilidades
- "Sin compromiso" + "15 minutos" reduce la barrera
- Nosotros controlamos el follow-up

**Contras:**
- El dato se queda en el chat del agente — necesitas que el usuario lo copie/envíe, o que el skill genere un archivo con el contacto
- No hay forma automática de enviar ese dato a un CRM desde el skill

**Solución para el dato:** El skill puede generar un archivo `qa-assessment-results.md` con los resultados + el contacto, que el usuario puede compartir. O simplemente instruir al usuario a enviar ese dato por email a info@qevolution.tech.

### Opción B — Link a formulario corto con resultados pre-rellenados

El CTA incluye un link a un Google Form / Typeform / Calendly con los datos del assessment ya pre-rellenados (o al menos el score).

**Pros:**
- Dato llega directo al CRM/herramienta
- Puedes conectar con Calendly para agendar directamente

**Contras:**
- El usuario tiene que salir del chat → punto de fuga
- Necesitas mantener un formulario externo

### Opción C — Link directo a Calendly

```
👉 Agenda 15 min con un experto: https://calendly.com/qevolution/assessment-review
```

**Pros:**
- Un click → cita agendada
- Sin intermediarios

**Contras:**
- Sigue siendo el usuario quien tiene que actuar
- Si no agenda en el momento, se pierde

### Opción D — Generar archivo de resultados compartible

El skill genera un archivo `.md` o `.txt` con los resultados completos y dice:

```
He guardado tus resultados en qa-assessment-results.md.
¿Quieres que te contactemos para revisarlos juntos?
Responde con tu email y te escribimos en 24h.
```

**Pros:**
- El usuario tiene algo tangible que guardar/compartir
- Combina con Opción A

**Contras:**
- Generar archivos desde un skill depende del agente

---

## Recomendación: Opción A + D combinadas

1. Mostrar resultados + recomendaciones (como ahora)
2. Preguntar si quiere que le contactemos (email)
3. Si da el email → mostrar confirmación: "Perfecto, te escribimos en 24h"
4. Si dice que no → mostrar el CTA pasivo actual como fallback

### Cambios en SKILL.md

Modificar **Step 4 — CTA** para que sea un flujo conversacional:

```
Después de las recomendaciones, preguntar:

"¿Te gustaría que un experto de nuestro equipo te contacte para analizar
cómo mejorar estos resultados? Solo necesito tu email.
(Sin compromiso — es una conversación de 15 minutos)"

Si el usuario da su email:
→ "Perfecto, te escribimos en menos de 24h a [email]. ¡Gracias por completar el assessment!"

Si el usuario dice que no:
→ Mostrar el CTA pasivo:
  "Si cambias de opinión: https://www.qevolution.tech | info@qevolution.tech"
```

### Archivos a modificar

1. `qa-assessment/SKILL.md` — Step 4 (CTA)
2. `README.md` — no necesita cambios (el flujo interno no afecta al README)
