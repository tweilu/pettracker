class RenameUseridColumnInPets < ActiveRecord::Migration
  def change
  	rename_column :pets, :user_id, :owner_id
  end
end
