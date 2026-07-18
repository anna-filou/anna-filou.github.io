---
title: Listening
layout: default
lang: en
ref: listening
banner: /assets/metadata/listening-og.png
songs:
- title: introvert
  artist: brakence
  cover: /assets/listening/brakence-introvert.webp
  snippet: /assets/listening/snippet-01.mp3
- title: Doomed 
  artist: MAPHRA (BMTH COVER)
  cover: /assets/listening/maphra-doomed.webp
  snippet: /assets/listening/snippet-02.mp3
- title: Rote Flaggen
  artist: Berq
  cover: /assets/listening/berq-rote-flaggen.webp
  snippet: /assets/listening/snippet-06.mp3
- title: 2 Heads
  artist: Coleman Hell
  cover: /assets/listening/coleman-hell-2-heads.webp
  snippet: /assets/listening/snippet-07.mp3
- title: Mr. Jones
  artist: Counting Crows
  cover: /assets/listening/counting-crows-mr-jones.webp
  snippet: /assets/listening/snippet-08.mp3
- title: Nicotine
  artist: Panic! At The Disco
  cover: /assets/listening/panic-at-the-disco-nicotine.webp
  snippet: /assets/listening/snippet-10.mp3
- title: Hell On Earth
  artist: Iron Maiden
  cover: /assets/listening/iron-maiden-hell-on-earth.webp
  snippet: /assets/listening/snippet-04.mp3
- title: Picture Perfect
  artist: Escape the Fate
  cover: /assets/listening/escape-the-fate-picture-perfect.webp
  snippet: /assets/listening/snippet-09.mp3
- title: Emergency Contact
  artist: Pierce the Veil
  cover: /assets/listening/pierce-the-veil-emergency-contact.webp
  snippet: /assets/listening/snippet-12.mp3
- title: Fallen Angel (We're All Down Here Alone)
  artist: "NXCRE & The Villains"
  cover: /assets/listening/nxcre-fallen-angel.webp
  snippet: /assets/listening/snippet-11.mp3
- title: I Want to Break Free
  artist: Queen
  cover: /assets/listening/queen-i-want-to-break-free.webp
  snippet: /assets/listening/snippet-16.mp3
- title: Could Have Been Me
  artist: The Struts
  cover: /assets/listening/the-struts-could-have-been-me.webp
  snippet: /assets/listening/snippet-28.mp3
- title: World So Cold
  artist: 12 Stones
  cover: /assets/listening/twelve-stones-world-so-cold.webp
  snippet: /assets/listening/snippet-20.mp3
- title: Every You Every Me
  artist: Placebo
  cover: /assets/listening/placebo-every-you-every-me.webp
  snippet: /assets/listening/snippet-26.mp3
- title: The Space Between Our Eyes
  artist: SayWeCanFly
  cover: /assets/listening/saywecanfly-the-space-between-our-eyes.webp
  snippet: /assets/listening/snippet-27.mp3
- title: In the Name of Love
  artist: "Martin Garrix & Bebe Rexha"
  cover: /assets/listening/in-the-name-of-love.webp
  snippet: /assets/listening/snippet-03.mp3
- title: Monster
  artist: Jorge Rivera-Herrans
  cover: /assets/listening/jorge-rivera-herrans-monster.webp
  snippet: /assets/listening/snippet-05.mp3
# - title: King For a Day (ft. Kellin Quinn)
#   artist: Pierce the Veil
#   cover: /assets/listening/pierce-the-veil-king-for-a-day.webp
#   snippet: /assets/listening/snippet-13.mp3
- title: Props & Mayhem
  artist: Pierce the Veil
  cover: /assets/listening/pierce-the-veil-props-and-mayhem.webp
  snippet: /assets/listening/snippet-14.mp3
- title: Hero Of War
  artist: Rise Against
  cover: /assets/listening/rise-against-hero-of-war.webp
  snippet: /assets/listening/snippet-17.mp3
- title: House On Fire
  artist: Rise Against
  cover: /assets/listening/rise-against-house-on-fire.webp
  snippet: /assets/listening/snippet-18.mp3
- title: Meine Soldaten (MAXIM COVER)
  artist: Rogers
  cover: /assets/listening/rogers-meine-soldaten.webp
  snippet: /assets/listening/snippet-19.mp3
- title: Blazing
  artist: "Alex Sid, Quasamodo & Man Called Shadow"
  cover: /assets/listening/alex-sid-blazing.webp
  snippet: /assets/listening/snippet-21.mp3
- title: Can’t Get You Out of My Head (Cover)
  artist: "AnnenMayKantereit, Parcels"
  cover: /assets/listening/annenmaykantereit-cant-get-you-out-of-my-head.webp
  snippet: /assets/listening/snippet-22.mp3
- title: We Exist
  artist: Arcade Fire
  cover: /assets/listening/arcade-fire-we-exist.webp
  snippet: /assets/listening/snippet-23.mp3
- title: American Pie
  artist: Don McLean
  cover: /assets/listening/don-mclean-american-pie.webp
  snippet: /assets/listening/snippet-24.mp3
- title: Son of Man
  artist: Phil Collins
  cover: /assets/listening/phil-collins-son-of-man.webp
  snippet: /assets/listening/snippet-25.mp3
- title: Fell In Love With An Alien
  artist: The Kelly Family
  cover: /assets/listening/the-kelly-family-fell-in-love-with-an-alien.webp
  snippet: /assets/listening/snippet-29.mp3
- title: Valerie
  artist: Karen Souza
  cover: /assets/listening/karen-souza-valerie.webp
  snippet: /assets/listening/snippet-31.mp3
- title: Colors of the Wind
  artist: "Tokio Hotel & Disney"
  cover: /assets/listening/tokio-hotel-colors-of-the-wind.webp
  snippet: /assets/listening/snippet-30.mp3
- title: Looking Through Your Eyes
  artist: Bryan White and The Corrs
  cover: /assets/listening/bryan-white-looking-through-your-eyes.webp
  snippet: /assets/listening/snippet-15.mp3
---

<div class="container mt5 mb5 mt6-ns">
    <h1 class="f1">{{ page.title }}</h1>
    <div class="">
        <p>Snippets from some of my favorite songs in semi-random order.</p>
        <p>Click one to play! Also, here’s a <a target="_blank" href="https://www.youtube.com/playlist?list=PLThPR15_KIIXPE6sOrPQmqD7GBkPIvPQq">YouTube playlist</a> with these and more.</p>
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

<button type="button" class="listening-float-pause" aria-label="Stop music" hidden>
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" fill="currentColor"/></svg>
    <span>Stop music</span>
</button>

<script src="/assets/js/listening.js"></script>
