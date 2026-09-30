---
title: "LLM Reliability in Financial Services"
seoTitle: "LLM Reliability in Financial Services: From Plausible to Bankable"
description: "How to measure whether large language model output is reliable enough for regulated financial workflows, and why reliability is a property of the system rather than the model."
lead: "LLM reliability in financial services is the question of whether generated output can be defended by a banker, an analyst or a compliance reviewer with the underlying documents in hand. Frontier models can all produce text that reads well. The harder test is whether it is bankable."
faq:
  - q: "How do you measure LLM reliability for financial workflows?"
    a: "Score outputs at the workflow level on dimensions reviewers actually use: factual accuracy, evidence traceability, numerical consistency, completeness, source discipline, decision usefulness and reviewability. The Capital Markets LLM Reliability Score (CM-LRS) sets out one such seven-dimension framework."
  - q: "Which LLM is most reliable for banking?"
    a: "In the CM-LRS study, leading frontier models were statistically indistinguishable on reliability despite material differences in cost per call. That argues for choosing models on workflow fit, cost and latency rather than headline quality."
  - q: "Why do reliable demos fail in production?"
    a: "A demo needs one correct run. Production needs sustained accuracy, reproducibility across repeats, verifiable attribution and a confidence signal that means something. In The Checking Problem, many configurations that passed the first bar failed the second."
  - q: "Is reliability a property of the model?"
    a: "Mostly not. Retrieval design, citation, confidence signalling, fail-safe behaviour and governance determine reliability far more than model choice, which is often close to the least important decision."
seeAlso:
  - label: "CM-LRS on arXiv"
    url: "https://arxiv.org/html/2607.21340v1"
  - label: "The Checking Problem on arXiv"
    url: "https://arxiv.org/abs/2607.28666"
  - label: "Chief AI Officer"
    url: "/chief-ai-officer/"
  - label: "AI governance in banking"
    url: "/ai-governance-in-banking/"
  - label: "Agentic AI in capital markets"
    url: "/agentic-ai-in-capital-markets/"
---

## Plausible is not bankable

Ask any frontier model for a debt-terms table or an issuer profile and it will produce something that reads smoothly. Whether it survives a reviewer who checks every figure against the source documents is a different matter. That gap, between plausible and bankable, is where AI in regulated finance succeeds or fails.

## Measuring it: CM-LRS

The **Capital Markets LLM Reliability Score** evaluates LLM output at the workflow level across seven dimensions: factual accuracy, evidence traceability, numerical consistency, workflow completeness, source discipline, decision usefulness and reviewability. It was demonstrated across five capital-markets workflows and four models, scored by four independent LLM judges from three model families, with a deterministic verification script.

The finding with budget consequences: the leading frontier models were statistically indistinguishable on reliability, despite large differences in cost per call. Model choice should follow workflow fit and cost, not headline quality.

## Why production is harder than the demo

**The Checking Problem** tested six document-heavy workflows across four model families and three tool configurations, against two bars: one correct run, and sustained production-grade performance. 57 of 72 configurations cleared the first bar; only 32 cleared the second.

The more useful result concerns review. A system that states no confidence forces a human to check all of its output. Requiring it to cite sources and state a confidence cut the share needing review roughly in half. Reliability, in other words, is largely about how much checking a system leaves behind.

## Four marks of a reliable system

It shows its source. It is measurably right. It fails safely. It leaves a trail. None of these is a property of the model alone; all of them are design and governance choices.

## In practice

[Prerit Ahuja](/) is the author of both studies and applies them to production AI in DNB Carnegie's Investment Banking Division, where AI answers carry inline citations and ship under governance built for regulated use.
