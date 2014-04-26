class PetsController < ApplicationController

  def show
    @pet = Pet.find(params[:id])
  end

  def index
  end


  private

    def pet_params
      params.require(:pet).permit(:name, :pet_type, :description)
    end

end