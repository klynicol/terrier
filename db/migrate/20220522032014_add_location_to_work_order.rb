class AddLocationToWorkOrder < ActiveRecord::Migration[7.0]
  def change
    add_column :work_orders, :location_id, :bigint
    add_foreign_key :work_orders, :locations, on_delete: :nullify
  end
end
