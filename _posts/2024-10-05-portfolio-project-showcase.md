---
title: Improving the showcase of projects on my portfolio
date: 2024-10-05T00:00:00.000+00:00
categories:
- en
tags:
- product design
layout: post
main-image: 
lang: en
---

## Context
I wanted to improve how my portfolio shows previews of my projects, making it easier for visitors to see what I can do. My old grid layout wasn’t engaging enough. Many of the cards didn’t provide enough context, making it hard for visitors to understand my work. Sure, most cards were clickable, but most lead to the project‘s live website, so my involvement was still unclear.

![](/uploads/portfolio-ux-before.webp)

## Solution
I switched to a horizontal scrolling layout for each project.

<video autoplay loop muted src="/uploads/portfolio-projects-after.mp4" class="w-100 br3"></video>

### More images
Each project now has several images, giving a better idea of my work. That in turn might lead to more interest.

### Space for informative descriptions
There’s more space to explain what I did, the skills I used, and the impact of each project.

### Clear navigation and mental model
Separate buttons link to the case study and the live website. If neither is available, there are no buttons. Now expectations are clear. 

In the grid layout the entire card was clickable, and in it there was a small piece of text reading either “Case&nbsp;study&nbsp;→” or “Live&nbsp;↗”, but a lot of people didn’t notice them. 

Reminder: when you make something youself, you pay attention to all the details, no matter how tiny. When others see it, they first notice the obvious things, and most won’t be interested enough to look for the details. Guide them, show them what you want them to see.

## Unexpected issues

After I was done, I realized, horizontal scrolling is nice and all *if you have a multi-directional trackpad*, but what if you have a typical mouse instead?

I had to add a way to either drag or click to scroll. Considering that dragging to scroll with a mouse feels forced, I opted for clicking. 

<video autoplay loop muted src="/uploads/portfolio-projects-hover.mp4" class="w-100 br3"></video>

Alas, it wasn’t that simple. I tried set it up so that the right arrow would only appear when it’s possible to scroll right, and vice versa. But that sometimes didn’t work and the arrow never appeared. After an excuciatingly long “conversation” with ChatGPT, the issue was solved when I wrapped the entire JS script in this:

```js
window.addEventListener('load', () => { }
```

Such a simple solution, yet it almost drove me insane!

Finally done, but now I wonder how discoverable that “feature” is. Will visitors instinctively know to go towards the right to scroll? I might have to revise the whole thing and make the arrows always visible. But I’m hesistant to make another round of changes after seeing how long this one took…

## Conclusion
Theoretically, the new layout helps engage visitors better. 

To find out, whenever I know someone has visited my website, I’ll ask them what they thought of the way the projects are presented. 

This also seems like a good chance to try out A/B testing and compare the time visitors spent on the page and which links they clicked on. I might do that (it requires some additional setup on my Jekyll “backend”), but it still couldn’t tell me the most important thing: to what degree do visitors understand what my skills are?

PS: [Here’s the previous version of the homepage](https://66ffd8b28cd2140008bd1125--annafilou.netlify.app/) with the grid layout.