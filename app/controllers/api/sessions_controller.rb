class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      user_params[:username], user_params[:password]
    )

    if @user
      log_in!(@user)
      render json: { message: 'success' }
    else
      render json: ['Bad username/password combo'], status: 401
    end
  end

  def destroy
    if logged_in?
      log_out!
      render json: { message: 'success' }
    else
      render json: ['Nobody signed in'], status: 404
    end
  end
end
