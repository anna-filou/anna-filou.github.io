---
title: "How I generate color scales in CSS with OKLCH"
date: 2025-05-13T00:00:00.000+00:00
categories:
- en
tags:
- code
layout: post
main-image: 
lang: en
---

![](/assets/anna-color-scale-css.webp)

## The idea

I wanted to create a single variable in my CSS, e.g. `--brand: ##ff6800;`, and have an entire color scale (with variables like `--brand-10: #ffe4d3; --brand-20: #ffd2b2;` and so on) automatically “generated” for me. Like this! ⤵︎

![](/assets/color-scale-example.webp)

Similar to what you get from sites like [uicolors.app’s Tailwind CSS Color Generator](https://uicolors.app/generate), but locally, in your CSS file. 

Why? When playing around with a new design, not yet sure which colors to go with, being able to tweak a couple of values direcly in my CSS and preview my own design in different colors would be super practical.

Now, you *might* be wondering:

## What is OKLCH?

These people have done a much better job explaining than I could at the moment:

- [OK, OKLCH: a color picker made to help think perceptively, by Evil&nbsp;Martians](https://evilmartians.com/chronicles/oklch-a-color-picker-made-to-help-think-perceptively)

    “OKLCH is **a new way of encoding colors** (like HEX, RGBA, or HSL). It always has predictable lightness after color transformations (compared to HSL), it’s capable of encoding a wider range of colors, it offers native browser support, and unlike LCH and Lab, **it has no hue shift** when chroma is&nbsp;changed.”

- [It's Time to Learn oklch Color, by Keith J. Grant](https://keithjgrant.com/posts/2023/04/its-time-to-learn-oklch-color/)

    “In HSL, 100% saturation is simply as saturated as that particular color can be in the sRGB gamut. In OKLCH, the values aren't based on technical limits or a mathematical definition, but rather on perceived equality. **The amount of lightness indicates exactly how bright the color is**, and the amount of chroma indicates exactly how vivid it is. The human eye perceives some colors like green or yellow to be brighter than others, like blue or purple, and OKLCH takes these details into account.”

The gist of it is that, similar to HSL, you can keep the Hue constant while adjusting the Lightness and Saturation (Chroma, in this case) independetnly. What sets OKLCH apart is that, unlike HSL and the others, all colors with the same hue **actually look like they have the saem hue**! You know how making a vibrant blue lighter makes it look purple? Well, in OKLCH it still lookes blue! 

<figure>
  <img
    src="/assets/blue-hue-difference-atmos.webp"
    alt="Difference between a blue color scale in LCH vs OKLCH" />
  <figcaption>Image from <a href="https://atmos.style/blog/lch-vs-oklch">atmos.style</a></figcaption>
</figure>

You can also use `oklch(from…)` to convert HEX, RGB, etc. colors into OKLCH and *then* mess with their Lightness, Chroma, and Hue.

## What I did

Firstly, I used the numbering format from the Tailwind color scales for familiarity.
Then I tried using `oklch(from…)` and adjusting the Alpha value to create a scale. But then colors on the scale could not be darker than the original. And if they ever overlap (think, text color with 80% opacity + background at 30%) then the color on top will be a mix of the two!

So I switched to using `calc()` instead of L and C values within `oklch()` and keeping the hue value the same.
I first created a color scale using an online generated, then converted to OKLCH and used a preadsheet to calculate the different between the Lightness and Chroma values of each color. I rounded those up and created variables in my CSS to replesnt the Lightness increment and the Chrome increment separately.

![](/assets/color-scale-excel.webp)

```scss
:root {

    /* Base color */
   --brand: #0d1bbd;

    /* Lightness and Chroma increments */
    --l-increment: 0.075; /* UP: Lighter*/
    --c-increment: 0.028; /* UP: LESS saturated*/

    /* Some of the resulting color tokens */
    --bg-brand-50: oklch(from var(--brand) calc(l + calc(var(--l-increment) * 8)) calc(c - calc(var(--c-increment) * 8)) h / 1);
    /* … */
    --bg-brand-800: oklch(from var(--brand) l c h / 1); /* This is the base color */
    /* … */
    --bg-brand-950: oklch(from var(--brand) calc(l - calc(var(--l-increment) * 2)) calc(c - calc(var(--c-increment) * 2)) h / 1);

}
```

That seemed to work exactly how I imagined! 

For that specific color…

## Obstacles

Obvious in hindsight: that method only works if the base colors all have similar Lightness and Chroma. There’s no way to create conditional statements (“if this, then that”) in CSS, so a base color would always have to occupy the same step on the color scale.

That can be sorted by spending a bit of extra time choosing base colors. Problem solved? Not so fast! Because of the way OKLCH works, some HEX/RGB/HSL colors do not have an OKLCH equivalent!

<figure> 
    <img src="/assets/hsl-vs-oklch.webp" alt="Difference between a blue color scale in LCH vs OKLCH" /> 
    <figcaption>
        Image from <a href="https://evilmartians.com/chronicles/oklch-a-color-picker-made-to-help-think-perceptively">evilmartians.com</a>
    </figcaption> 
</figure>

`oklch(from…)` works by converting, say, a HEX value into OKLCH. But that means if you’re using HEX for your base variables, some colors are bound to look less saturated than the rest even if you max out their saturation in the HEX color space.

![](/assets/color-scale-saturation.webp)

## Solution

Switch to OKLCH for the base color variables. Then you can make sure the lightness and chroma of each color are the same, or close enough. Now, you do miss out on a couple of things when you do that…

- You can’t just enter any color you like and get a color scale. You need to find its OKLCH Hue and input that instead. The original color might not even be part of the resulting color scale.
- Design tools like Figma do not support OKLCH, so you have to figure out the hue by other means.
- Code editors like VS Code don’t natively preview OKLCH colors like they do HEX, RGB, etc. You need to install an extension if you want that, but it can really slow down the app.

But hey—it works! :D And changing a single number to get an entirely new color scale is kinda fun, like a design nerd’s slot machine. I figured this technique might be useful (and/or fun) to someone, so why not share.

Here’s the CSS you can use:

```css
:root {

    /* Base colors */
    /* Change the HUE (last number) for different colors. */
    /* You might wanna change the Lightness and Chroma slightly too in some cases. */
    --brand: oklch(0.40 0.30 265.71);

    /* add more variables here */

    /* Adjuts scales */
    --l-increment: 0.075; /* UP: Lighter*/
    --c-increment: 0.028; /* UP: LESS saturated*/

    /* Color tokens */
    /* Use them in classes like this: var(----bg-brand-600) */
    --bg-brand-50: oklch(from var(--brand) calc(l + calc(var(--l-increment) * 8)) calc(c - calc(var(--c-increment) * 8)) h / 1);
    --bg-brand-100: oklch(from var(--brand) calc(l + calc(var(--l-increment) * 7)) calc(c - calc(var(--c-increment) * 7)) h / 1);
    --bg-brand-200: oklch(from var(--brand) calc(l + calc(var(--l-increment) * 6)) calc(c - calc(var(--c-increment) * 6)) h / 1);
    --bg-brand-300: oklch(from var(--brand) calc(l + calc(var(--l-increment) * 5)) calc(c - calc(var(--c-increment) * 5)) h / 1);
    --bg-brand-400: oklch(from var(--brand) calc(l + calc(var(--l-increment) * 4)) calc(c - calc(var(--c-increment) * 4)) h / 1);
    --bg-brand-500: oklch(from var(--brand) calc(l + calc(var(--l-increment) * 3)) calc(c - calc(var(--c-increment) * 3)) h / 1);
    --bg-brand-600: oklch(from var(--brand) calc(l + calc(var(--l-increment) * 2)) calc(c - calc(var(--c-increment) * 2)) h / 1);
    --bg-brand-700: oklch(from var(--brand) calc(l + calc(var(--l-increment) * 1)) calc(c - calc(var(--c-increment) * 1)) h / 1);
    --bg-brand-800: oklch(from var(--brand) l c h / 1);
    --bg-brand-900: oklch(from var(--brand) calc(l - calc(var(--l-increment) * 1)) calc(c - calc(var(--c-increment) * 1)) h / 1);
    --bg-brand-950: oklch(from var(--brand) calc(l - calc(var(--l-increment) * 2)) calc(c - calc(var(--c-increment) * 2)) h / 1);

}
```

---

## Disclosure 
I originally planned to name this post “What I learned making an OKLCH color scale generator in CSS” and it was gonna have a section titled “Why it failed”. While writing that I realized… I had not failed. I just needed to tweak some Chroma values (and mention some caveats)! ;)

### Special thanks…
…to [Dragos](https://github.com/dragos-efy/efy) for nagging me about how cool OKLCH is for months, until I checked it out. 😁