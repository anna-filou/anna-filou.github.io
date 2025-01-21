---
title: Responsive images without layout shift
date: 2025-01-21T00:00:00.000+00:00
categories:
- en
tags:
- code
layout: post
main-image: 
lang: en
---

I was scrolling through [my website’s Lighthouse report](https://pagespeed.web.dev/analysis/https-annafilou-com/cmu1d4q0nk?form_factor=desktop), as one does in the afternoon, and there I was once again confronted by the frustrating message that the images on my homepage were “lacking an explicit size”. 

***OF COURSE** they are*, I internally mumbled and rolled my eyes. *They’re **responsive**. Their size changes depending on their container and the browser window. I can’t possibly specify a fixed width and height in the HTML!*

Ever since I made some updates to my homepage (notably a CSS-only infinitely scrolling carousel and a clean grid of cards that link to case studies) my lighthouse score had been suffering. But the previous, not as fancy, iteration was close to 100%. I had already compressed my all the images as much as possible, and even converted them to webp, Google’s efficient image format. Yet the score was barely above 80%.

Defeated, I decided to click on Google’s [Learn how to imprave CLS](https://web.dev/articles/optimize-cls) out of curiosity. Skimming it, I started noticing the word “ratio” making frequent appearances. It got me thinking… what’s an image’s aspect ratio got to do with this? Lighthouse *and* VS Code are both telling me I need to set explicit, hard coded, `width` and `height` attributes. Unless…

[Further reading](https://blog.logrocket.com/jank-free-page-loading-with-media-aspect-ratios/) confirmed my lightbulb moment suspicion: if you’re directly manipulating an image’s width and height using CSS, then the browser only uses the `width` and `height` attributes in the HTML tag to infer its **aspect ratio**. 

Forgive my ignorance until now, but my mind was BLOWN.

I’d been lead to believe—by the inherently misleading attributes and messages, but also interactions with other people—that the width and height you specify in the HTML are immutable. I was even once told by someone who was tasked with developing a design of mine, that we’d need to have a fixed set of dimensions per breakpoint for each image. As they explained, Google penalizes layout shift, and if we declare that an image is “100% wide”, the browser does not know how much space (more importantly, height) to reserve for the it before it’s downloaded, making layout shift **innevitable**. 

That made sense to me so I went along. 

But what I learned today changes everything.

Yes, the browser can’t know the height of a not-yet-downloaded image if the only info we give it is `width: 100%;`. But suppose that we **also** tell it that the image’s **aspect ratio is 4:3**. Now the browser knows everything it needs to to reserve the right amount of space! 

To demonstrate, let’s say that, for simplicity’s sake, at the moment our website loads, the browser window is 432px. The `body`’s padding is 16px on each side, leaving 400px. The browser can now **infer** that the height of the image is 300px! If the browser window was 832px, then there would be 800px available for our image, and the browser would know it has to reserve exactly 600px for the image!

<div style="font-family: system-ui, -apple-system, sans-serif; max-width: 432px; margin: 0 auto; background: #f5f5f5; border-radius: 8px; overflow: hidden; border: 2px solid #2563eb; background: white; ">
  <!-- Container representing browser window -->

    <!-- Header showing browser chrome -->
    <div style="background: #e5e7eb; padding: 8px; border-bottom: 1px solid #d1d5db;">
      <div style="width: 60px; height: 12px; background: #9ca3af; border-radius: 6px;"></div>
    </div>
    
    <!-- Body with padding -->
    <div style="padding: 16px; position: relative;">
      <!-- Width indicators -->
      <div style="position: absolute; top: 4px; left: 16px; right: 16px; text-align: center; font-size: 14px; color: #4b5563;">
        400px available width
      </div>
      <div style="position: absolute; top: -20px; left: 0; right: 0; text-align: center; font-size: 14px; color: #6b7280;">
        432px window width
      </div>
      
      <!-- Image placeholder with 4:3 aspect ratio -->
      <div style="margin-top: 24px; background: #93c5fd; aspect-ratio: 4/3; width: 100%;">
        <div style="height: 100%; display: flex; align-items: center; justify-content: center; color: #1e40af; font-weight: 500;">
          4:3 aspect ratio
        </div>
      </div>
      
      <!-- Height indicator -->
      <div style="position: absolute; right: 0; top: 40px; bottom: 16px; width: 20px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #4b5563; writing-mode: vertical-rl; text-orientation: mixed;">
        300px height
      </div>
    </div>
</div>

And with that, my website’s performance score is back to 96%! 
![](/uploads/lighthouse-2025-01-21.webp)

---

I initially had some reservations about posting this. I felt almost embarassed to discover I was missing something so critical for years. But after discovering that a web dev friend of mine was also unaware of this, I decided to post it, in case it helps anyone. 

If you found this useful, I’d love to know—hit me up!