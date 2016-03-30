module Generator
  class Layout
    attr_accessor :frames, :background

    def self.from_json(doc)
      Layout.new.tap do |l|
        l.background = Image.find(doc[:background][:id]).image.path(:medium)
        l.frames = doc[:frames].map{|frame| Frame.from_json(frame)}
      end
    end
  end
end
