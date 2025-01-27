---
title: 'Video: Mobile menus that don’t break without JavaScript'
date: 2025-01-23T00:00:00.000+00:00
categories:
- en
tags:
- code
layout: post
main-image: 
lang: en
---

<iframe src="https://share.descript.com/embed/xMBE7vCaaQF"  width="100%" height="360" frameborder="0" allowfullscreen></iframe>

---

Have you ever visited a website on your phone, tapped the menu icon, and then… nothing happened? This usually happens because the menu relies entirely on JavaScript to work. If the JavaScript file doesn’t load, the menu does not work.  

Why wouldn’t the JavaScript load? Maybe the visitor has a spotty connection—perhaps they’re on a train. In any case, not a great look.  

---

## What's going on?  

Sometimes, mobile menu buttons are simple `<div>` elements. Since a `<div>` is just a generic container, it doesn’t do anything on its own. Developers use JavaScript to tell the browser, “Hey, when someone clicks on this, open the menu.” But if the JavaScript doesn’t load, that won’t work.  

---

## A better way  

> Instead of using a `<div>`, you can use a link—an `<a>` tag. Then, even if the JavaScript fails to load, the link will still work. And you can set it up to take the visitor to a backup menu page.  

Here’s how I handle this on my own site:  

### HTML  
The menu icon is wrapped in an `<a>` tag that links to a dedicated menu page.  

```html
<a href="/menu" id="menu-icon">Menu</a>
```  

### JavaScript  
If JavaScript is enabled, I use it to block the link’s default action and have clicking it open a menu instead.  

```javascript
document.getElementById('menu-icon').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the link's default behavior
  // Code to open the menu
});
```  

That way, if JavaScript doesn’t load, the browser falls back to the default link behavior, and the visitor can still access the menu.  

---

## Why This Is Important  

You might think there’s no way anyone is going to be visiting your website without JavaScript. But it’s happened to me many, many times, so chances are it’s going to happen to your visitors as well.  

> If you have a bad connection—like when you’re on a train or in a remote area—JavaScript is the last thing the browser cares about! It might download the HTML and CSS, but leave out the JS.

With the link approach, you make your site more resilient, and you respect your visitors. 

---

## Don’t Forget to Test  

We spend so much time optimizing our websites for the best-case scenario, but we often forget to test them with JavaScript disabled. If you take a few minutes to do that, it’s so easy to catch and fix issues like this! 

The web wasn’t meant to rely on JavaScript for everything, and a simple marketing site shouldn’t have to either.
