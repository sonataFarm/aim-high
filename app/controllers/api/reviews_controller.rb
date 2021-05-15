class Api::ReviewsController < ApplicationController
  before_action :load_review, only: [ :update, :destroy ]
  before_action :require_authorization, only: [ :update, :destroy ]

  def create
    @review = Review.new(review_params)
    
    if @review.save
      render 'api/reviews/show.json.jbuilder'
    else 
      render json: @review.errors.full_messages, status: 422
    end
  end

  def update
    if @review.update(review_params.except(:goal_id))
      render 'api/reviews/show.json.jbuilder'
    else 
      render json: @review.errors.full_messages, status: 422
    end
  end

  def destroy
    @review.destroy
    render json: {}
  end

  def review_params
    params.require(:review).permit(:body, :goal_id)
  end

  def load_review
    @review = Review.find_by_id(params[:id])
    unless @review
      render json: ['Resource not found'], status: 404
    end
  end

  def require_authorization
    unless current_user && current_user.reviews.include?(@review)
      render json: ['You are not authorized to access this resource']
    end
  end
end