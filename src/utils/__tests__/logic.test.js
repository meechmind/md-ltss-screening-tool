// Import necessary testing utilities

import { describe, it, expect } from 'vitest'
import { computeResult, medicareNoteNeeded, buildCTAs } from '../logic.js'
import config from '../../config.json'

describe('computeResult', () => {
  it('LTCI path when a2 = A', () => {
    const res = computeResult({ a1: 'A', a2: 'A', a3: 'A', a4: 'A' })
    expect(res.title).toBe(config.logicPaths['ltci'].title)
  })

  it('VA path when a2 = B', () => {
    const res = computeResult({ a1: 'A', a2: 'B', a3: 'A', a4: 'A' })
    expect(res.title).toBe(config.logicPaths['va'].title)
  })

  it('Nursing home path when a1 = D and a3 in A|B', () => {
    const resA = computeResult({ a1: 'D', a2: 'C', a3: 'A', a4: 'A' })
    const resB = computeResult({ a1: 'D', a2: 'C', a3: 'B', a4: 'B' })
    expect(resA.title).toBe(config.logicPaths['nursing-home'].title)
    expect(resB.title).toBe(config.logicPaths['nursing-home'].title)
  })

  it('Low-income path when a2 = C and a3 = A', () => {
    const res = computeResult({ a1: 'A', a2: 'C', a3: 'A', a4: 'A' })
    expect(res.title).toBe(config.logicPaths['low-income'].title)
  })

  it('Gap path when a2 = C and a3 = B', () => {
    const res = computeResult({ a1: 'A', a2: 'C', a3: 'B', a4: 'A' })
    expect(res.title).toBe(config.logicPaths['gap'].title)
  })

  it('Higher-income path when a3 = C (regardless of others except LTCI/VA handled earlier)', () => {
    const res = computeResult({ a1: 'A', a2: 'C', a3: 'C', a4: 'B' })
    expect(res.title).toBe(config.logicPaths['higher-income'].title)
  })

  it('General path when answers do not match any rule', () => {
    // Provide an invalid combination that skips all other logic branches
    const res = computeResult({ a1: 'Z', a2: 'Z', a3: 'Z', a4: 'Z' })
    expect(res.title).toBe(config.logicPaths['general'].title)
  })
})

describe('medicareNoteNeeded', () => {
  it('returns null when showMedicareNote is false', () => {
    expect(medicareNoteNeeded(false)).toBeNull()
  })

  it('returns the configured note when showMedicareNote is true', () => {
    const note = medicareNoteNeeded(true)
    expect(Array.isArray(note)).toBe(true)
    expect(note.length).toBeGreaterThan(0)
    expect(note[0]).toContain('Maryland') // sanity check on content
  })
})

describe('buildCTAs', () => {
  it('includes MAP, SSA, and VA numbers from config', () => {
    const ctas = buildCTAs()
    expect(ctas.some(c => c.value === config.contacts.map)).toBe(true)
    expect(ctas.some(c => c.value === config.contacts.ssa)).toBe(true)
    expect(ctas.some(c => c.value === config.contacts.va)).toBe(true)
  })
})
