require 'securerandom'
require 'mini_magick'

class Frame
  attr_accessor :top_left, :bottom_right, :name

  def z_order
    @z_order || 0
  end

  def z_order=(val)
    @z_order = val
  end

  def tmp_dir
    # ENV['TMPDIR'] || '/tmp'
    '/home/synapse'
  end

  def dst_file_name
    File.join(tmp_dir, "#{SecureRandom.hex}.png")
  end
end

class TextFrame < Frame
  attr_accessor :font, :font_size, :color

  def apply(src, value)
  end
end

class ImageFrame < Frame
  def apply(src, value)
    bg = src
    layer = MiniMagick::Image.new(value[:src])
    result = bg.composite(layer) do |c|
      c.compose 'Over'
      c.geometry "#{width}x#{height}+#{top_left.x}+#{top_left.y}"
    end
    result.format('png')
    result
  end

  def width
    bottom_right.x - top_left.x
  end

  def height
    bottom_right.y - top_left.y
  end
end
