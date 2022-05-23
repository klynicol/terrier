class AddTechnicianToWorkOrder < ActiveRecord::Migration[7.0]
  def change
    add_column :work_orders, :technician_id, :bigint
    add_foreign_key :work_orders, :technicians, on_delete: :nullify
  end
end
