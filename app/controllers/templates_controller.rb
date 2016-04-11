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
    @template = Template.new(data: params[:data], name: params[:data][:name])

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
    update_params = { data: params[:data], name: params[:data][:name] }
    respond_to do |format|
      if @template.update(update_params)
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
    params.delete(:id)
    ctx = @template.context_from_params(params)
    json = {
      layout: @template.data,
      context: ctx
    }
    preview = Generator::Preview.from_json(json)
    path = preview.generate
    @image = Image.create(image: File.open(path))

    respond_to do |format|
      format.json
    end
  end

  def delete_all
    Template.delete_all
    redirect_to '/templates'
  end

  private

  def set_template
    @template = Template.find(params[:id])
  end

  def default_template
    default_background = (Image.where(id: 75).first || Image.first)
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
