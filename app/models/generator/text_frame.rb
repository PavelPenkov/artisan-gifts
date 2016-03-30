module Generator
  class TextFrame < Frame
    attr_accessor :font, :font_size, :color

    def self.test
      MiniMagick::Tool::Convert.new do |convert|
        convert.background('None')
        convert.fill('white')
        convert.size('600x400')
        convert.gravity('center')
        convert.label('Just a test')
        convert << '/home/synapse/just_a_test.png'
      end
    end

    def apply(src, value)
      label_name = tmp_name
      MiniMagick::Tool::Convert.new do |convert|
        convert.background('None')
        convert.fill('white')
        convert.size("#{width}x#{height}")
        convert.gravity('center')
        convert.label(value)
        convert << label_name
      end
      bg = src
      layer = MiniMagick::Image.new(label_name)
      result = bg.composite(layer) do |c|
        c.compose 'Over'
        c.geometry "#{width}x#{height}+#{top_left.x}+#{top_left.y}"
      end
      result.format('png')
      result
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
