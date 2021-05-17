class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      log_in!(@user)
      render 'api/users/current_user.json.jbuilder'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end
end