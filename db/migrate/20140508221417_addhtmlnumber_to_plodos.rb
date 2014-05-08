class AddhtmlnumberToPlodos < ActiveRecord::Migration
  def change
    add_column :plodos, :rand, :string
  end
end
