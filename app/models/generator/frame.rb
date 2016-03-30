require 'securerandom'

class Generator::Frame
  attr_accessor :top, :left, :width, :height, :name, :param

  def self.from_json(doc)
    frame = case doc[:type]
            when 'overlay' then ::Generator::OverlayFrame.new
            when 'text' then ::Generator::TextFrame.new
            end

    frame.tap do |f|
      f.name = doc[:name]
      f.param = doc[:param]
      f.top = doc[:top]
      f.left = doc[:left]
      f.width = doc[:width]
      f.height = doc[:height]
    end
  end

  def z_order
    @z_order || 0
  end

  def z_order=(val)
    @z_order = val
  end

  def tmp_dir
    File.join(Rails.root, 'tmp')
  end

  def dst_file_name
    File.join(tmp_dir, "#{SecureRandom.hex}.png")
  end

  def top_left
    ::Generator::Point.new(left, top)
  end

  def bottom_right
    ::Generator::Point.new(left + width, top + height)
  end
end
