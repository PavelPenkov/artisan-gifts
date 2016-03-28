class ImagesController < ApplicationController
  def show
    @image = Image.find(params[:id])
    if stale?(last_modified: @image.updated_at.utc, etag: @image.cache_key)
      respond_to do |format|
        format.json
        format.html
      end
    end
  end

  def new
    @image = Image.new
  end

  def create
    @image = Image.create(image_params)
    respond_to do |format|
      format.html { redirect_to @image }
      format.json { render :show }
    end
  end

  private

  def image_params
    params.require(:image).permit(:image)
  end
end
