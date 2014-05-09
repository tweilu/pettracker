class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :cors_set_access_control_headers


  include SessionsHelper


  	def cors_set_access_control_headers
		headers['Access-Control-Allow-Origin'] = '*'
	end
end
