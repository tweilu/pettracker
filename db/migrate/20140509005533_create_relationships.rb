class CreateRelationships < ActiveRecord::Migration
  def change
    create_table :relationships do |t|
      t.integer :client_id
      t.integer :sitter_id

      t.timestamps
    end
    add_index :relationships, :client_id
    add_index :relationships, :sitter_id
    add_index :relationships, [:client_id, :sitter_id], unique: true
  end
end
