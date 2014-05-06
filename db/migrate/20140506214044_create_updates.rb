class CreateUpdates < ActiveRecord::Migration
  def change
    create_table :updates do |t|
      t.string :date
      t.string :time
      t.string :info
      t.belongs_to :pet

      t.timestamps
    end
  end
end
