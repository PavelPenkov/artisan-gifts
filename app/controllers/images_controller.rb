class ImagesController < ApplicationController
  def show
    @image = Image.find(params[:id])
  end

  def new
    @image = Image.new
  end

  def create
    @image = Image.create(image_params)
    respond_to do |format|
      format.html { redirect_to @image }
      format.json { render json: { url: @image.image.url  } }
    end
  end

  private

  def image_params
    params.require(:image).permit(:image)
  end
end
