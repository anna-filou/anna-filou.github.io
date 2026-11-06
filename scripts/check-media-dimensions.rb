# Run with: bundle exec ruby scripts/check-media-dimensions.rb
require 'jekyll'
require_relative '../_plugins/media_dimensions'

Site = Struct.new(:source, :baseurl)
Page = Struct.new(:output, :url, :output_ext)
site = Site.new(File.expand_path('..', __dir__), '/preview')
processor = SiteMediaDimensions::Processor.new(site)
page = Page.new(<<~HTML, '/preview/jest-website/', '.html')
  <!doctype html><html><body>
  <img id="image" src="/preview/assets/jest-website/homepage-hero.webp?version=1">
  <img id="relative" src="../assets/jest-website/homepage-hero.webp">
  <img id="explicit" src="/assets/jest-website/homepage-hero.webp" width="100" height="75">
  <img id="partial" src="/assets/jest-website/homepage-hero.webp" width="100">
  <img id="remote" src="https://example.com/image.webp">
  <img id="missing" src="/assets/missing.webp">
  <video id="video" style="border-radius: 12px"><source src="/assets/jest-website/homepage-scroll.mp4"></video>
  <video id="styled" src="/assets/jest-website/homepage-scroll.mp4" style="aspect-ratio: 1 / 1;"></video>
  <pre><code>&lt;img src="/assets/example.png"&gt;</code></pre>
  </body></html>
HTML
processor.process(page)
html = Nokogiri::HTML5.parse(page.output)
def assert(condition, message)
  raise message unless condition
end
%w[image relative].each do |id|
  assert(html.at_css("##{id}").attributes.values_at('width', 'height').map(&:value) == %w[2000 1136], "#{id} dimensions")
end
assert(html.at_css('#explicit').attributes.values_at('width', 'height').map(&:value) == %w[100 75], 'Explicit size preserved')
assert(html.at_css('#partial')['height'] == '57', 'Partial size keeps ratio')
%w[remote missing].each { |id| assert(!html.at_css("##{id}")['width'], "#{id} untouched") }
assert(html.at_css('#video').attributes.values_at('width', 'height').map(&:value) == %w[1080 754], 'Source video dimensions')
assert(html.at_css('#video')['style'].include?('border-radius: 12px; aspect-ratio: 1080 / 754;'), 'Video styles preserved')
assert(html.at_css('#styled')['style'] == 'aspect-ratio: 1 / 1;', 'Explicit ratio preserved')
assert(html.at_css('code').text == '<img src="/assets/example.png">', 'Code example preserved')
first_output = page.output.dup
processor.process(page)
assert(page.output == first_output, 'Repeated processing is stable')
# Guard against traversal, encoded traversal and remote fetches.
%w[/%2e%2e/Gemfile https://example.com/a.png //example.com/a.png data:image/png;base64,x].each do |src|
  assert(processor.local_path(src, '/').nil?, "Unsafe/non-media path #{src}")
end
# Check rendered Markdown and HTML media from the real build.
html = Nokogiri::HTML5.parse(File.read(File.join(site.source, '_site/jest-website/index.html')))
media = html.css('article main img, article main video')
assert(media.size == 9, 'Expected all nine Jest media elements')
assert(media.all? { |node| node['width'].to_i.positive? && node['height'].to_i.positive? }, 'Generated Jest dimensions')
puts 'Media dimensions checks passed.'
