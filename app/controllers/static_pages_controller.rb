class StaticPagesController < ApplicationController

  def home
  	if current_user
  		redirect_to pets_path
  	end
  end

  def about

  end

end
