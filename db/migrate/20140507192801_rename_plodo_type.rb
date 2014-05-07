class RenamePlodoType < ActiveRecord::Migration
  def change
    rename_column :plodos, :type, :plodo_type
  end
end
