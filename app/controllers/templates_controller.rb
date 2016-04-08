class TemplatesController < ApplicationController
  before_action :set_template, only: %i(edit update destroy preview show)

  def index
    @templates = Template.all
  end

  def show
    respond_to do |format|
      format.html
      format.json { render json: @template }
    end
  end

  def new
    @template = default_template
  end

  def edit
  end

  def create
    @template = Template.new(data: params[:data])
    binding.pry

    respond_to do |format|
      if @template.save
        format.html { redirect_to @template, notice: I18n.t('.created') }
        format.json { render :show, status: :created, location: @template }
      else
        format.html { render :new }
        format.json { render json: @template.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @template.update(template_params)
        format.html { redirect_to @template, notice: I18n.t('.updated') }
        format.json { render :show, status: :ok, location: @template }
      else
        format.html { render :edit }
        format.json { render json: @template.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @template.destroy
    respond_to do |format|
      format.html { redirect_to templates_url, notice: I18n.t('.destroyed') }
      format.json { head :no_content }
    end
  end

  def preview
    preview = Generator::Preview.from_json(@template.data)
    path = preview.generate
    @image = Image.create(image: File.open(path))

    respond_to do |format|
      format.json
    end
  end

  private

  def set_template
    @template = Template.find(params[:id])
  end

  def template_params
    params.require(:template).permit(data: {})
  end

  def default_template
    default_background = Image.find(31)
    Template.new.tap do |t|
      t.data[:layout] = {
        background: {
          url: default_background.url(:medium),
          id: default_background.id
        },
        frames: []
      }
      t.data[:context] = {
        params: []
      }
    end
  end
end
