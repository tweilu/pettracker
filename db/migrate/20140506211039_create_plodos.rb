class CreatePlodos < ActiveRecord::Migration
  def change
    create_table :plodos do |t|
      t.string :type
      t.string :time
      t.string :info
      t.belongs_to :pet

      t.timestamps
    end
  end
end
