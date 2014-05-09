class StaticPagesController < ApplicationController

  def home
  	if current_user
  		redirect_to pets_path
  	end
  	@user = User.new
  end

  def about

  end

end
