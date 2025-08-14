// results logic
import config from "../config.json" assert { type: "json" };


/**
 * Determine result key from answers.
 * answers = { a1: 'A'|'B'|'C'|'D', a2: 'A'|'B'|'C', a3: 'A'|'B'|'C', a4: 'A'|'B' }
 */
export function computeResult(answers) {
  const { a1, a2, a3, a4 } = answers;

  // LTC Insurance
  if (a2 === 'A') return config.logicPaths["ltci"];

  // VA Benefits
  if (a2 === 'B') return config.logicPaths["va"];

  // Nursing home + low or gap income
  if (a1 === 'D' && (a3 === 'A' || a3 === 'B')) {
    return config.logicPaths["nursing-home"];
  }

  // Low income (no LTCI/VA)
  if (a2 === 'C' && a3 === 'A') {
    return {
      ...config.logicPaths["low-income"],
      showMedicareNote: (a4 === 'B')
    };
  }

  // “Gap” (no LTCI/VA, moderate income)
  if (a2 === 'C' && a3 === 'B') {
    return {
      ...config.logicPaths["gap"],
      showMedicareNote: (a4 === 'B')
    };
  }

  // Higher income/assets
  if (a3 === 'C') return config.logicPaths["higher-income"];

  // Fallback
  return config.logicPaths["general"];
}

/** Returns Medicare note array if needed */
export function medicareNoteNeeded(showMedicareNote) {
  if (!showMedicareNote) return null;
  return config.medicareNote;
}

/** Returns contact CTA array from config */
export function buildCTAs() {
  return [
    { label: "Call Maryland Access Point (MAP)", value: config.contacts.map },
    { label: "Social Security Administration", value: config.contacts.ssa },
    { label: "VA Maryland Health Care System", value: config.contacts.va }
  ];
}

/** Returns disclaimer text */
export function getDisclaimer() {
  return config.disclaimer;
}