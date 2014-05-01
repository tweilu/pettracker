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
      redirect_to :back
    end
  end

  def sitting
    @pets = current_user.sitting_pets
  end

  def mypetsactions
    if params[:addsitter_btn]
      sitter = User.find_by(:email => params[:sitter_email])
      if sitter
        Pet.update_all(['sitter_id=?', sitter.id], :id => params[:pet_ids])
      end
    elsif params[:removesitter_btn]
      Pet.update_all(['sitter_id=?', nil], :id => params[:pet_ids])
    elsif params[:delete_btn]
      Pet.destroy_all(:id => params[:pet_ids])
    end
    redirect_to :back
  end

  def sittingpetsactions
    Pet.update_all(['sitter_id=?', nil], :id => params[:pet_ids])
    redirect_to :back
  end

  def removesitter
    @pet = Pet.find(params[:petid])
    if @pet.update_attributes(:sitter_id => nil)
      respond_to do |format|
        format.js
      end
    end
  end

  def stopsitting
    @pet = Pet.find(params[:petid])
    if @pet.update_attributes(:sitter_id => nil)
      redirect_to pets_sitting_path
    end
  end

  def addsitter
    @pet = Pet.find(params[:petid])
    sitteremail = params[:pet][:sitter_email]
    sitter = User.find_by(:email => sitteremail)
    if sitter
      @pet.update_attributes(:sitter_id => sitter.id)
    end
    redirect_to :back
  end

  private

    def pet_params
      params.require(:pet).permit(:name, :pet_type, :description)
    end

end