---
title: Listening
layout: default
lang: en
ref: listening
banner: /assets/metadata/listening-og.png
songs:
- title: introvert
  artist: brakence
  cover: /assets/listening/brakence-introvert.png
  snippet: /assets/listening/snippet-01.mp3
- title: Doomed 
  artist: MAPHRA (BMTH COVER)
  cover: /assets/listening/maphra-doomed.jpg
  snippet: /assets/listening/snippet-02.mp3
- title: In the Name of Love
  artist: "Martin Garrix & Bebe Rexha"
  cover: /assets/listening/in-the-name-of-love.jpg
  snippet: /assets/listening/snippet-03.mp3
- title: Hell On Earth
  artist: Iron Maiden
  cover: /assets/listening/iron-maiden-hell-on-earth.jpg
  snippet: /assets/listening/snippet-04.mp3
- title: Monster
  artist: Jorge Rivera-Herrans
  cover: /assets/listening/jorge-rivera-herrans-monster.jpg
  snippet: /assets/listening/snippet-05.mp3
- title: Rote Flaggen
  artist: Berq
  cover: /assets/listening/berq-rote-flaggen.jpg
  snippet: /assets/listening/snippet-06.mp3
- title: 2 Heads
  artist: Coleman Hell
  cover: /assets/listening/coleman-hell-2-heads.jpg
  snippet: /assets/listening/snippet-07.mp3
- title: Mr. Jones
  artist: Counting Crows
  cover: /assets/listening/counting-crows-mr-jones.jpg
  snippet: /assets/listening/snippet-08.mp3
- title: Picture Perfect
  artist: Escape the Fate
  cover: /assets/listening/escape-the-fate-picture-perfect.jpg
  snippet: /assets/listening/snippet-09.mp3
- title: Nicotine
  artist: Panic! At The Disco
  cover: /assets/listening/panic-at-the-disco-nicotine.jpg
  snippet: /assets/listening/snippet-10.mp3
- title: Fallen Angel (We're All Down Here Alone)
  artist: "NXCRE & The Villains"
  cover: /assets/listening/nxcre-fallen-angel.jpg
  snippet: /assets/listening/snippet-11.mp3
- title: Emergency Contact
  artist: Pierce the Veil
  cover: /assets/listening/pierce-the-veil-emergency-contact.jpg
  snippet: /assets/listening/snippet-12.mp3
- title: King For a Day (ft. Kellin Quinn)
  artist: Pierce the Veil
  cover: /assets/listening/pierce-the-veil-king-for-a-day.jpg
  snippet: /assets/listening/snippet-13.mp3
- title: Props & Mayhem
  artist: Pierce the Veil
  cover: /assets/listening/pierce-the-veil-props-and-mayhem.jpg
  snippet: /assets/listening/snippet-14.mp3
- title: Looking Through Your Eyes
  artist: Bryan White and The Corrs
  cover: /assets/listening/bryan-white-looking-through-your-eyes.jpg
  snippet: /assets/listening/snippet-15.mp3
- title: I Want to Break Free
  artist: Queen
  cover: /assets/listening/queen-i-want-to-break-free.jpg
  snippet: /assets/listening/snippet-16.mp3
- title: Hero Of War
  artist: Rise Against
  cover: /assets/listening/rise-against-hero-of-war.jpg
  snippet: /assets/listening/snippet-17.mp3
- title: House On Fire
  artist: Rise Against
  cover: /assets/listening/rise-against-house-on-fire.jpg
  snippet: /assets/listening/snippet-18.mp3
- title: Meine Soldaten (MAXIM COVER)
  artist: Rogers
  cover: /assets/listening/rogers-meine-soldaten.jpg
  snippet: /assets/listening/snippet-19.mp3
---

<div class="container mt5 mb5 mt6-ns">
    <h1 class="f1">{{ page.title }}</h1>
    <div class="">
        <p>Snippets from some of my favorite songs. Click one to play!</p>
        <p>This list is nothing close to complete but I wanted to start somewhere!</p>
        <p>Here’s a <a target="_blank" href="https://www.youtube.com/playlist?list=PLThPR15_KIIXPE6sOrPQmqD7GBkPIvPQq">YouTube playlist</a> with these songs and more.</p>
    </div>
</div>

<div class="container pb5 pb6-ns">
    <div class="listening-grid">
        {% for song in page.songs %}
        <div class="listening-card{% if song.snippet %} listening-card--playable{% endif %}"{% if song.snippet %} role="button" tabindex="0" aria-label="Play {{ song.title | escape }} by {{ song.artist | escape }}"{% endif %}>
            <div class="listening-cover-wrap br3 ba b--faint grow">
                <img src="{{ song.cover }}" alt="{{ song.title | escape }} by {{ song.artist | escape }}" class="listening-cover" width="300" height="300" loading="lazy" decoding="async">
                {% if song.snippet %}
                <audio class="listening-audio" preload="metadata" src="{{ song.snippet }}"></audio>
                <span class="listening-control" aria-hidden="true">
                    <span class="listening-control__icon">
                        <svg class="listening-control__play" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M8 5.14v14.72L19 12 8 5.14z" fill="currentColor"/></svg>
                        <svg class="listening-control__pause" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" fill="currentColor"/></svg>
                    </span>
                </span>
                {% endif %}
            </div>
            <h2 class="f5 fw6 lh-title mt2 mb0">{{ song.title }}</h2>
            <p class="listening-artist f6 secondary ma0 mb2">{{ song.artist }}</p>
        </div>
        {% endfor %}
    </div>
</div>

<script src="/assets/js/listening.js"></script>
