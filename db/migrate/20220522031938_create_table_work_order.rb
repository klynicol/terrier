class CreateTableWorkOrder < ActiveRecord::Migration[7.0]
  def change
    create_table :work_orders do |t|
      t.datetime :time
      t.integer :duration
      t.decimal :price

      t.timestamps
    end
  end
end
