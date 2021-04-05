class Api::GoalsController < ApplicationController
  def create
    @goal = Goal.new(goal_params)

    if @goal.save
      render 'api/goals/goal.json.jbuilder'
    else 
      render json: @goal.errors.full_messages, status: 422
    end
  end

  def show
    @goal = Goal.find_by_id(params[:id])

    if @goal
      render 'api/goals/goal.json.jbuilder'
    else
      render json: ['Goal not found'], status: 404
    end
  end

  def update
    @goal = Goal.find_by_id(params[:id])
    if !@goal
      render json: ['Goal not found'], status: 404
    else
      if @goal.update(goal_params.except(:user_id, :vision_id))
        render 'api/goals/goal.json.jbuilder'
      else 
        render json: @goal.errors.full_messages, status: 422
      end
    end
  end

  def destroy
    @goal = Goal.find_by_id(params[:id])

    if @goal
      @goal.destroy
      render json: {}
    else
      render json: ['Goal not found'], status: 404
    end
  end

  def goal_params
    params.require(:goal).permit(
      :nickname, :description, :motivation, :impact, :strategy, :deadline,
      :evidence, :satisfaction, :user_id, :vision_id
    )
  end
end
