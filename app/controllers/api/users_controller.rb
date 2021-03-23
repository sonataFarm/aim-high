require 'pry'

class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save!
      log_in!(@user)
      render json: 'New user created.'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end
end
