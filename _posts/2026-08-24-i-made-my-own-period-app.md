---
title: I made my own period app
date: 2026-08-24T00:00:00.000+00:00
categories:
- en
tags:
- essay
layout: post
main-image:
icon: /assets/blog/period-app.png
lang: en
---

![Hema app icon on a phone home screen dock, between Phone and Safari](/assets/hema/hema-homescreen-icon.png)

## TL;DR

Clue started getting on my nerves, so I made my own alternative, [Hema](https://hema-period.netlify.app/). It’s a free, [open-source](https://github.com/anna-filou/period-tracker) web app that works offline. You can export and import your data as a JSON file.

---

## What I made

![Three phone screenshots of Hema showing the calendar, log, and settings views](/assets/hema/hema-screens.png)

A super simple progressive web app called [Hema](https://hema-period.netlify.app/) (from the Greek αίμα, aima → hema, meaning “blood”).

You can quasi “install” it and use it offline, even though it’s technically a website. You can export and import your data as JSON. Thankfully Clue also exports JSON, so all my periods from the past 9 years are already in it. You can’t import Clue exports directly into Hema (yet), but it’s trivial to hand the file to an LLM and ask it to convert it to Hema’s much simpler format.

It has everything I need and nothing I don’t:

- A calendar where you log your period with a single tap. No menus, no save buttons.
- Optional flow heaviness (tap again to adjust), shown as taller and shorter bars.
- A log page to see previous periods and visually compare their duration.
- Fertile window prediction you can turn off.
- Monday as the default start of the week (or Sunday, one tap).
- The ability to exclude atypical periods so they don’t mess up predictions.

What’s the catch?

- No notifications. I haven’t found a reliable way to make PWA notifications work (even though it’s supposedly possible).
- You have to remember to back up your data; it can’t happen automatically.

---

## Why I made it

I’ve been using [Clue](https://helloclue.com/) for almost 10 years. When I first started, it was pretty good. What stood out at the time was the neutral styling: red for blood, blue for ovulation, no flowers, stickers, or cutesy pink graphics. Every other period app looked too childish for my taste.

## The deterioration of Clue

But over the years it slowly became [enshittified](https://en.wikipedia.org/wiki/Enshittification).

Full-screen premium pop-ups every time I opened the app were one thing (devs have to make money after all, that’s fair). But then came a “content” tab with articles like “Where is the clitoris?” (which, considering the target audience, I find **infantilizing**), constant promos for new features I didn’t want, surveys, and partnerships with hardware I wasn’t using.

![Clue screenshots showing the content tab, Clue Plus promotions, and in-app survey and upsell modals](/assets/hema/clue-annoyances.png)

But what really made me think “I’m gonna make my own fucking app” was the notifications like “It is now your luteal phase! Find out what’s happening”, which you can’t turn off without also disabling the period prediction reminders. 

<figure>
  <img src="/assets/hema/clue-phase-notifications.png" alt="Clue push notifications about early luteal and late follicular phases">
  <figcaption><a href="https://developer.android.com/develop/ui/compose/notifications/channels">Android has had notification channels</a> for over a decade. I asked Clue years ago in a review to use them. They even replied, but nothing came of it.</figcaption>
</figure>

<figure>
  <img src="/assets/hema/clue-oura-ring-banner.png" alt="Clue Oura Ring promotion banner, and a toast saying the banner has been hidden for 1 month">
  <figcaption>Tapping “Hide this banner” on the Oura Ring promotion notified me that the banner has been hidden for a month. I’m never gonna get an Oura ring; I don’t wanna see this again in a month! And this is just one of their countless banners.</figcaption>
</figure>

<figure>
  <img src="/assets/hema/clue-trying-to-conceive-banner.png" alt="Clue banner reading “Trying to conceive? We're here to help.” with Hide this banner and Learn more actions">
  <figcaption>For a time they even kept asking me if I’m trying to conceive, which I found <strong>infuriating</strong> because I kept having to hide this banner and it kept coming back!</figcaption>
</figure>

Meanwhile, every few updates, features I liked disappeared. For example, flow intensity used to be represented by taller and shorter bars in the calendar—now it’s color-coding that’s harder to parse at a glance. You used to be able to compare cycle lengths visually; that vanished too. And still no way to set Monday as the first day of the week!

All in all, I was getting more and more frustrated with Clue, until this weekend, when I told myself enough is enough and got to work with Cursor. 