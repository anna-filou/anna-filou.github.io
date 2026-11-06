---
title: It doesn't matter if the data is encrypted
date: 2026-11-06T00:00:00.000+00:00
tags:
- essay
layout: post
icon: /assets/blog/email-encryption/unlocked-padlock-emoji.png
---

I'm checking out an AI email assistant that reads your emails and automatically drafts a response for you to approve and send.

Of course, anyone thinking about using it would be worried about data safety and privacy. The company has the following to say:

> All emails and data are encrypted both in transit and at rest, ensuring your communication stays private.

That is **highly** misleading for non-technical audiences.

Encryption scrambles data so you need a key to read it. So if the company holds the key, it can read everything.

Encrypted “in transit” means while your data travels between computers (e.g. from your laptop to the company’s server). Encrypted “at rest” means while it’s stored.

Encryption keeps data private only in a narrow sense: no man-in-the-middle can intercept it in transit. But nobody is worried about that. They're worried about the AI consuming their emails—and about company employees potentially seeing them too.

My question isn't whether my emails are encrypted but who can read them.

Encrypting data at rest tells me nothing about whether the company can read my emails. It doesn't matter if the data is encrypted if an employee can decrypt it. It doesn't matter if emails are encrypted if the AI has to read them to provide the service. It matters if you're worrying about police seizing the company servers and reading your emails, but that's not what you're worried about, is it?

Using encryption as a marketing point is reminiscent of how VPN services sell themselves as a magic fix that makes everything you do online secure. Technically, what they say in the ads is true (“a VPN creates an encrypted tunnel…” blah blah blah). But given **how** they say it, and how little technical knowledge the average viewer has, most people's takeaway is that a VPN makes you virtually undetectable—which is just not the case.

Of course it's good to encrypt data whenever possible. I'm not saying companies shouldn't advertise it. But when your FAQ asks “are my emails secure?” and answers “yes, absolutely—we use encryption,” you're dodging the real question in a way that makes less technical people think you've answered it. I find that highly unethical.
