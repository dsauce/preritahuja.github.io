---
title: "Capital Markets LLM Reliability Score (CM-LRS): From Plausible to Bankable"
date: 2026-05-14
slug: "cm-lrs-from-plausible-to-bankable"
draft: false
description: "A new evaluation framework for LLM outputs in regulated capital-markets workflows, with empirical results across four independent judges and five workflows."
tags: ["AI","Capital Markets","LLM","Evaluation"]
keywords: ["CM-LRS","LLM reliability","capital markets","investment banking AI"]
---

*A new evaluation framework for LLM outputs in regulated capital-markets workflows, with empirical results across four independent judges and five workflows.*

The question is rarely whether a frontier LLM can draft a debt-terms table, a comparable-transactions write-up, or an issuer profile that reads smoothly on first pass. They all can. The harder question is whether the draft is *bankable*: whether a banker, analyst, or compliance reviewer can defend it in front of a counter-party or a regulator with the underlying documents in hand.

CM-LRS evaluates LLM outputs at the workflow-output layer across seven reliability dimensions: factual accuracy, evidence traceability, numerical consistency, workflow completeness, source discipline, decision usefulness, and reviewability. Each is scored 0–5 against a rubric anchored on practical signals reviewers in regulated environments actually use.

## Bottom line for capital-markets buyers

Across five capital-markets workflows scored by four independent LLM judges from three model families: Anthropic Sonnet 4.6, Anthropic Opus 4.7, and OpenAI GPT-5.5 sit within 0.22 points of each other on a 5-point reliability scale (Sonnet 4.31, Opus 4.30, GPT-5.5 4.09). The open-weights baseline (Meta Llama 3.3 70B at 3.15) is last under every judge by roughly one point. The deployment-relevant choice between the three frontier models is determined by cost, latency, and workflow-class fit, not by headline reliability.

## What this means for deployment committees

Default to **Sonnet 4.6** for the standard workflow stack (DCM extraction, ECM extraction, retrieval, comparable-transactions reasoning). It hits top-of-cluster reliability at one-fifth the cost of Opus 4.7. **Route synthesis-class workloads to GPT-5.5** if a head-to-head test on your specific prompts confirms it (GPT-5.5 wins W3 issuer-profile synthesis by a clear margin). Use **Opus 4.7** only when latency tolerance is tight *and* budget is unconstrained; its reliability is the same as Sonnet's at five times the cost. **Llama 3.3 70B** is acceptable for sovereign-cloud / on-premise extraction (W1 gap is only 0.84 points) but unsafe for anything crossing document boundaries.

## Links

- **Paper (arXiv):** *Coming soon. The preprint link will be added once arXiv assigns the ID.*
- **Code, corpus, and four-judge scoring data:** [github.com/dsauce/cm-lrs](https://github.com/dsauce/cm-lrs)
- **Verification script:** [eval/verify_numbers.py](https://github.com/dsauce/cm-lrs/blob/main/eval/verify_numbers.py)
- **License:** CC BY 4.0
