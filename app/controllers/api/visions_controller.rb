class Api::VisionsController < ApplicationController
  def create
    @vision = Vision.new(vision_params)

    if @vision.save
      render 'api/visions/show.json.jbuilder'
    else
      render json: @vision.errors.full_messages, status: 422
    end
  end

  def show
    @vision = Vision.find_by_id(params[:id])

    if @vision
      render 'api/visions/show.json.jbuilder'
    else
      render json: ["Vision not found"], status: 404
    end
  end

  def update
    @vision = Vision.find_by_id(params[:id])

    if !@vision
      render json: ["Vision not found"], status: 404
    else
      if @vision.update(vision_params)
        render 'api/visions/show.json.jbuilder'
      else
        render json: @vision.errors.full_messages, status: 422
      end
    end
  end

  def destroy
    @vision = Vision.find_by_id(params[:id])
    
    if @vision
      @vision.destroy
      render json: {}
    else
      render json: ["Vision not found"], status: 404
    end
  end

  def vision_params 
    params.require(:vision).permit(
      :name, :nickname, :description, :motivation, :impact, :user_id
    )
  end
end
