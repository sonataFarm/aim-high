class Api::ObstaclesController < ApplicationController
  before_action :load_obstacle, only: [ :update, :destroy ]
  before_action :require_authorization, only: [ :update, :destroy ]
  def create
    @obstacle = Obstacle.new(obstacle_params)
    
    if @obstacle.save
      render 'api/obstacles/show.json.jbuilder'
    else 
      render json: @obstacle.errors.full_messages, status: 422
    end
  end

  def update
    if @obstacle.update(obstacle_params.except(:goal_id))
      render 'api/obstacles/show.json.jbuilder'
    else 
      render json: @obstacle.errors.full_messages, status: 422
    end
  end

  def destroy
    @obstacle.destroy
    render json: {}
  end

  def obstacle_params
    params.require(:obstacle).permit(:description, :solution, :goal_id)
  end

  def load_obstacle
    @obstacle = Obstacle.find_by_id(params[:id])
    unless @obstacle
      render json: ['Resource not found'], status: 404
    end
  end

  def require_authorization
    unless current_user && current_user.obstacles.include?(@obstacle)
      render json: ['You are not authorized to access this resource']
    end
  end
end
