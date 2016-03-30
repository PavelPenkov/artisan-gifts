require 'pp'
class LayoutsController < ApplicationController
  def preview
    preview = Generator::Preview.from_json(params)
    path = preview.generate
    @image = Image.create(image: File.open(path))

    respond_to do |format|
      format.json
    end
  end
end
