class Api::GoalsController < ApplicationController
  before_action :load_goal, only: [ :show, :update, :destroy ]
  before_action :require_authorization, only: [ :show, :update, :destroy ]

  def index
    @goals = current_user.goals
    render 'api/goals/index.json.jbuilder'
  end

  def create
    @goal = Goal.new(goal_params)
    @goal.user = current_user
    if @goal.save
      render 'api/goals/show.json.jbuilder'
    else 
      render json: @goal.errors.full_messages, status: 422
    end
  end

  def show
    render 'api/goals/show.json.jbuilder'
  end

  def update
    if @goal.update(goal_params.except(:user_id, :vision_id))
      render 'api/goals/show.json.jbuilder'
    else 
      render json: @goal.errors.full_messages, status: 422
    end
  end

  def destroy
    @goal.destroy
    render json: {}
  end

  def goal_params
    params.require(:goal).permit(
      :title, :description, :motivation, :impact, :strategy, :deadline,
      :evidence, :satisfaction, :vision_id, obstacles_attributes: [ :description, :solution ]
    )
  end

  def load_goal
    @goal = Goal.find_by_id(params[:id])
    unless @goal
      render json: ['Resource not found'], status: 404
    end
  end

  def require_authorization
    unless @goal.user == current_user
      render json: ['You are not authorized to access this resource'], status: 403
    end
  end
end