class Event < ActiveRecord::Base
  has_and_belongs_to_many :pets

  def as_json(options = {})  
    {  
      :id => self.id,  
      :title => self.name,  
      :start => self.date,
      :time => self.time,
      :pet_name => self.pets.first.name
    }  
  end

end