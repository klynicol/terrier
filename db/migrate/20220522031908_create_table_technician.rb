class CreateTableTechnician < ActiveRecord::Migration[7.0]
  def change
    create_table :technicians do |t|
      t.string :name

      t.timestamps
    end
  end
end