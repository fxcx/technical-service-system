/**
 * Declaración de tipos globales para Temporal.
 * 
 * `temporal-polyfill/full/global` inyecta `Temporal` en `globalThis` en runtime,
 * pero no provee las declaraciones de tipo automáticamente.
 * Este archivo hace que TypeScript reconozca `Temporal.Instant`, `Temporal.Now`, etc.
 */

import type { Temporal as TemporalTypes } from "temporal-polyfill";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Temporal {
    type Instant = TemporalTypes.Instant;
    type PlainDate = TemporalTypes.PlainDate;
    type PlainDateTime = TemporalTypes.PlainDateTime;
    type PlainTime = TemporalTypes.PlainTime;
    type ZonedDateTime = TemporalTypes.ZonedDateTime;
    type Duration = TemporalTypes.Duration;
  }

  // eslint-disable-next-line no-var
  var Temporal: typeof TemporalTypes;
}
