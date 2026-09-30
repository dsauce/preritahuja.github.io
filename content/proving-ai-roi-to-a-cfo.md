---
title: "Proving AI ROI to a CFO"
seoTitle: "Proving AI ROI to a CFO: What Fails and What Survives Scrutiny"
description: "Why most AI business cases collapse in front of a CFO, and the four kinds of evidence that hold up. Keynote at AI in Financial Services Europe, London, September 2026."
lead: "A CFO is not asking whether your AI works. They are asking two things: is this return real, and will the returns keep coming a year from now, when the pilot is over and the system has to run on its own? This is the written version of my solo keynote at AI in Financial Services Europe, London, on 8 September 2026."
faq:
  - q: "Why do AI business cases fail in front of a CFO?"
    a: "Because they are priced on outcomes that cannot be checked: hours saved, revenue credited to a single tool, pilot uplift, or usage statistics. A CFO discounts each of these, and a case built on them collapses at the first review."
  - q: "What AI ROI evidence does a CFO accept?"
    a: "Evidence that is auditable: a vacancy the workflow absorbed, an external contract or subscription cancelled, throughput per person as volume rises, and over the longer term, operating leverage, meaning revenue growing faster than headcount."
  - q: "Should an AI business case count hours saved?"
    a: "No. Freed time rarely reaches the P&L. Claim the decision that followed it instead: the contract that was cancelled or the role that was not backfilled because the work now runs differently."
  - q: "What makes AI returns durable?"
    a: "Reliability and governance. The system shows its sources, is measurably right, fails safely and leaves a trail, and someone can say who may use it, which version said what, who signed it off and who is watching it."
seeAlso:
  - label: "The Checking Problem, on arXiv"
    url: "https://arxiv.org/abs/2607.28666"
  - label: "Capital Markets LLM Reliability Score, on arXiv"
    url: "https://arxiv.org/html/2607.21340v1"
  - label: "Chief AI Officer"
    url: "/chief-ai-officer/"
  - label: "AI governance in banking"
    url: "/ai-governance-in-banking/"
  - label: "LLM reliability in financial services"
    url: "/llm-reliability/"
---

## The bet everyone has made

Almost every organisation has started with AI. Very few have finished. MIT's 2025 study of enterprise generative AI found that around 95% of pilots deliver no measurable P&L impact, and Gartner expected at least 30% of generative AI projects to be abandoned after proof of concept. The models mostly work. The return was priced on an outcome that never shipped.

## Five questions that end a business case

Picture a regulated bank eighteen months ago: a board mandate, a signed budget, twelve pilots inside a quarter, every one demoing beautifully. At month six the CFO asks for the return, and five questions finish the case:

- Show me the line on the P&L.
- Which role did we stop hiring for?
- What happens when it is wrong in front of a client?
- Would this survive an audit?
- Why is this number different from the one in the pilot deck?

They are really two questions. Is the return real? And will the returns keep coming? A return is a stream, not a snapshot. It only counts if the system that produces it keeps running.

## What a CFO discounts

- **Hours saved.** Freed time rarely converts to P&L.
- **Revenue credited to one tool.** Nobody can prove what would have happened without it.
- **Pilot uplift.** Demo-grade performance does not hold once the workload gets messy.
- **Usage statistics.** Activity is not outcome.

The gap between demo and production is measurable. In [The Checking Problem](https://arxiv.org/abs/2607.28666), 44% of AI configurations that cleared a demonstration bar did not hold up against a production bar.

## Four things to bring instead

**1. Claims that hold up because they are auditable.** A vacancy the workflow absorbed. An external contract or subscription cancelled. Throughput per person as volume rises. And over years, operating leverage: revenue growing faster than the team, which never asks what would have happened without the AI.

**2. The decision, not the time.** Not "we freed 200 analyst hours" but "we cancelled the external review contract, because that work now runs in-house." A cost either left the P&L or it did not.

**3. Reliability.** When someone asks what happens if it is wrong in front of a client, the answer has four parts: it shows its source, it is measurably right, it fails safely and it leaves a trail. That is what the [Capital Markets LLM Reliability Score](/llm-reliability/) formalises.

**4. Audit readiness.** Who can use it, which version said what, who signed it off, and who is watching it. Regulators already ask for these, through the EU AI Act and the PRA's model risk principles (SS1/23). Reliability is infrastructure, not a model property.

## The one trap

Sooner or later someone asks for one number. The temptation is to say "this tool made us two million". That cannot be checked, and a CFO knows it. Say instead that revenue grew faster than headcount. That one they can verify.

## Where to start

Find the decision your last AI project made possible, not the hours it freed. Ask your team for the reliability evidence: not whether the model is good, but whether it shows its source and fails safely. And bring one number to your next CFO conversation, the leverage ratio, because it needs no what-if to defend.
