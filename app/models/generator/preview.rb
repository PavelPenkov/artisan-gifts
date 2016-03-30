require 'fileutils'
require 'tmpdir'

module Generator
  class Preview
    def self.from_json(doc)
      l = Generator::Layout.from_json(doc[:layout])
      c = Generator::Context.from_json(doc[:context])
      Preview.new(l,c)
    end

    def initialize(layout, context)
      tmp = MiniMagick::Image.open(layout.background)
      tmp.format('png')
      name = tmp_name
      tmp.write(name)
      @src = MiniMagick::Image.new(name)

      @layout = layout
      @context = context
    end

    def generate
      dst = tmp_name
      src = @src
      @layout.frames.sort_by(&:z_order).each do |frame|
        src = frame.apply(src, @context[frame.param])
      end
      src.write(dst)
      dst
    end

    def tmp_name
      tmp_path = nil
      Dir::Tmpname.create('artisan') do |path|
        tmp_path = path
      end
      tmp_path + '.png'
    end
  end
end
