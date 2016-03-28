require './point'
require './frame'
require './layout'
require './generator'

f = ImageFrame.new
f.top_left = Point.new(10, 10)
f.bottom_right = Point.new(50, 50)
f.name = :title
l = Layout.new
l.frames = [f]
g = Generator.new(MiniMagick::Image.new('pic.png'), l, { title: {src: 'bg.jpg' }})
g.generate('/home/synapse/artisan.png')
