class AddNameToTemplates < ActiveRecord::Migration
  def change
    change_table :templates do |t|
      t.string :name
    end
  end
end
