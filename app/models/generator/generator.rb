require 'fileutils'

class Generator
  def initialize(src, layout, context)
    @src = src
    @layout = layout
    @context = context
  end

  def generate(dst)
    src = @src
    @layout.frames.sort_by(&:z_order).each do |frame|
      src = frame.apply(src, @context[frame.name])
    end
    src.write(dst)
  end
end
