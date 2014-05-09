class SessionsController < ApplicationController
	def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      sign_in user
      redirect_back_or pets_path
    else
      flash[:danger] = 'Invalid email/password combination'
      redirect_to :back
    end
  end

  def destroy
    sign_out
    redirect_to root_url
  end
end
