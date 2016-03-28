class Color
  attr_accessor :red, :green, :blue, :alpha

  def initialize(r, g, b, a = 0)
    @red, @green, @blue, @alpha = r, g, b, a
  end
end
