// results logic
/**
 * Returns a result object based on answers.
 * answers = { a1: 'A'|'B'|'C'|'D', a2: 'A'|'B'|'C', a3: 'A'|'B'|'C', a4: 'A'|'B' }
 * Paths derived from your doc (Aug 2025).
 */
export function computeResult(answers) {
  const { a1, a2, a3, a4 } = answers;

  // 1) Long-Term Care Insurance wins first
  if (a2 === 'A') {
    return {
      key: 'ltci',
      title: 'Your Long-Term Care Insurance policy is your first line of support.',
      summary: ['Contact your insurer to understand benefits, daily limits, and how to file a claim.'],
      showMedicareNote: false
    };
  }

  // 2) VA pathway
  if (a2 === 'B') {
    return {
      key: 'va',
      title: 'Your primary path is through the U.S. Department of Veterans Affairs (VA).',
      summary: [
        'The VA offers in-home care, adult day health care, and Community Living Centers.',
        'Call VA Maryland Health Care System: 1-800-949-1003 (ask for Geriatrics & Extended Care or a VA Social Worker).',
        'VSOs like DAV, The American Legion, and VFW can help at no cost.'
      ],
      showMedicareNote: false
    };
  }

  // 4) Nursing home + low/moderate income
  if (a1 === 'D' && (a3 === 'A' || a3 === 'B')) {
    return {
      key: 'nursing-home',
      title: 'You may be eligible for help paying for nursing home care.',
      summary: [
        'Nursing Home Medicaid can cover most costs; your income usually contributes toward care.',
        'If you want to move back home, ask about Money Follows the Person (MFP).',
        'Next step: Speak with the nursing facility social worker to start the application.'
      ],
      showMedicareNote: false
    };
  }

  // 3) Low income (no LTCI/VA)
  if (a2 === 'C' && a3 === 'A') {
    return {
      key: 'low-income',
      title: 'You are a strong candidate for Medicaid support at home.',
      summary: [
        'You likely qualify for full Medical Assistance (Medicaid) via a HealthChoice plan.',
        'Ask for an assessment for Community First Choice (CFC) or Community Personal Assistance Services (CPAS).',
        'For expanded services (adult day care, assisted living), apply for an HCBS Waiver (may have a waitlist).',
      ],
      showMedicareNote: (a4 === 'B')
    };
  }

  // 3) “The Gap” (no LTCI/VA, moderate income)
  if (a2 === 'C' && a3 === 'B') {
    return {
      key: 'gap',
      title: 'You may qualify for the Home and Community Based Services (HCBS) Waiver.',
      summary: [
        'The Waiver can open the door to full Medical Assistance while paying for long-term services.',
        'If on a waitlist, consider applying separately for the Medicare Savings Program and Extra Help.',
        'Maryland Senior Care may help while you wait.'
      ],
      showMedicareNote: (a4 === 'B')
    };
  }

  // 5) Higher income/assets
  if (a3 === 'C') {
    return {
      key: 'higher-income',
      title: 'Your primary options are Medicare’s short-term benefits or private pay.',
      summary: [
        'Medicare covers short-term, skilled care after a hospital stay; it does not cover ongoing custodial care.',
        'You can pay privately from income/assets.',
        'If expenses are very high, ask MAP about the Medically Needy “spend-down” pathway.'
      ],
      showMedicareNote: false
    };
  }

  // Fallback (shouldn’t happen with the current question set)
  return {
    key: 'general',
    title: 'Let’s talk through your options.',
    summary: [
      'Contact the Maryland Access Point (MAP): 1-844-627-5465 for options counseling.'
    ],
    showMedicareNote: false
  };
}

export function buildCTAs() {
  return [
    { label: 'Call Maryland Access Point (MAP)', value: '1-844-MAP-LINK (1-844-627-5465)' },
    { label: 'Social Security Administration', value: '1-800-772-1213' },
    { label: 'VA Maryland Health Care System', value: '1-800-949-1003' },
  ];
}

export function medicareNoteNeeded(showMedicareNote) {
  if (!showMedicareNote) return null;
  return [
    'Maryland requires you to apply for/enroll in Medicare if eligible as a condition of receiving Medicaid.',
    'Once approved for Medicaid, the Medicare Savings Program will pay your Part B premium.',
    'Next step: Call Social Security at 1-800-772-1213 to start your Medicare application.'
  ];
}