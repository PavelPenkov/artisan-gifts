class CreateLayouts < ActiveRecord::Migration
  def change
    create_table :layouts do |t|
      t.text :data, null: false

      t.timestamps null: false
    end
  end
end
