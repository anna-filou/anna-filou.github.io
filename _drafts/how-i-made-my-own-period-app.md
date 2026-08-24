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

A super simple, web-based progressive web app called [Hema](https://hema-period.netlify.app/) (from the Greem αίμα, aima → hema, meaning “blood”). 

You can quasi “install” it as an app and use it offline, even though it’s technically a website. You can export and import your data as a JSON file. Thankfully, Clue also lets you export your data in JSON format, so all my periods from the past 9 years are already in it! You can't directly import Clue exports into Hema (yet), but it's trivial to give the file to an LLM like Claude or ChatGPT and ask it to convert it to Hema’s much simpler format.

It has everything I need—and nothing I don't:

- A calendar view where you can log your period with a single tap on the date. (No going through menus and no save buttons.)
- Optional flow heaviness tracking (tap again to adjust the flow) that's visually represented as taller and shorter bars. 
- A log page where I can see all of my previous periods and visually compare their duration. 
- Fertile window prediction that you can turn off.
- Monday as the default start of the week, with the option to change it to Sunday with a single tap.
- The ability to exclude periods if they're atypical so they don't mess up future predictions. 

What's the catch? 
- It doesn't have notifications, since I haven't found a reliable way of making PWA notifications work (even though it's supposedly possible).
- You have to remember to backup your data because it can't happen automatically. 

---


## Why I made it

I've been using the period tracking app [Clue](https://helloclue.com/) for almost 10 years now. And let me tell you, when I first started using it, I think it was pretty good. What stood out to me at the time was the neutral styling. Every other period app was using overly cutesy pink graphics with flowers and stickers, and that looked too childish for my taste. Clue’s styling was simple, using red to represent blood, blue to represent ovulation, and having no superfluous embellishments.

## The Deterioration of Clue

But with time, it slowly became [enshittified](https://en.wikipedia.org/wiki/Enshittification). Promoting the premium plan as a full-screen pop-up every time I opened the app was one thing, especially considering they often have promotions that make it very cheap. I even subscribed for a few years to make the pop-ups go away, and I think that's a fair exchange.

But that wasn’t the only thing. They started adding useless features like a “content” tab with articles like “Where is the clitoris?”. Considering the target audience, I found that **infantilizing**.

![Clue screenshots showing the content tab, Clue Plus promotions, and in-app survey and upsell modals](/assets/hema/clue-annoyances.png)

But what really made me think “I'm gonna make my own fucking app” for the first time was when they started sending me notifications like “It is now your luteal phase! Find out what's happening” that you cannot turn off unless you also turn off the period prediction reminders (which, come to think of it, I haven't been getting for months). [Android has had notification channels](https://developer.android.com/develop/ui/compose/notifications/channels) for over a decade. I asked them years ago in a review to use them. They even replied, but they never separated the useless from the useful notifications.

On top of all that, they kept promoting (using full-screen pop-ups and dismissible callouts) partnerships with fitness hardware that I wasn't using. And even though I kept indicating I wasn't interested, they kept showing them every single time I opened the app to track my period, which should take two seconds. But with the gradually deteriorating UI, it was starting to take minutes and a dozen taps.

<figure>
  <img src="/assets/hema/clue-oura-ring-banner.png" alt="Clue Oura Ring promotion banner, and a toast saying the banner has been hidden for 1 month">
  <figcaption>Tapping “Hide this banner” on the Oura Ring promotion notified me that the banner has been hidden for a month. I'm never gonna get an Oura ring; I don't wanna see this again in a month! And this is just one of their countless banners.</figcaption>
</figure>

Every few updates, they removed one by one features that I loved. For example, the period flow intensity used to be represented by taller and shorter bars in the calendar view. They changed that to a color coding system that I find much harder to parse at a glance. Not to mention minor, but also trivial to resolve, annoyances like not giving me the ability to set Monday as the first day of the week. It used to be possible to compare the length of your cycles visually, but for reasons unknown they removed that as well. 

<figure>
  <img src="/assets/hema/clue-trying-to-conceive-banner.png" alt="Clue banner reading “Trying to conceive? We're here to help.” with Hide this banner and Learn more actions">
  <figcaption>For a time they even kept asking me if I'm trying to conceive, which I found <strong>infuriating</strong> because I kept having to hide this banner and it kept coming back!</figcaption>
</figure>
