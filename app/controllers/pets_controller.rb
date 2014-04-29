class PetsController < ApplicationController

  def show
    @pet = Pet.find(params[:id])
  end

  def index
  	@pets = current_user.my_pets
  end

  def sitting
  	@pets = current_user.sitting_pets
  end


  private

    def pet_params
      params.require(:pet).permit(:name, :pet_type, :description)
    end

end