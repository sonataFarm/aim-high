class Api::VisionsController < ApplicationController
  before_action :load_vision, only: [ :show, :update, :destroy ]
  before_action :require_authorization, only: [ :show, :update, :destroy ]

  def index
    @visions = current_user.visions
    render 'api/visions/index.json.jbuilder'
  end

  def create
    @vision = Vision.new(vision_params)
    @vision.user = current_user

    if @vision.save
      render 'api/visions/show.json.jbuilder'
    else
      render json: @vision.errors.full_messages, status: 422
    end
  end

  def show
    render 'api/visions/show.json.jbuilder'
  end

  def update
    if @vision.update(vision_params.except(:user_id))
      render 'api/visions/show.json.jbuilder'
    else
      render json: @vision.errors.full_messages, status: 422
    end
  end

  def destroy
    @vision.destroy
    render json: {}
  end

  def vision_params 
    params.require(:vision).permit(
      :title, :description, :motivation, :impact
    )
  end

  def load_vision
    @vision = Vision.find_by_id(params[:id])
    unless @vision
      render json: ['Resource not found'], status: 404
    end
  end

  def require_authorization
    unless @vision.user == current_user
      render json: ['You are not authorized to access this resource'], status: 403
    end
  end
end
