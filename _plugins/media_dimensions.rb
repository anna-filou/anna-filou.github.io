# Automatic media dimensions
#
# `_plugins/media_dimensions.rb` adds image and video dimensions to generated HTML
# during every normal Jekyll build. Write Markdown images and HTML media as usual;
# no dimensions or Liquid tags are needed in posts. Local files are read with
# FastImage (images) and FormatParser (MP4/MOV video), with no FFmpeg installation.
# The plugin also adds video aspect ratios and preserves explicit dimensions and
# inline styles. Remote media is left untouched; unsupported files log a warning.
#
# Netlify installs the dependencies from `Gemfile.lock`; the existing
# `bundle exec jekyll build` command loads the plugin automatically. Custom plugins
# require a normal build (not Jekyll's `--safe` mode).
#
# Verify after a build with `bundle exec ruby scripts/check-media-dimensions.rb`.

require 'fastimage'
require 'format_parser'
require 'nokogiri'
require 'uri'

module SiteMediaDimensions
  class Processor
    def initialize(site)
      @site = site
      @cache = {}
    end

    def process(page)
      return unless page.output_ext == '.html' && page.output.include?('<')

      html = Nokogiri::HTML5.parse(page.output)
      changed = false
      html.css('img, video').each do |node|
        next if node.name == 'img' && node['width'] && node['height']

        src = node['src'] || node.at_css('source[src]')&.[]('src')
        path = local_path(src, page.url)
        next unless path

        size = dimensions(path, node.name)
        next unless size

        width, height = size
        # Preserve explicit sizing; derive a missing dimension at the same ratio.
        if node['width'] && !node['height']
          next unless node['width'].match?(/\A\d+\z/)
          node['height'] = (node['width'].to_f * height / width).round.to_s
        elsif node['height'] && !node['width']
          next unless node['height'].match?(/\A\d+\z/)
          node['width'] = (node['height'].to_f * width / height).round.to_s
        elsif !node['width'] && !node['height']
          node['width'], node['height'] = width.to_s, height.to_s
        end
        if node.name == 'video' && !node['style'].to_s.match?(/(?:\A|;)\s*aspect-ratio\s*:/i)
          style = node['style'].to_s.strip.sub(/;?\z/, ';')
          node['style'] = "#{style} aspect-ratio: #{width} / #{height};".sub(/\A;\s*/, '')
        end
        changed = true
      end
      page.output = html.to_html if changed
    end

    def local_path(src, page_url)
      return if src.nil? || src.empty? || src.start_with?('//')
      uri = URI.parse(src)
      return if uri.scheme || uri.host || uri.path.to_s.empty?

      url = URI.join('https://local.invalid', page_url, uri.path).path
      base = @site.baseurl.to_s.sub(%r{/\z}, '')
      url = url.delete_prefix(base) if !base.empty? && url.start_with?(base + '/')
      relative = URI::DEFAULT_PARSER.unescape(url).sub(%r{\A/+}, '')
      source = File.realpath(@site.source)
      path = File.expand_path(relative, source)
      return unless path.start_with?(source + File::SEPARATOR) && File.file?(path)
      return unless File.realpath(path).start_with?(source + File::SEPARATOR)

      path
    rescue URI::InvalidURIError
      nil
    end

    def dimensions(path, kind)
      return @cache[path] if @cache.key?(path)

      size = if kind == 'video'
               File.open(path, 'rb') do |file|
                 info = FormatParser.parse(file, natures: [:video])
                 [info&.width_px, info&.height_px]
               end
             else
               FastImage.size(path)
             end
      unless size && size.all? { |value| value.is_a?(Numeric) && value.positive? }
        Jekyll.logger.warn 'Media dimensions:', "Could not read #{path}"
        size = nil
      end
      @cache[path] = size&.map { |value| value.round }
    rescue StandardError => error
      Jekyll.logger.warn 'Media dimensions:', "#{path}: #{error.message}"
      @cache[path] = nil
    end
  end
end

Jekyll::Hooks.register :site, :post_render do |site|
  processor = SiteMediaDimensions::Processor.new(site)
  (site.pages + site.collections.values.flat_map(&:docs)).each do |page|
    processor.process(page)
  end
end
