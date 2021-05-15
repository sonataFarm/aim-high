class Api::ObstaclesController < ApplicationController
  def create
    @obstacle = Obstacle.new(obstacle_params)
    
    if @obstacle.save
      render 'api/obstacles/show.json.jbuilder'
    else 
      render json: @obstacle.errors.full_messages, status: 422
    end
  end

  def update
    @obstacle = Obstacle.find_by_id(params[:id])
    if !@obstacle
      render json: ['obstacle not found'], status: 404
    else
      if @obstacle.update(obstacle_params.except(:goal_id))
        render 'api/obstacles/show.json.jbuilder'
      else 
        render json: @obstacle.errors.full_messages, status: 422
      end
    end
  end

  def destroy
    @obstacle = Obstacle.find_by_id(params[:id])

    if @obstacle
      @obstacle.destroy
      render json: {}
    else
      render json: ['obstacle not found'], status: 404
    end
  end

  def obstacle_params
    params.require(:obstacle).permit(:description, :solution, :goal_id)
  end
end
