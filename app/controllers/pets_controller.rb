class PetsController < ApplicationController

  def show
    @pet = Pet.find(params[:id])
    @events = []
    @pet.events.each do |evt|
      @events << evt.as_json
    end
  end

  def index
    @pets = current_user.my_pets.sort_by!{ |m| m.name.downcase }
    @newpet = Pet.new
    events = []
    @pets.each do |pet|
      pet.events.each do |evt|
        events << evt.as_json
      end
    end
    @events_array = events.uniq{|x| x}
    @pets_select = @pets.collect {|p| [p.name, p.id]}
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
    @pets = current_user.sitting_pets.sort_by!{ |m| m.name.downcase }
    events = []
    @pets.each do |pet|
      pet.events.each do |evt|
        events << evt.as_json
      end
    end
    @events_array = events.uniq{|x| x}
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

  def addevent
    @event = Event.new
    if params[:add_event]
      @add = true
      @event.name = params[:event_name]
      @event.date = params[:event_date]
      @event.time = params[:event_time]
      @event.save
      @pet = Pet.find(params[:pet_id])
      @pet.events << @event
    elsif params[:cancel_event]
      @add = false
    end

    respond_to do |format|
      format.js
    end

  end

  def addplodo
    @plodo = Plodo.new
    @plodo.plodo_type = params[:plodo_type]
    @plodo.time = params[:time]
    @plodo.info = params[:info]
    @plodo.rand = params[:rand]
    @plodo.save
    @pet = Pet.find(params[:pet_id])
    @pet.plodos << @plodo

    respond_to do |format|
      format.js
    end
  end

  def editplodo
    @plodo = Plodo.where(:rand => params[:rand]).first
    @plodo.time = params[:time]
    @plodo.info = params[:info]
    @plodo.save

    respond_to do |format|
      format.js
    end
  end


  def deleteevent
    @pet = Pet.find(params[:pet_id])
    @event = Event.find(params[:event_id])
    @pet.events.delete(@event)
    respond_to do |format|
      format.js
    end
  end

  private

    def pet_params
      params.require(:pet).permit(:name, :pet_type, :description)
    end

end