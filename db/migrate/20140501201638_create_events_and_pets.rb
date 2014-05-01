class CreateEventsAndPets < ActiveRecord::Migration
  def change
    create_table :events_pets, id: false do |t|
      t.belongs_to :event
      t.belongs_to :pet
    end
  end
end
