module Generator
  class OverlayFrame < Frame
    def apply(src, value)
      bg = src
      binding.pry
      layer = MiniMagick::Image.new(local_file(value))
      result = bg.composite(layer) do |c|
        c.compose 'Over'
        c.geometry "#{width}x#{height}+#{top_left.x}+#{top_left.y}"
      end
      result.format('png')
      result
    end
  end
end
