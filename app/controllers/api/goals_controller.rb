class Api::GoalsController < ApplicationController
  def index
    @goals = current_user.goals
    render 'api/goals/index.json.jbuilder'
  end

  def create
    @goal = Goal.new(goal_params)

    if @goal.save
      render 'api/goals/show.json.jbuilder'
    else 
      render json: @goal.errors.full_messages, status: 422
    end
  end

  def show
    @goal = Goal.find_by_id(params[:id])

    if @goal
      render 'api/goals/show.json.jbuilder'
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
        render 'api/goals/show.json.jbuilder'
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
      :title, :description, :motivation, :impact, :strategy, :deadline,
      :evidence, :satisfaction, :user_id, :vision_id
    )
  end
end
