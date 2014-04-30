class PetsController < ApplicationController

  def show
    @pet = Pet.find(params[:id])
  end

  def index
    @pets = current_user.my_pets
    @newpet = Pet.new
  end

  def create
    @pet = Pet.new(pet_params)
    @pet.owner_id = current_user.id
    if @pet.save
      respond_to do |format|
        format.js
      end
    else
      render 'new'
    end
  end

  def sitting
    @pets = current_user.sitting_pets
  end

  private

    def pet_params
      params.require(:pet).permit(:name, :pet_type, :description)
    end

end