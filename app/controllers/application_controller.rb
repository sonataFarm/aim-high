class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def log_in!(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

  def log_out!
    current_user.reset_session_token!
    @current_user = session[:session_token] = nil
  end

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
