class Api::ReviewsController < ApplicationController
  def create
    @review = Review.new(review_params)
    
    if @review.save
      render 'api/reviews/show.json.jbuilder'
    else 
      render json: @review.errors.full_messages, status: 422
    end
  end

  def update
    @review = Review.find_by_id(params[:id])
    if !@review
      render json: ['Review not found'], status: 404
    else
      if @review.update(review_params.except(:goal_id))
        render 'api/reviews/show.json.jbuilder'
      else 
        render json: @review.errors.full_messages, status: 422
      end
    end
  end

  def destroy
    @review = Review.find_by_id(params[:id])

    if @review
      @review.destroy
      render json: {}
    else
      render json: ['Review not found'], status: 404
    end
  end

  def review_params
    params.require(:review).permit(:body, :goal_id)
  end
end