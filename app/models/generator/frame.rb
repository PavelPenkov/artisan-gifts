require 'securerandom'

module Generator
  class Frame
    attr_accessor :top, :left, :width, :height, :name, :param

    def self.from_json(doc)
      frame = case doc[:type]
              when 'overlay' then ::Generator::OverlayFrame.new
              when 'text' then ::Generator::TextFrame.new
              end

      frame.name = doc[:name]
      frame.param = doc[:param]
      frame.top = doc[:top]
      frame.left = doc[:left]
      frame.width = doc[:width]
      frame.height = doc[:height]

      if frame.is_a?(::Generator::TextFrame)
        frame.font = doc[:font]
        frame.color = doc[:color]
      end
      frame
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
end
