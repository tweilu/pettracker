class CreatePets < ActiveRecord::Migration
  def change
    create_table :pets do |t|
      t.string :name
      t.string :pet_type
      t.text :description
      t.integer :user_id
      t.integer :sitter_id

      t.timestamps
    end
  end
end
